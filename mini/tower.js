const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1000; // 캔버스 너비 설정
canvas.height = 600; // 캔버스 높이 설정
let tileWidth = 100; // 타일의 너비
let tileHeight = 100; // 타일의 높이
let towers = [];


const qoqo = document.getElementById('qoqo'); // 타워 아이콘 객체화
let buildingPossible = false; // 타워 설치 가능 초기값

const img = new Image();
img.src = 'https://w7.pngwing.com/pngs/416/994/png-transparent-computer-icons-turret-game-weapon-angle-world-desktop-wallpaper-thumbnail.png'

qoqo.addEventListener('click', function() {
  const img = new Image(); 
  img.src = 'https://w7.pngwing.com/pngs/416/994/png-transparent-computer-icons-turret-game-weapon-angle-world-desktop-wallpaper-thumbnail.png'; // 타워 아이콘 이미지 소스 설정
  img.style.display = 'block'; 
  img.width = 100; 
  img.height = 100; 
  
  
  // 마우스를 움직일 때마다 이미지 위치를 따라가게 하는 함수
  function moveImage(event) {
    document.body.appendChild(img); 
    const mouseX = event.pageX; // 마우스 X 좌표
    const mouseY = event.pageY; // 마우스 Y 좌표

    // 이미지의 위치를 마우스 좌표로 설정
    img.style.left = mouseX + 'px';
    img.style.top = mouseY + 'px';


  }

  document.addEventListener('mousemove', moveImage); // 마우스가 움직일 때마다
  

  document.addEventListener('mouseup', function(e) {
    document.body.removeChild(img);
    const mouseX = e.pageX; 
    const mouseY = e.pageY; 

    // 타워를 배치할 타일의 X, Y 위치 계산 (타일 크기로 나누어서 위치 계산)
    const tileX = Math.floor((mouseX - canvas.offsetLeft) / tileWidth);
    const tileY = Math.floor((mouseY - canvas.offsetTop) / tileHeight);

    console.log('타일 X:', tileX, '타일 Y:', tileY);

    // 타워가 배치 가능한지 확인
    if (tileX >= 0 && tileX < canvas.width / tileWidth && tileY >= 0 && tileY < canvas.height / tileHeight) {
      // 타워 객체 생성
      const towerInstance = new Tower(50, 1, '타워', 3, tileX * tileWidth, tileY * tileHeight);
      towerInstance.draw();
      towers.push(towerInstance);
      document.removeEventListener('mousemove', moveImage); // 마우스 이동 이벤트 제거
    }
  });
});

class Tower {
  constructor(damage, attackSpeed, attackType, attackRange, x, y) {
    this.damage = damage; 
    this.attackSpeed = attackSpeed; 
    this.attackType = attackType; 
    this.attackRange = attackRange; 
    this.x = x; 
    this.y = y; 
  }

  draw() {
    c.drawImage(img, this.x, this.y, tileWidth, tileHeight);
    c.beginPath();
    // c.arc(this.x + tileWidth / 2, this.y + tileHeight / 2, this.attackRange * tileWidth / 2, 0, Math.PI * 2);
    c.fillStyle = 'rgba(0, 0, 255, 0.2)'
    c.fillRect(this.x- tileWidth , this.y - tileHeight, 300, 300,);
    c.fill()
    setTimeout(() => {
      this.clear(); 
      this.redrawTowers();
    }, 1000);

}

  clear() {
    c.clearRect(this.x + tileWidth / 2 - this.attackRange * tileWidth / 2, 
      this.y + tileHeight / 2 - this.attackRange * tileWidth / 2, 
      this.attackRange * tileWidth, 
      this.attackRange * tileWidth);
}

  redrawTowers() {
  towers.forEach(tower => {
    c.drawImage(img, tower.x, tower.y, tileWidth, tileHeight);
  });
}
  attack() {
    monster.health -= this.damage;
  }
}

canvas.onclick = function(event) {
  const x = event.clientX - c.canvas.offsetLeft;
  const y = event.clientY - c.canvas.offsetTop; 
  console.log(x, y); 
};

