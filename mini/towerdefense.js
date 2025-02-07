/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "lightgreen";
ctx.fillRect(0,0,500,500);


class ClassExam { // class 키워드로 ClassExam 클래스 생성
  constructor(name) { // 생성자(매개변수)
    this.name = name; // 생성된 인스턴스에 매개변수 연결
  }
  
  attack(){  
  }

}

let tower = ClassExam("knife"); // 인스턴스 생성
tower.attack(); // 인스턴스 함수 호출