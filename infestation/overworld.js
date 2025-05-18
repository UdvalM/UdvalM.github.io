class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    const image = new Image(); 
    image.onload = () => {
      this.ctx.drawImage(image, 0,0)
    };
    image.src = "images/maps/overworld.png";

    const udgan = new Image();
    udgan.onload = () => {
      this.ctx.drawImage(
        udgan,
        0,
        0,
        
         
      )
    };
    udgan.src = "images/characters/main/udgan.png";
  }
}

