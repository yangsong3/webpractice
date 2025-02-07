export class Tile {
  constructor(x, y, size, posx,posy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.posx = posx;
    this.posy = posy;
    this.road = false;
    this.tower = false;
    this.monster = false;
  }

  draw(ctx) {
    if (this.road) {
      ctx.fillStyle="brown"
      ctx.fillRect(this.x,this.y,this.size,this.size);
    }
    ctx.strokeStyle="black";
    ctx.strokeRect(this.x,this.y,this.size,this.size);
  }

}
