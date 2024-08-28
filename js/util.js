const blink = (kaomoji) =>
  setInterval(() => {
    if (Math.random() > 0.9) kaomoji.innerHTML = "◕‿◠✿";
    else kaomoji.innerHTML = "●‿●✿";
    setTimeout(() => (kaomoji.innerHTML = "◕‿◕✿"), 200);
  }, 1000);

const scream = (kaomoji) =>
  setInterval(() => {
    kaomoji.innerHTML = "◠‿◠✿";
    setTimeout(() => (kaomoji.innerHTML = "◕▽◕✿"), 500);
  }, 3000);

const heart = (kaomoji) =>
  setInterval(() => {
    kaomoji.innerHTML = "❤︎‿❤︎✿";
    setTimeout(() => (kaomoji.innerHTML = "♥︎‿♥︎✿"), 500);
  }, 1000);

const excited = (kaomoji) =>
  setInterval(() => {
    kaomoji.innerHTML = "┗(◕‿◕✿)┓";
    setTimeout(() => (kaomoji.innerHTML = "┏(◕‿◕✿)┛"), 100);
  }, 200);
