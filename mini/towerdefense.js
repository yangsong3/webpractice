import * as Tile from "./tile.js";
// import * as Tower from "./tower.js";
// import * as Monster from "./monster.js";
// import * as gm from "./event.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 맵 그리기
function drawMap() {
  Tile.setTiles();
  Tile.setRoadTiles();
  Tile.tiles.forEach((tile) => tile.draw(ctx));
}

// 타워 그리기
function drawTower() {}

// 몬스터 그리기
function drawMonster() {
  Monster.createMonster(5);
}

// 맵 위에 애니메이션 구현
function animate() {
  requestAnimationFrame(animate);
}

// 메인 루프
function mainLoop() {
  drawMap();
  drawTower();
  animate();
}

mainLoop();