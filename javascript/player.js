class Player {
  constructor(name, game) {
    this.game = game;
    this.name = name;
    this.points = 0;
    this.speedX = 50;
    this.speedY = 0;
    this.direction = "R";
    this.x = 500;
    this.y = 300;
    this.width = this.speedX;
    this.height = this.speedX;
    this.body = [
      { x: this.x, y: this.y, d: "R" },
      { x: this.x - 50, y: this.y, d: "R" },
      { x: this.x - 100, y: this.y, d: "R" },
    ];
    this.eatSound = new Audio();
    this.eatSound.src = "./sounds/eat.wav";
    this.headImg = {
      R: new Image(),
      D: new Image(),
      L: new Image(),
      U: new Image(),
    };
    this.headImg.R.src = `./img/headdogR.png`;
    this.headImg.D.src = `./img/headdogD.png`;
    this.headImg.U.src = `./img/headdogU.png`;
    this.headImg.L.src = `./img/headdogL.png`;
    this.bodyImg = {
      R: new Image(),
      D: new Image(),
      L: new Image(),
      U: new Image(),
      RU: new Image(),
      RD: new Image(),
      DL: new Image(),
      DR: new Image(),
      LU: new Image(),
      LD: new Image(),
      UL: new Image(),
      UR: new Image()
    };
    this.bodyImg.R.src = `./img/bodydogR.png`;
    this.bodyImg.D.src = `./img/bodydogD.png`;
    this.bodyImg.U.src = `./img/bodydogU.png`;
    this.bodyImg.L.src = `./img/bodydogL.png`;
    this.bodyImg.RU.src = `./img/cornerRU.png`;
    this.bodyImg.RD.src = `./img/cornerRD.png`;
    this.bodyImg.DL.src = `./img/cornerDL.png`;
    this.bodyImg.DR.src = `./img/cornerDR.png`;
    this.bodyImg.LU.src = `./img/cornerLU.png`;
    this.bodyImg.LD.src = `./img/cornerLD.png`;
    this.bodyImg.UL.src = `./img/cornerUL.png`;
    this.bodyImg.UR.src = `./img/cornerUR.png`;
    this.tailImg = {
      R: new Image(),
      D: new Image(),
      L: new Image(),
      U: new Image(),
    };
    this.tailImg.R.src = `./img/assdogR.png`;
    this.tailImg.D.src = `./img/assdogD.png`;
    this.tailImg.U.src = `./img/assdogU.png`;
    this.tailImg.L.src = `./img/assdogL.png`;
  }

  drawPlayer() {
    for (let i = 0; i < this.body.length; i++) {
      let dir = this.body[i].d;
      if (i === 0) {
        this.game.context.drawImage(
          this.headImg[`${dir[dir.length - 1]}`],
          this.body[i].x,
          this.body[i].y,
          this.width,
          this.height
        );
      } else if (i === this.body.length - 1) {
        this.game.context.drawImage(
          this.tailImg[`${dir[dir.length-1]}`],
          this.body[i].x,
          this.body[i].y,
          this.width,
          this.height
        );
      } else {
        this.game.context.drawImage(
          this.bodyImg[`${dir}`],
          this.body[i].x,
          this.body[i].y,
          this.width,
          this.height
        );
      }
    }
  }

  hasSelfCollide() {
    for (let i = 0; i < this.body.length; i++) {
      if (i !== 0) {
        if (
          !(
            this.body[0].x + this.width <= this.body[i].x ||
            this.body[0].x >= this.body[i].x + this.width
          ) &&
          !(
            this.body[0].y + this.width <= this.body[i].y ||
            this.body[0].y >= this.body[i].y + this.width
          )
        ) {
          return true;
        }
      }
    }
  }

  moveRight() {
    if (!(this.body[0].d === "L" || this.body[0].d === "R")) {
      let oldDir = this.body[0].d;
      if (oldDir === "U") {
        this.body[0].d = "UR";
      } else {
        this.body[0].d = "DR";
      }
      this.speedX = +this.width;
      this.speedY = 0;
    }
  }

  moveLeft() {
    if (!(this.body[0].d === "R" || this.body[0].d === "L")) {
      let oldDir = this.body[0].d;
      if (oldDir === "U") {
        this.body[0].d = "UL";
      } else {
        this.body[0].d = "DL";
      }
      this.speedX = -this.width;
      this.speedY = 0;
    }
  }

  moveUp() {
    if (!(this.body[0].d === "D" || this.body[0].d === "U")) {
      let oldDir = this.body[0].d;
      if (oldDir === "R") {
        this.body[0].d = "RU";
      } else {
        this.body[0].d = "LU";
      }
      this.speedX = 0;
      this.speedY = -this.width;
    }
  }

  moveDown() {
    if (!(this.body[0].d === "U" || this.body[0].d === "D")) {
      let oldDir = this.body[0].d;
      if (oldDir === "R") {
        this.body[0].d = "RD";
      } else {
        this.body[0].d = "LD";
      }
      this.speedX = 0;
      this.speedY = +this.width;
    }
  }
}
