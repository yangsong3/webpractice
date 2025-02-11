// 맵 기본 배경 타일 깔기
class Tile {
  static rows = 6;
  static cols = 10;
  static tileSize = 100;

  static tileImage = {
    road: "https://cdn.pixabay.com/photo/2015/04/18/07/13/rocks-728393_1280.jpg",
    bg: "https://cdn.pixabay.com/photo/2013/02/21/19/10/grass-84622_1280.jpg",
  };

  static tiles = [];

  // 스테이지 별 몬스터 이동하는 길 // 현재는 1 스테이지만
  static stageRoad = {
    1: [10, 11, 21, 31, 41, 42, 43, 44, 45, 35, 25, 15, 16, 17, 18, 28, 38, 39],
  };

  constructor(image, x, y, midX, midY) {
    this.x = x; // 이미지 생성 위치
    this.y = y; // 이미지 생성 위치
    this.midX = midX; // 각 타일의 중간 좌표
    this.midY = midY; // 각 타일의 중간 좌표
    this.image = image;
  }

  static setTiles() {
    for (let row = 0; row < Tile.rows; row++) {
      for (let col = 0; col < Tile.cols; col++) {
        let tile = new Tile(
          Tile.tileImage["bg"],
          col * Tile.tileSize,
          row * Tile.tileSize,
          col * Tile.tileSize + Tile.tileSize / 2,
          row * Tile.tileSize + Tile.tileSize / 2
        );
        Tile.tiles.push(tile);
      }
    }
    // console.log(Tile.tiles); // 정상 세팅 확인용
  }

  static setRoadTiles(stage) {
    let road = Tile.stageRoad[stage];

    for (let i = 0; i < road.length; i++) {
      Tile.tiles[road[i]].image = Tile.tileImage["road"];
    }
  }

  drawTile(bctx) {
    let mapTileImage = new Image();
    mapTileImage.src = this.image;
    mapTileImage.addEventListener("load", () => {
      bctx.drawImage(
        mapTileImage,
        this.x,
        this.y,
        Tile.tileSize,
        Tile.tileSize
      );
    });
    // console.log(mapTileImage);
  }

  static setting(){
    Tile.setTiles(); // 기본 전체 배경 타일 설정
    Tile.setRoadTiles(1); // 스테이지 별 몬스터 이동 경로 타일 배경 설정
  }

  static drawMap(bctx) {
    Tile.tiles.forEach((tile) => tile.drawTile(bctx)); // 뒷캔버스에 타일 그리기
    // console.log("drawMap");
  }
}

class Tower {

  static towerImage = {1:""};
  static towers = [];
  static towerSize = 90;
  
  constructor(towerImage, x, y, target, speed) {
    this.towerImage = towerImage;
    this.x = x;
    this.y = y;
    this.target = target;
    this.speed=speed;
  }

  static installTower(e){
    let tower = new Tower(e.target.src,);
    
    Tower.towers.push(tower);
  }

  attack(){

  }
}

class Monster {}

class Projectile {}

// 고정 물체 그리는 캔버스
/** @type {HTMLCanvasElement} */
const bcvs = document.getElementById("canvas");
const bctx = bcvs.getContext("2d");
const bcvsW = 1000;
const bcvsH = 600;

// 움직이는 물체 그리는 캔버스
/** @type {HTMLCanvasElement} */
const cvs = document.getElementById("dcanvas");
const ctx = cvs.getContext("2d");
const cvsW = 1000;
const cvsH = 600;

let cvsLoop = false;

function draw(){
  Tile.drawMap(bctx);
}

function main() {
  Tile.setting();
  Tile.drawMap(bctx);
}

// 메인화면 시작하기 버튼
const startBtn = document.getElementsByClassName("mainbutton")[0];

startBtn.addEventListener("click", () => {
  if (!cvsLoop) {
    cvsLoop = true;
  }
  if (cvsLoop){
    Tile.drawMap(bctx);
    console.log("drawMap");

  }
});

// 우측 타워 아이템 클릭 이벤트
const towerClass = document.getElementsByClassName("item");

for (let i =0; i<towerClass.length;i++){
  towerClass[i].addEventListener("click", function(e) {
    let img = new Image();
    if (e.target == document.querySelector('.item')) {
      img.src = e.target.children[0].src;
    } else if (e.target == document.querySelector('.itemimg')) {
      img.src = e.target.src;
    } else {
      return;
    }
    img.style.display = 'block';
    img.width = Tower.towerSize;
    img.height = Tower.towerSize;

    function moveImage(e) {
      document.body.appendChild(img);
      const mouseX = e.pageX;
      const mouseY = e.pageY;
    }
    
  });
}












main();
