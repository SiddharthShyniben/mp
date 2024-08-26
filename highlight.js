class HighlightEffect {
  constructor(el) {
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error("Invalid element provided.");
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll(".char");
    this.animationDefaults = {
      duration: 0.4,
      ease: "power1",
    };

    this.initializeEffect(this.wrapElement);
  }

  initializeEffect(element) {
    this.scroll();
  }

  scroll() {
    ScrollTrigger.create({
      trigger: this.highlightedElement,
      start: "top bottom",
      onEnter: () => this.animateChars(),
      onEnterBack: () => this.animateChars(),
      onLeave: () => this.resetChars(),
      onLeaveBack: () => this.resetChars(),
    });
  }

  animateChars() {
    gsap
      .timeline({ defaults: this.animationDefaults })
      .fromTo(
        this.highlightedChars,
        {
          scale: 1.3,
          opacity: 0,
        },
        {
          stagger: (pos) => 0.1 + 0.05 * pos,
          scale: 1,
          opacity: 1,
        },
      )
      .fromTo(
        this.highlightedElement,
        {
          "--after-scale": 0,
        },
        {
          duration: 0.8,
          ease: "expo",
          "--after-scale": 1,
        },
        0,
      );
  }

  resetChars() {
    gsap.killTweensOf([this.highlightedChars, this.highlightedElement]);
    gsap.set(this.highlightedElement, {
      "--after-scale": 0,
    });
  }
}

const initSmoothScrolling = () => {
  const lenis = new Lenis({ lerp: 0.17 });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

initSmoothScrolling();

for (const mark of document.querySelectorAll("mark")) {
  mark.innerHTML = mark.innerText
    .split("")
    .map((e) => `<span class="char">${e}</span>`)
    .join("");
  new HighlightEffect(mark);
}
