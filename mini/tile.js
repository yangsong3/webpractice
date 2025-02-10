export class Tile {
  constructor(x, y, size, posx, posy) {
    this.x = x; // 타일 배치할 X 좌표
    this.y = y; // 타일 배치할 Y 좌표
    this.size = size; // 타일 사이즈
    this.posx = posx; // 타일의 중심 x 좌표
    this.posy = posy; // 타일의 중심 y 좌표
    this.road = false; // 타일이 길인지
  }

  draw(ctx) {
    // 캔버스에 타일 그리기
    if (this.road) {
      ctx.fillStyle = "brown";
      ctx.fillRect(this.x, this.y, this.size, this.size);
    } else if (this.tower) {
      ctx.fillStyle = "violet";
      ctx.fillRect(this.x, this.y, this.size, this.size);
    } else {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
  }
}

// 타일 생성
const rows = 6; // 세로칸 수
const cols = 10; // 가로칸 수
const tileSize = 100; // 사이즈

export let tiles = []; // 각각의 타일들 모음

export function setTiles() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let tile = new Tile(
        col * tileSize,
        row * tileSize,
        tileSize,
        col * tileSize + tileSize / 2,
        row * tileSize + tileSize / 2
      );
      tiles.push(tile);
    }
  }
}

// 길 타일번호
export const roadTiles = [
  10, 11, 21, 31, 41, 42, 43, 44, 45, 35, 25, 15, 16, 17, 18, 28, 38, 39,
];

// 길 타일 설정
export function setRoadTiles() {
  for (let i = 0; i < roadTiles.length; i++) {
    tiles[roadTiles[i]].road = true;
  }
}

// 몬스터 방향 변경지점
export const monsterPath = [
  11,41,45,15,18,38,39
]

// 타일에 타워 설치시
export function setTileTower(tile) {
  tile.tower = true;
}
