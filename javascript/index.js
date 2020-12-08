window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  bgImage = new Image();
  bgImage.src = "./img/background.png";
  const game = new Game(canvas, bgImage);
  game.startGame();
});
