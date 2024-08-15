// assets/js/sidebar-model.js

export const sidebarItems = [
  {
    title: "Home",
    link: "index.html",
    icon: "fas fa-home",
  },
  {
    title: "About Us",
    link: "about-us.html",
    icon: "fas fa-info-circle",
  },
  {
    title: "Program Sosial",
    icon: "fas fa-info-circle",
    children: [
      {
        title: "Beasiswa Prestasi",
        link: "sejarah-ulbi.html",
        icon: "fas fa-history",
      },
      {
        title: "Beasiswa Tidak Mampu",
        link: "struktur-organisasi-ulbi.html",
        icon: "fas fa-sitemap",
      },
      {
        title: "Beasiswa APERTI",
        link: "visi-misi-ulbi.html",
        icon: "fas fa-bullseye",
      },
    ],
  },
  //   {
  //     title: "Services",
  //     icon: "fas fa-concierge-bell",
  //     children: [
  //       {
  //         title: "Web Development",
  //         link: "services-web-development.html",
  //         icon: "fas fa-code",
  //       },
  //       {
  //         title: "SEO",
  //         link: "services-seo.html",
  //         icon: "fas fa-chart-line",
  //       },
  //     ],
  //   },
  {
    title: "ULBI",
    link: "https://ulbi.ac.id",
    icon: "fas fa-envelope",
  },
];
