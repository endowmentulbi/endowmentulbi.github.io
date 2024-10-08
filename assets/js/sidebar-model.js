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
        link: "beasiswa-prestasi.html",
        icon: "fas fa-history",
      },
      {
        title: "Beasiswa Tidak Mampu",
        link: "beasiswa-tidakmampu.html",
        icon: "fas fa-sitemap",
      },
      {
        title: "Beasiswa APERTI",
        link: "beasiswa-aperti.html",
        icon: "fas fa-bullseye",
      },
      {
        title: "Beasiswa YPBPI",
        link: "beasiswa-ypbpi.html",
        icon: "fas fa-book",
      },
      {
        title: "Beasiswa Mitra",
        link: "beasiswa-mitra.html",
        icon: "fas fa-graduation-cap",
      },
      {
        title: "Beasiswa KIP",
        link: "beasiswa-kip.html",
        icon: "fas fa-graduation-cap",
      },
    ],
  },
  {
    title: "ULBI",
    link: "https://ulbi.ac.id",
    icon: "fas fa-envelope",
  },
];
