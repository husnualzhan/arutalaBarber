function navColor() {
  return {
    scrolled: false,
    init() {
      const hero = document.getElementById("home");
      const heroHeight = hero.offsetHeight;
      window.addEventListener("scroll", () => {
        this.scrolled = window.pageYOffset > heroHeight - 200;
      });
    },
  };
}
function aboutStats() {
  return {
    expanded: false,
    introText:
      "Kamu layak mendapatkan fasilitas premium  seperti barbershop  pada umumnya yakni : ",
    baseYear: 2015,
    yearsSince: "0",
    clientsCount: "0+",
    certifications: "0",
    awards: "0",
    init() {
      // count-up animation
      const now = new Date().getFullYear();
      this.yearsSince = this.baseYear;
      animateValue(this, "yearsSince", this.baseYear, now, 1500);
      animateValue(this, "clientsCount", 0, 1200, 1500, true);
      animateValue(this, "certifications", 0, 8, 1500);
      animateValue(this, "awards", 0, 4, 1500);
    },
  };

  function animateValue(
    component,
    key,
    start,
    end,
    duration,
    plusSign = false
  ) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 50);
    let timer = setInterval(() => {
      current += increment;
      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        current = end;
        clearInterval(timer);
      }
      component[key] = plusSign
        ? Math.floor(current) + "+"
        : Math.floor(current).toString();
    }, 50);
  }
}
function slider() {
  return {
    images: [
      { src: "/img/nol.png", alt: "pomade" },
      { src: "/img/satu.png", alt: "alat cukur" },
      { src: "/img/dua.png", alt: "parfume" },
      { src: "/img/tiga.png", alt: "vitamin rambut" },
    ],
    loopImages: [],
    duration: 10, // total seconds for one loop
    playing: true,
    init() {
      // duplicate images array for seamless scroll
      this.loopImages = [...this.images, ...this.images];
    },
    pause() {
      this.playing = false;
    },
    play() {
      this.playing = true;
    },
  };
}
function scrollTo(id) {
  document.querySelector("#" + id).scrollIntoView({ behavior: "smooth" });
}

function dropdown() {
  return {
    open: false,
    search: "",
    selectedRegion: "Semua",
    page: 1,
    perPage: 5,
    locations: [
      ...Array.from({ length: 10 }).map((_, i) => ({
        name: `Makassar Lokasi ${i + 1}`,
        region: "Makassar",
      })),
      { name: "Gowa Lokasi 1", region: "Gowa" },
      { name: "Maros Lokasi 1", region: "Maros" },
    ],
    get regions() {
      const regs = Array.from(new Set(this.locations.map((l) => l.region)));
      return ["Semua", ...regs];
    },
    filteredLocations() {
      return this.locations
        .filter(
          (l) =>
            this.selectedRegion === "Semua" || l.region === this.selectedRegion
        )
        .filter((l) =>
          l.name.toLowerCase().includes(this.search.toLowerCase())
        );
    },
    get totalPages() {
      return Math.ceil(this.filteredLocations().length / this.perPage) || 1;
    },
    paginatedLocations() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredLocations().slice(start, start + this.perPage);
    },
    nextPage() {
      if (this.page < this.totalPages) this.page++;
    },
    prevPage() {
      if (this.page > 1) this.page--;
    },
    selectRegion(region) {
      this.selectedRegion = region;
      this.page = 1;
    },
  };
}
function productSlider() {
  return {
    products: [
      {
        id: 1,
        name: "Hair Clipper Pro X200",
        desc: "Mesin cukur profesional dengan motor bertenaga dan pisau stainless steel tajam.",
        badge: "Best Seller",
        isDiskon: true,
        diskon: 10,
        price: 450000,
        link: "www.google.com/",
        image: "./img/1 warna.jpg",
      },
      {
        id: 2,
        name: "Barber Scissor Set",
        desc: "Set gunting rambut & thinning stainless steel, presisi tinggi untuk potongan rapi.",
        badge: "Baru",
        isDiskon: false,
        diskon: 0,
        link: "www.google.com/",
        price: 175000,
        image: "./img/4 warna.jpg",
      },
      {
        id: 3,
        name: "Barber Comb Kit",
        desc: "Paket 5 sisir berbahan karbon anti-statis untuk styling dan finishing sempurna.",
        isDiskon: true,
        diskon: 20,
        price: 60000,
        link: "www.google.com/",
        image: "./img/1 warna.jpg",
      },
    ],
  };
}

dayjs.extend(window.dayjs_plugin_relativeTime);

function carousel(jsonPath) {
  return {
    cards: [],
    init() {
      fetch(jsonPath)
        .then((res) => res.json())
        .then((data) => (this.cards = data.articles))
        .catch((err) => console.error("Gagal load JSON:", err));
    },
    relativeTime(published) {
      return dayjs(published).fromNow();
    },
    showBadge(card) {
      return dayjs().diff(dayjs(card.published), "hour") < 24;
    },
  };
}

function breadcrumb() {
  return {
    items: [
      {
        label: "Home",
        href: "#",
        icon: 'fa-solid fa-house text-xl text-xs xl:text-sm',
      },
      { label: "Projects", href: "#", current: false },
      { label: "Flowbite", href: "#", current: true },
    ],
  };
}
function searchForm() {
  return {
    query: "",
    submitSearch() {
      // Handle your search logic here, e.g., filter a list or make an API call
      console.log("Searching for:", this.query);
    },
  };
}
