import * as Tile from "./tile.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 맵 그리기
function drawMap() {
  Tile.setTiles();
  Tile.setRoadTiles();
  Tile.tiles.forEach((tile) => tile.draw(ctx));
}

// 메인 루프
function mainLoop() {
  drawMap();
}

mainLoop();

// 타일 선택
function tileSelect(e) {
  Tile.tiles.forEach((tile) => {
    if (
      tile.x < e.offsetX &&
      e.offsetX < tile.x + tile.size &&
      tile.y < e.offsetY &&
      e.offsetY < tile.y + tile.size
    ) {
      console.log(tile.x, tile.y, tile);
      if (!tile.tower) {
        tile.tower = true;
      }
    }
  });
}



canvas.addEventListener("click", (e) => {
  tileSelect(e);
  drawMap();
});


// 실험용 클래스

class Tower {
  constructor() {
    this.x;
    this.y;
    this.range;
    this.damage;
    this.atkspeed;
  }
}

class Monster {
  constructor() {
    this.x;
    this.y;
    this.hp;
    this.speed;
  }
}

class GameEvent {
  constructor() {}
}
