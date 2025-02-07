import { Tile } from "./tile.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 타일 생성
const rows = 6; // 세로칸 수
const cols = 10; // 가로칸 수
const tileSize = 100; // 사이즈

let tiles = []; // 각각의 타일들 모음

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    let tile = new Tile(col * tileSize, row * tileSize, tileSize, col*tileSize+tileSize/2,row*tileSize+tileSize/2);
    tiles.push(tile);
  }
}

// console.log(tiles[0]);

// 길 타일 설정
const roadTiles = [
  10,11,21,31,41,42,43,44,45,35,25,15,16,17,18,28,38,39
];

for (let i = 0;i<roadTiles.length;i++) {
  tiles[roadTiles[i]].road=true;
}

//맵 그리기
function drawMap() {
  tiles.forEach(tile => tile.draw(ctx));
}

drawMap();

// ctx.fillStyle="black";
// ctx.fillRect(0,0,500,500);

canvas.addEventListener("click", (e) => {
  console.log(e.offsetX,e.offsetY);
});