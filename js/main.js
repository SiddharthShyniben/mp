const kaomoji = document.querySelector(".kaomoji");
const header = document.querySelector("#main");
const about = document.querySelector(".about");
const scene = document.querySelector(".scene");

let animation = blink(kaomoji);
let didScroll = false;
let changeHeaderOn = window.innerHeight / 3;
let loadedTech = false;

window.addEventListener(
  "scroll",
  () => {
    if (!didScroll) {
      didScroll = true;

      setTimeout(() => {
        if (window.pageYOffset >= changeHeaderOn)
          header.classList.add("shrink");
        else header.classList.remove("shrink");
        didScroll = false;
      }, 250);
    }
    changeHeaderOn = window.innerHeight / 3;
  },
  false,
);

const runTechStack = () => {
  document.querySelector(".group").style.display = "block";
  document.querySelector(".headings").style.display = "block";
  const breakPoint = "53em";
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint})`,
      isMobile: `(max-width: ${breakPoint})`,
    },
    (context) => {
      let { isDesktop } = context.conditions;

      const image = document.querySelector(".card__img");
      const cardList = gsap.utils.toArray(".card");
      const count = cardList.length;
      const sliceAngle = (2 * Math.PI) / count;

      // Distance from the image center to the screen center.
      const radius1 = 50 + image.clientHeight / 2;
      const radius2 = isDesktop ? 250 - radius1 : 180 - radius1;

      gsap
        .timeline()
        .from(cardList, {
          y: window.innerHeight / 3 + image.clientHeight * 1.5,
          rotateX: -180,
          stagger: 0.1,
          duration: 0.5,
          opacity: 0.8,
          scale: 3,
        })
        .set(cardList, {
          transformOrigin: `center ${radius1 + image.clientHeight / 3}px`,
        })
        .set(".group", {
          // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
          transformStyle: "preserve-3d",
        })
        .to(cardList, {
          y: -radius1,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(
          cardList,
          {
            rotation: (index) => (index * 360) / count,
            rotateY: 15,
            duration: 1,
            ease: "power1.out",
          },
          "<",
        )
        .to(cardList, {
          // Expand the radius
          x: (index) => {
            return Math.round(
              radius2 * Math.cos(sliceAngle * index - Math.PI / 4),
            );
          },
          y: (index) => {
            return (
              Math.round(radius2 * Math.sin(sliceAngle * index - Math.PI / 4)) -
              radius1
            );
          },
          rotation: (index) => {
            return (index + 1) * (360 / count);
          },
        })
        .to(
          cardList,
          {
            rotateY: 180,
            opacity: 0.8,
            duration: 1,
          },
          "<",
        )
        .from(
          ".headings",
          {
            opacity: 0,
            filter: "blur(60px)",
            duration: 1,
          },
          "<",
        )
        .to(cardList, {
          repeat: -1,
          duration: 1,
          onRepeat: () => {
            gsap.to(cardList[Math.floor(Math.random() * count)], {
              rotateY: "+=180",
            });
          },
        })
        .to(
          ".group",
          {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
          },
          "<-=2",
        );

      return () => {};
    },
  );
};

const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve,
    );
  });
};

preloadImages(".card__img");

const cache = {};

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);

    const sections = [
      { el: about, id: "about" },
      { el: scene, id: "scene" },
    ].map(({ el, id }) => {
      const entry = entries.find((el) => el.target.classList.contains(id));
      if (entry) cache[id] = entry.intersectionRatio;
      return {
        el,
        id,
        ratio: cache[id] || 0,
      };
    });

    const highest = sections.sort((a, b) => b.ratio - a.ratio)[0];

    if (highest.ratio === 0) {
      clearInterval(animation);
      animation = blink(kaomoji);
    } else if (highest.id == "about") {
      clearInterval(animation);
      animation = scream(kaomoji);
    } else if (highest.id == "scene") {
      // clearInterval(animation);
      // animation = heart(kaomoji);
    }

    if (!loadedTech) {
      const scene = sections.find((e) => e.id == "scene");
      if (scene && scene.ratio > 0.5) {
        runTechStack();
        loadedTech = true;
      }
    }
  },
  {
    threshold: [...Array(101).keys()].map((x) => x / 100),
  },
);

observer.observe(header);
observer.observe(about);
observer.observe(scene);
