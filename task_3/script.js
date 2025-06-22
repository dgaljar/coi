class SwiperCarousel extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.toggleBtn = null;
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  connectedCallback() {
    this.toggleBtn = this.querySelector("#swiper-toggle");
    this.toggleBtn.addEventListener("click", this.handleToggle);
    this.initSwiper();
  }

  initSwiper() {
    const swiper = this.querySelector(".swiper");

    this.swiper = new Swiper(swiper, {
      spaceBetween: 8,
      direction: "horizontal",
      breakpoints: {
        0: {
          slidesPerView: 1.04,
   
          loop: false,
        },
        376: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          loop: true,
        },
      },

      navigation: {
        nextEl: this.querySelector(".swiper-button-next"),
        prevEl: this.querySelector(".swiper-button-prev"),
      },

      on: {
        slideChange: this.handleSlideChange,
      },
    });

    console.log("Swiper initialized");
  }

  handleSlideChange() {
    if (this.swiper) {
      console.log("Active slide index:", this.swiper.realIndex);
    }
  }

  handleToggle() {
    if (this.swiper && !this.swiper.destroyed) {
      this.swiper.destroy(true, true);
      this.swiper = null;
      console.log("Swiper destroyed");
    } else {
      this.initSwiper();
    }
  }
}

customElements.define("swiper-carousel", SwiperCarousel);
