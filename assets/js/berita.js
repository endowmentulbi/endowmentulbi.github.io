document.addEventListener("DOMContentLoaded", function () {
  fetch("https://endowment-be.ulbi.ac.id/api/v1/donasi/feed")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const postsContainer = document.getElementById("blog-posts");
        let postCount = 0;
        data.data.forEach((post, index) => {
          if (postCount >= 6) return;
          if (post.title === "SEBELUM POSTING, HAPUS INI") return;

          const postElement = document.createElement("div");
          postElement.classList.add("col-xl-4", "col-lg-4");

          const contentPreview =
            post.content.length > 100
              ? post.content.substring(0, 100) + "..."
              : post.content;

          postElement.innerHTML = `
                        <div class="blog-one__single wow fadeInUp" data-wow-delay="${
                          (postCount + 1) * 100
                        }ms">
                            <div class="blog-one__img-box">
                                <div class="blog-one__img">
                                    <img src="${
                                      post.image_url ||
                                      "assets/images/default-image.jpg"
                                    }" alt="${post.title}" />
                                    <a href="${post.link}">
                                        <span class="blog-one__plus"></span>
                                    </a>
                                </div>
                                <div class="blog-one__date-box">
                                    <p><span>${new Date(
                                      post.pub_date
                                    ).getDate()}</span> ${new Date(
            post.pub_date
          ).toLocaleString("default", { month: "short" })}</p>
                                </div>
                            </div>
                            <div class="blog-one__content">
                                <ul class="list-unstyled blog-one__meta">
                                    <li>
                                        <a href="${post.link}">
                                            <i class="far fa-user-circle"></i> By admin
                                        </a>
                                    </li>
                                    <li>
                                        <a href="${post.link}">
                                            <i class="far fa-comments"></i> 2 Comments
                                        </a>
                                    </li>
                                </ul>
                                <h3 class="blog-one__title">
                                    <a href="${post.link}">${post.title}</a>
                                </h3>
                                <p class="blog-one__text">${contentPreview}</p>
                                <div class="blog-one__bottom">
                                    <div class="blog-one__read-btn">
                                        <a href="${post.link}">Read more</a>
                                    </div>
                                    <div class="blog-one__arrow">
                                        <a href="${post.link}">
                                            <span class="icon-right-arrow"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
          postsContainer.appendChild(postElement);
          postCount++;
        });
      } else {
        console.error("Failed to fetch blog posts");
      }
    })
    .catch((error) => console.error("Error fetching blog posts:", error));
});
