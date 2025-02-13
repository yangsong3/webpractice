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
    this.isInstallable = true;
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
      Tile.tiles[road[i]].isInstallable = false;
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
  }

  static setting() {
    Tile.setTiles(); // 기본 전체 배경 타일 설정
    Tile.setRoadTiles(Status.stage); // 스테이지 별 몬스터 이동 경로 타일 배경 설정
  }

  static drawMap(bctx) {
    Tile.tiles.forEach((tile) => tile.drawTile(bctx)); // 뒷캔버스에 타일 그리기
  }
}

class Tower {
  static towers = [];
  static towerSize = 90;
  static attackRange = 150; // 사거리

  constructor(towerImage, x, y, speed) {
    this.towerImage = towerImage;
    this.x = x;
    this.y = y;
    this.target = null;
    this.speed = speed;
    this.image = towerImage;
  }

  findTarget() {
    let inRangeMonsters = Monster.monsters.filter((monster) => {
      let distance = Math.hypot(this.x - monster.x, this.y - monster.y);
      return distance <= Tower.attackRange;
    });

    if (inRangeMonsters.length > 0) {
      this.target = inRangeMonsters.reduce((prev, curr) =>
        prev.pathIndex > curr.pathIndex ? prev : curr
      );
    } else {
      this.target = null;
    }
  }

  shoot() {
    if (this.target) {
      Projectile.projectiles.push(
        new Projectile(this.x, this.y, this.target, 20)
      );
    }
  }

  draw(bctx) {
    this.drawRange(bctx);

    bctx.drawImage(
      this.image,
      this.x - Tower.towerSize / 2,
      this.y - Tower.towerSize / 2,
      Tower.towerSize,
      Tower.towerSize
    );
  }

  drawRange(bctx) {
    bctx.beginPath();
    bctx.arc(this.x, this.y, Tower.attackRange, 0, Math.PI * 2);
    bctx.fillStyle = "rgba(0,0,255,0.2)";
    bctx.fill();
    bctx.closePath();
  }

  static updateTowers(){
    Tower.towers.forEach((tower) => {
      tower.findTarget();
      if (tower.target) {
        tower.shoot();
      }
    });
  }
}

class Monster {
  static size = 80;
  static path = [11, 41, 45, 15, 18, 38, 39];
  static monstersbywave = { 1: 5, 2: 10, 3: 15, 4: 20 };
  static monsters = [];
  static imgSrc =
    "https://png.pngtree.com/png-clipart/20190618/original/pngtree-anime-character-campus-game-character-anime-comic-hand-drawn-png-image_3923580.jpg";

  constructor(x, y, hp, speed) {
    this.image = new Image();
    this.image.src = Monster.imgSrc;
    this.isImageLoaded = false;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };

    this.x = x;
    this.y = y;
    this.hp = hp;
    this.speed = speed;
    this.pathIndex = 0;
    this.isMoving = false;
  }

  move() {
    if (this.pathIndex >= Monster.path.length) {
      const monsterIndex = Monster.monsters.indexOf(this);
      if (monsterIndex !== -1) {
        Monster.monsters.splice(monsterIndex, 1);
        Status.lifeUpdate((Status.life -= 1));
      }

      if (Monster.monsters.length === 0) {
        console.log("몬스터 없음.");
        clearInterval(gameFrameInterval);
        gameFrameLoop = false;
        drawBg();
        Status.waveUpdate((Status.wave += 1));
      }
      return;
    }

    let targetTile = Tile.tiles[Monster.path[this.pathIndex]];
    if (
      Math.abs(this.x - targetTile.midX) < this.speed &&
      Math.abs(this.y - targetTile.midY) < this.speed
    ) {
      this.x = targetTile.midX;
      this.y = targetTile.midY;
      this.pathIndex++;
    } else {
      if (this.x < targetTile.midX) this.x += this.speed;
      else if (this.x > targetTile.midX) this.x -= this.speed;

      if (this.y < targetTile.midY) this.y += this.speed;
      else if (this.y > targetTile.midY) this.y -= this.speed;
    }
  }

  draw(bctx) {
    if (this.isImageLoaded) {
      bctx.drawImage(
        this.image,
        this.x - Monster.size / 2,
        this.y - Monster.size / 2,
        Monster.size,
        Monster.size
      );
      bctx.fillStyle = "red";
      bctx.fillRect(this.x - 20, this.y -50, 40 * (this.hp / 20), 5);
    }
  }

  static setMonsters(amount, hp, x, y) {
    if (!gameFrameLoop) {
      for (let i = 0; i < amount; i++) {
        let monster = new Monster(x, y, hp, 5);
        Monster.monsters.push(monster);
      }
    }
  }

  static monsterFrame(bctx) {
    if (!gameFrameLoop) return;

    let activeMonsterCount = 0;

    let moving = setInterval(() => {
      if (activeMonsterCount < Monster.monsters.length) {
        Monster.monsters[activeMonsterCount].isMoving = true;
        activeMonsterCount++;
      }

      if (
        activeMonsterCount >= Monster.monsters.length ||
        Monster.monsters.length === 0
      ) {
        clearInterval(moving);
      }
    }, 500);

    // 몬스터 이동 및 제거
    for (let i = Monster.monsters.length - 1; i >= 0; i--) {
      let monster = Monster.monsters[i];

      if (monster.isMoving) {
        monster.move();
      }
      monster.draw(bctx);

      if (monster.pathIndex >= Monster.path.length) {
        Monster.monsters.splice(i, 1);
        Status.lifeUpdate((Status.life -= 1));
      }
    }

    if (Monster.monsters.length === 0) {
      console.log("모든 몬스터가 사라짐. 애니메이션 중지!");
      clearInterval(gameFrameInterval);
      gameFrameLoop = false;
      Status.waveUpdate((Status.wave += 1));
    }
  }
}

class Projectile {
  static projectiles = [];

  constructor(x, y, target, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.target = target;
  }

  move() {
    if (!this.target) return;

    let dx = this.target.x - this.x;
    let dy = this.target.y - this.y;
    let distance = Math.hypot(dx, dy);

    if (distance < this.speed) {
      this.hitTarget();
      return;
    }

    this.x += (dx / distance) * this.speed;
    this.y += (dy /distance) * this.speed;
  }

  hitTarget(){
    if (this.target) {
      this.target.hp -= 1;

      if (this.target.hp <= 0) {
        this.removeMonster(this.target);
      }
    }
    Projectile.projectiles.splice(Projectile.projectiles.indexOf(this),1);
  }

  removeMonster(monster){
    let index = Monster.monsters.indexOf(monster);
    if ( index !== -1){
      Monster.monsters.splice(index, 1);
      Status.goldUpdate(Status.gold += 10);
    }
  }


  draw(bctx) {
    bctx.fillStyle = "blue";
    bctx.beginPath();
    bctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    bctx.fill();
  }

  static updateProjectiles(bctx) {
    Projectile.projectiles.forEach((p) => {
      p.move();
      p.draw(bctx);
    });
  }
}

class Status {
  static stage = 1; // 현재 스테이지 // 디폴트 1
  static wave = 1; // 현재 웨이브 // 디폴트 1
  static life = 3; // 라이프 // 디폴트 3
  static gold = 0; // 보유 골드 // 디폴트 0

  static statusUpdate(stage, wave, life, gold) {
    Status.stage = stage;
    Status.wave = wave;
    Status.life = life;
    Status.gold = gold;
  }

  static waveUpdate(wave) {
    let waveBar = document.getElementsByClassName("statusbar")[1];
    Status.wave = wave;
    waveBar.innerText = `Wave : ${Status.wave}`;
  }

  static lifeUpdate(life) {
    let lifeBar = document.getElementsByClassName("statusbar")[2];
    Status.life = life;
    lifeBar.innerText = `life : ${Status.life}`;
  }

  static goldUpdate(gold) {
    let goldBar = document.getElementsByClassName("statusbar")[3];
    Status.gold = gold;
    goldBar.innerText = `Gold : ${Status.gold}`;
  }

  static display() {
    let stage = document.getElementsByClassName("statusbar")[0];
    let wave = document.getElementsByClassName("statusbar")[1];
    let life = document.getElementsByClassName("statusbar")[2];
    let gold = document.getElementsByClassName("statusbar")[3];

    stage.innerText = `Stage : ${Status.stage}`;
    wave.innerText = `Wave : ${Status.wave}`;
    life.innerText = `life : ${Status.life}`;
    gold.innerText = `Gold : ${Status.gold}`;
  }
}

// 캔버스
/** @type {HTMLCanvasElement} */
const bcvs = document.getElementById("canvas");
const bctx = bcvs.getContext("2d");
const bcvsW = 1000;
const bcvsH = 600;

// topbar에 수치 표시
function statusDisplay() {
  Status.statusUpdate(1, 1, 3, 20);
  Status.display();
}

// 우측 타워 아이템 클릭 이벤트
const towerClass = document.getElementsByClassName("item");
let hasItem = false;

// 우측 타워 아이템 클래스 전체를 돌며 이벤트 설정
for (let i = 0; i < towerClass.length; i++) {
  towerClass[i].addEventListener("click", function(e) {
    let img = new Image();
    if (Array.from(document.querySelectorAll(".itemimg")).includes(e.target)) {
      console.log("sucess");
      img.src = e.target.src;
      if (Status.gold >= e.target.alt) {
        hasItem = true;
        Status.goldUpdate((Status.gold -= e.target.alt));
        console.log("구매성공, 남은 골드 :", Status.gold);

        bcvs.addEventListener("click", (e) => {
          if (hasItem) {
            for (let i = 0; i < Tile.tiles.length; i++) {
              if (
                Tile.tiles[i].midX + Tile.tileSize / 2 > e.offsetX &&
                Tile.tiles[i].midY + Tile.tileSize / 2 > e.offsetY &&
                Tile.tiles[i].midX - Tile.tileSize / 2 < e.offsetX &&
                Tile.tiles[i].midY - Tile.tileSize / 2 < e.offsetY
              ) {
                if (Tile.tiles[i].isInstallable) {
                  let tower = new Tower(
                    img,
                    Tile.tiles[i].midX,
                    Tile.tiles[i].midY,
                    5
                  );
                  tower.draw(bctx);
                  Tower.towers.push(tower);
                  Tile.tiles[i].isInstallable = false;
                  console.log(Tile.tiles[i], Tower.towers);
                  hasItem = false;
                } else {
                  console.log("타워 설치 불가");
                }
              }
            }
          }
        });
      } else {
        console.log("골드 부족, 보유 골드 :", Status.gold);
      }
    } else {
      return;
    }
    img.style.position = "absolute";
    img.width = Tower.towerSize;
    img.height = Tower.towerSize;
  });
}

// 게임진행 프레임 그리기
function drawFrame() {
  Tile.drawMap(bctx);
  Tower.towers.forEach((tower) => tower.draw(bctx));
  Tower.updateTowers();
  Projectile.updateProjectiles(bctx);
  Monster.monsterFrame(bctx);
  Status.display();
  console.log("drawFrame");
}

// 메인 화면
function init() {
  Tile.setting();
  statusDisplay();
  Tile.drawMap(bctx);
  Tower.towers.forEach((tower) => tower.draw(bctx));
}

// 캔버스 동적 물체 루프 시작 여부
let gameFrameLoop = false;

// 인터벌 설정
let gameFrameInterval;

// 메인화면 시작하기 버튼
const startBtn = document.getElementsByClassName("mainbutton")[0];

startBtn.addEventListener("click", () => {
  Monster.setMonsters(
    Monster.monstersbywave[Status.wave],
    30,
    Tile.tiles[10].midX - 150,
    Tile.tiles[10].midY
  );
  if (!gameFrameLoop) {
    gameFrameLoop = true;
    gameFrameInterval = setInterval(drawFrame, 1000 / 244);
    console.log("setInterval");
  }
});

init();
