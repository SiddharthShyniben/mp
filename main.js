const kaomoji = document.querySelector(".kaomoji");
const header = document.querySelector("#main");
const about = document.querySelector(".about");

const blink = () =>
  setInterval(() => {
    if (Math.random() > 0.9) kaomoji.innerHTML = "◕‿◠✿";
    else kaomoji.innerHTML = "●‿●✿";
    setTimeout(() => (kaomoji.innerHTML = "◕‿◕✿"), 200);
  }, 1000);

const scream = () =>
  setInterval(() => {
    kaomoji.innerHTML = "◠‿◠✿";
    setTimeout(() => (kaomoji.innerHTML = "◕▽◕✿"), 500);
  }, 3000);

const heart = () =>
  setInterval(() => {
    kaomoji.innerHTML = "❤︎‿❤︎✿";
    setTimeout(() => (kaomoji.innerHTML = "♥︎‿♥︎✿"), 500);
  }, 1000);

const excited = () =>
  setInterval(() => {
    kaomoji.innerHTML = "┗(◕‿◕✿)┓";
    setTimeout(() => (kaomoji.innerHTML = "┏(◕‿◕✿)┛"), 100);
  }, 200);

let animation = blink();

let didScroll = false,
  changeHeaderOn = window.innerHeight / 3;

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

const observer = new IntersectionObserver((entries) => {
  console.log(entries);

  if (!entries.length) return;
  const highest = entries.sort(
    (a, b) => b.intersectionRatio - a.intersectionRatio,
  )[0].target;

  if (highest.classList.contains("about")) {
    clearInterval(animation);
    animation = excited();
  } else if (highest.classList.contains("main")) {
    clearInterval(animation);
    animation = blink();
  }
});

observer.observe(header);
observer.observe(about);
