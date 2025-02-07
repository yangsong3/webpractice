const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1000;
canvas.height= 600;
// c.fillStyle = 'blue'
// c.fillRect(0,0,80,80)


const qoqo = document.getElementById('qoqo');
  qoqo.addEventListener('click', function() {
    const img = new Image(); 
    img.src = 'https://w7.pngwing.com/pngs/416/994/png-transparent-computer-icons-turret-game-weapon-angle-world-desktop-wallpaper-thumbnail.png'
    img.style.display = 'block'; 
    img.width = 100;
    img.height =100;
    document.body.appendChild(img); 

    function moveImage(event) {
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      img.style.left = mouseX + 'px';
      img.style.top = mouseY + 'px';
    }

    document.addEventListener('mousemove', moveImage);// 마우스를 움직일 때마다 이미지 위치를 변경
    document.addEventListener('mouseup', function() {
      document.removeEventListener('mousemove', moveImage);
    });
  });

  
  //10, 11, 21, 31, 41, 42, 43, 44, 45, 35, 25, 15, 16, 17, 18, 28, 38, 39길타일 제외
  //설치가능한 장소 판단후 설치 함








canvas.onclick = function(event){
    const x = event.clientX - c.canvas.offsetLeft;
    const y = event.clientY - c.canvas.offsetTop;
    console.log(x,y);
}

//이벤트바 하단 타워이미지 객체화 
//이벤트리스너 'onclick'추가해서 타워구매 가능한상태로 만들기.
let buildingPossible=false; //타워설치 가능 초기값



export class Tower {
    constructor(position ={x:0,y:0},damage,money,attackSpeed,attackType,attackRange){
        this.position = position;
        this.damage=damage;
        this.money=money;
        this.attackSpeed=attackSpeed;
        this.attackType=attackType;
        this.attackRange=attackRange;
    }

    towerBuilding(){//타워 설치


    }

    
    rangeSetting(){//공격범위설정


    }

    detection(){//몬스터탐지

    }

    target(){ //우선 타겟지정


    }


    attack(){//몬스터공격

    }







}