class Game {
  constructor(canvas, bgImage) {
    this.context = canvas.getContext("2d");
    this.canvasWidth = 1000;
    this.canvasHeight = 800;
    this.player = new Player("Catarina", this);
    this.foods = [new Sausage(this), new Brocolli(this), new Brocolli(this)];
    this.playerAnimation = 260;
    this.background = bgImage;
    this.backSound = new Audio();
    this.backSound.src = "./sounds/back.wav";
    this.backSound.loop = true;
    this.level = 1;
    this.isStarted = false;
    this.isFinished = false;
  }

  updateEverything(pastTimestamp) {
    requestAnimationFrame((timestamp) => {
      if (
        timestamp - pastTimestamp > this.playerAnimation &&
        this.isStarted &&
        !this.isFinished
      ) {
        this.changePlayer();
        pastTimestamp = timestamp;
      }
      this.deleteEverything();
      this.drawEverything();
      console.log(this.player.points, this.level, this.playerAnimation);
      this.updateEverything(pastTimestamp);
    });
  }

  deleteEverything() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  changePlayer() {
    const newHead = {
      x: this.player.body[0].x + this.player.speedX,
      y: this.player.body[0].y + this.player.speedY,
      d: this.player.body[0].d[this.player.body[0].d.length-1],
    };
    if (this.player.hasSelfCollide()) {
      this.speedX = 0;
      this.speedY = 0;
      this.endGame();
    } else {
      if (newHead.x === this.canvasWidth) {
        this.speedX = 0;
        this.endGame();
      } else if (newHead.x === -this.player.width) {
        this.speedX = 0;
        this.endGame();
      } else if (newHead.y === this.canvasHeight) {
        this.speedY = 0;
        this.endGame();
      } else if (newHead.y === -this.player.height) {
        this.speedY = 0;
        this.endGame();
      } else {
        this.player.body.unshift(newHead);
        this.eatFoods();
      }
    }
  }

  drawFoods() {
    this.foods.forEach((food) => {
      food.drawFood();
    });
  }

  drawBackground() {
    this.context.drawImage(
      this.background,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  drawStart() {
    const img = new Image();
    img.src = "./img/start.png";
    this.context.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawRestart() {
    const img = new Image();
    img.src = "./img/end.png";
    this.context.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
    this.printScore()
  }

  drawEverything() {
    if (!this.isStarted) {
      this.drawStart();
    } else if (this.isFinished) {
      this.drawRestart();
    } else {
      this.drawBackground();
      this.player.drawPlayer();
      this.drawFoods();
      this.printScore();
    }
  }

  eatFoods() {
    let pop = false;
    this.foods.forEach((food) => {
      if (food.eatFood()) {
        pop = true;
        this.player.eatSound.play();
      }
    });
    if (!pop) {
      this.player.body.pop();
    }
  }

  startGame() {
    this.backSound.play();
    this.setControls();
    this.updateEverything(0);
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 32) {
        this.isStarted = true;
      }
      if (e.keyCode === 82) {
        this.player = new Player("Catarina", this);
        this.foods = [
          new Sausage(this),
          new Brocolli(this),
          new Brocolli(this),
        ];
        this.playerAnimation = 260;
        this.level = 1;
        this.isFinished = false;
      }
    });
  }

  changeLevel() {
    if (this.player.points % 5 === 0 && this.player.points > 0) {
      this.level++;
      if (this.playerAnimation > 0) {
        this.playerAnimation -= 10;
      }
    }
  }

  printScore() {
    this.context.fillStyle = "white";
    this.context.font = "28px serif";
    this.context.fillText("Score", this.canvasWidth - 93, 30);
    this.context.font = "18px serif";
    this.context.fillText(`Level: ${this.level}`, this.canvasWidth - 90, 60);
    this.context.fillText(
      `Points: ${this.player.points}`,
      this.canvasWidth - 90,
      82
    );
  }

  endGame() {
    this.isFinished = true;
  }

  setControls() {
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 39:
          this.player.moveRight();
          break;
        case 37:
          this.player.moveLeft();
          break;
        case 38:
          this.player.moveUp();
          break;
        case 40:
          this.player.moveDown();
          break;
      }
    });
  }
}
