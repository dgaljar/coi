class CustomSection extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  connectedCallback() {
    this.section = this.querySelector("#about-sourcing");
    this.paragraphWrapper = this.querySelector("#paragraphWrapper");
    this.button = this.querySelector("#button");

    this.button.addEventListener("click", this.handleClick);
    this.paragraphWrapper.addEventListener("click", this.handleClick);

    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    this.observer.observe(this.section);
  }

  handleClick() {
    this.paragraphWrapper.classList.toggle("is-open");
    this.button.classList.toggle("section__button--invis");
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.section.classList.add("section--visible");
      } else {
        this.section.classList.remove("section--visible");
      }
    });
  }
}

customElements.define("custom-section", CustomSection);
