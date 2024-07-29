import { sidebarItems } from "./sidebar-model.js";

document.addEventListener("DOMContentLoaded", function () {
  function createSidebarItem(item) {
    const li = document.createElement("li");
    li.className = item.children ? "dropdown" : "";
    li.id = item.id; // Menambahkan id unik

    if (item.children) {
      const subMenu = document.createElement("ul");
      item.children.forEach((subItem) => {
        subMenu.appendChild(createSidebarItem(subItem));
      });

      li.innerHTML = `
                <a href="#">${item.title}</a>
            `;
      li.appendChild(subMenu);
    } else {
      li.innerHTML = `
                <a href="${item.link}">${item.title}</a>
            `;
    }

    return li;
  }

  function buildSidebar(items) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      fragment.appendChild(createSidebarItem(item));
    });
    return fragment;
  }

  const existingMenu = document.querySelector(".main-menu__list");
  if (existingMenu) {
    existingMenu.innerHTML = ""; // Hapus menu yang ada
    existingMenu.appendChild(buildSidebar(sidebarItems)); // Tambahkan menu dinamis
  }
});
