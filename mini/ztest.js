// ztest 백업용

import * as Tile from "./tile.js";

class Monster {
  constructor(x, y, hp, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.hp = hp;
  }
}

class Projectile {
  constructor(x, y, target, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.target = target; // 타겟 몬스터
    this.isCrushed = false; // 충돌
    this.interval; // 발사 간격
  }
}

class Tower {
  constructor(x, y, posx, posy, range) {
    this.x = x;
    this.y = y;
    this.posx = posx;
    this.posy = posy;
    this.range = range;
  }
}

// canvas
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// main loop
let mainLoop = true;

// life
let life = 10;

// monster
const monsterImg = new Image();
monsterImg.src =
  "data:image/jpeg;base64,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";
const monsterImgSize = 80;
let monsterLoop = true;

let monsters = [];
for (let i = 0; i < 3; i++) {
  let monster = new Monster(-50, 150, 10, 5);
  monsters.push(monster);
}
// let monster = new Monster(-50, 150, 10, 5);
// monsters.push(monster);

// monster spawn interval
let startTime = Date.now();
let monsterSpawnInterval = 500;
monsters = monsters.map((monster, index) => ({
  ...monster,
  spawnTime: index * monsterSpawnInterval, // 각 몬스터가 순차적으로 출발
}));

// projectile
let projectiles = [];

// target
let targets = [];

// tower
drawMap();

let towers = [];
let tower = new Tower(
  Tile.tiles[12].x,
  Tile.tiles[12].y,
  Tile.tiles[12].posx,
  Tile.tiles[12].posy,
  100
);
towers.push(tower);
const towerImg = new Image();
towerImg.src =
  "data:image/jpeg;base64,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";
const towerSize = 90;

// 타일 배치 (맵 그리기)
function drawMap() {
  Tile.setTiles();
  Tile.setRoadTiles();
  Tile.tiles.forEach((tile) => tile.draw(ctx));
}

// 타워 그리기
function drawTower() {
  ctx.drawImage(towerImg, tower.x + 5, tower.y + 5, towerSize, towerSize);
}

// 몬스터
function drawMonster() {
  let currentTime = Date.now();
  let activeMonster = 0;
  if (monsters.length > 0) {
    monsters.forEach((monster) => {
      if (currentTime - startTime < monster.spawnTime) {
        return;
      }

      if (monster.x == Tile.tiles[39].posx + 100) {
        return;
      }

      activeMonster++;

      // console.log(monster.x,monster.y);

      for (let i = 0; i < Tile.monsterPath.length - 1; i++) {
        let start = Tile.tiles[Tile.monsterPath[i]];
        let end = Tile.tiles[Tile.monsterPath[i + 1]];
        if (monster.x < end.posx && monster.y == start.posy) {
          monster.x += monster.speed;
          break;
        } else if (monster.x == start.posx && monster.y < end.posy) {
          monster.y += monster.speed;
          break;
        } else if (monster.x == start.posx && monster.y > end.posy) {
          monster.y -= monster.speed;
          break;
        } else if (
          monster.x == Tile.tiles[39].posx &&
          monster.y == Tile.tiles[39].posy
        ) {
          monster.x += 100;
          life -= 1;
          monsters.shift();
          console.log("end", life, monsters);
          return;
        }
      }

      if (monster.hp <= 0) {
        activeMonster -= 1;
        monsters.shift();
      }

      // console.log(monster.x,Tile.tiles[Tile.monsterPath[0]].posx);
      ctx.drawImage(
        monsterImg,
        monster.x - monsterImgSize / 2,
        monster.y - monsterImgSize / 2,
        monsterImgSize,
        monsterImgSize
      );
      // console.log(monster.x,monster.y)
    });

    if (activeMonster === 0) {
      console.log("end");
      monsterLoop = false;
    }
  }
}

function searchMonster() {
  let range = 100;
  if (monsters.length > 0) {
    for (let i = 0; i < monsters.length; i++) {
      if (
        towers[0].posx - range <= monsters[i].x &&
        towers[0].posx + range >= monsters[i].x &&
        towers[0].posy + range >= monsters[i].y &&
        towers[0].posy - range <= monsters[i].y
      ) {
        // console.log("search", monsters[i]);
        return true;
      } else {
        return false;
      }
    }
  }
}

function atkTower() {
  if (searchMonster()) {
    for (let i = 0; i < monsters.length; i++) {
      let p = new Projectile(towers[0].posx, towers[0].posy, monsters[i], 1);
      projectiles.push(p);

      projectiles.forEach((p) => {
        let dX = p.x - p.target.x;
        let dY = p.y - p.target.y;
        let distance = Math.hypot(dX + dY);

        let speedFactor = p.speed / distance;
        // 탄알 궤도
        if (distance > -100 || distance < 100) {
          p.x -= dX * speedFactor;
          p.y -= dY * speedFactor;
          console.log(dX * speedFactor);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
      });
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  if (mainLoop) {
    drawTower();

    if (monsterLoop) {
      drawMonster();
      // searchMonster();
      atkTower();
    }

    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
