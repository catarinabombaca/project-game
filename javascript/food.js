class Food {
  constructor(game) {
    this.game = game;
    this.width = 37;
    this.height = 37;
    this.x = Math.floor(Math.random() * (this.game.canvasWidth - this.width));
    this.y = Math.floor(Math.random() * (this.game.canvasHeight - this.height));
  }

  drawFood() {
    this.game.context.strokeStyle = "black";
    this.game.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  eatFood() {
    const player = this.game.player;
    if (
      !(
        player.body[0].x + player.width < this.x ||
        player.body[0].x > this.x + this.width
      ) &&
      !(
        player.body[0].y + player.width < this.y ||
        player.body[0].y > this.y + this.width
      )
    ) {
      if (this instanceof Sausage) {
        this.game.player.points++;
        this.game.changeLevel();
      }
      if (this instanceof Brocolli) {
        if (this.game.playerAnimation > 0) {
          this.game.playerAnimation -= 10;
        }
      }
      if (this instanceof Bonus) {
        console.log(this.game.player.body.length);
        this.game.player.points++;
        this.game.changeLevel();
        this.game.player.body.splice(
          this.game.player.body.length - this.game.player.body.length
          / 2);
        console.log(this.game.player.body.length);
      }
      this.game.foods = [];
      this.game.foods.push(new Sausage(this.game));
      for (let i = 0; i < this.game.level; i++) {
        this.game.foods.push(new Brocolli(this.game));
        this.game.foods.push(new Brocolli(this.game));
      }
      if (this.game.player.points % 11 === 0) {
        this.game.foods.push(new Bonus(this.game));
      }
      return true;
    } else {
      return false;
    }
  }
}

class Brocolli extends Food {
  constructor(game) {
    super(game);
    this.img = new Image();
  }

  drawFood() {
    this.img.src = "./img/brocoli.png";
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Sausage extends Food {
  constructor(game) {
    super(game);
    this.img = new Image();
    this.width = 45;
    this.height = 45;
  }

  drawFood() {
    this.img.src = "./img/sausage.png";
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Bonus extends Food {
  constructor(game) {
    super(game);
    this.img = new Image();
    this.width = 85;
    this.height = 85;
  }

  drawFood() {
    this.img.src = "./img/bonus.png";
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
