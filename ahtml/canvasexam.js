/** @type {HTMLCanvasElement} */
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

ctx1.beginPath();
ctx1.rect(30, 30, 50, 50);
ctx1.stroke();
ctx1.strokeStyle = "black";
ctx1.lineWidth = 10;
ctx1.stroke();
ctx1.closePath();
ctx1.moveTo(100, 100);
ctx1.lineTo(100, 200);
ctx1.stroke();

//rect(x,y,width,height)
/** @type {HTMLCanvasElement} */
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

ctx2.beginPath();
ctx2.fillStyle = "violet";
ctx2.rect(60, 60, 50, 50);
ctx2.fill();
ctx2.font = "20px Gothic";
ctx2.fillStyle = "green";
ctx2.fillText("text123123", 100, 50);

// line
/** @type {HTMLCanvasElement} */
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

ctx3.beginPath();
ctx3.moveTo(120, 20);
ctx3.lineTo(20, 50);
ctx3.lineTo(150, 120);
ctx3.lineTo(120, 20);
ctx3.stroke();

//arc(x,y,radius,startAngle,endAngle,anticlockwise)
// x,y 원의 중심
// startAngle : 시작 각도 3시가 기준점 (시계방향)
// endAngle : 종료 각도
// anticlockwise : 시계방향 : true , 반시계방향 : false 로 설정
// 각도법에서는 360도로 표현 -> 호도법으로 표현하면 라디안 단위로 표현 360도 = 2파이
// 1도 = 파이 / 180

/** @type {HTMLCanvasElement} */
const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");

ctx4.beginPath();
ctx4.arc(100, 100, 50, 0, Math.PI * 2);
ctx4.stroke();
ctx4.beginPath();
ctx4.arc(70, 70, 50, 0, Math.PI * 2);
ctx4.stroke();

/** @type {HTMLCanvasElement} */
const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas5.getContext("2d");

let img = new Image();
img.onload = function () {
  ctx5.drawImage(img, 0, 0);
};
img.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPk5cH7hq-mEP-9O_6EDj48gkvJXAnfDPZ7w&s";

/** @type {HTMLCanvasElement} */
const canvas6 = document.getElementById("canvas6");
const ctx6 = canvas6.getContext("2d");
let colors = document.getElementById("colors");
let size = document.getElementById("size");
let sizep = document.getElementById("sizedisplay");

let isDrawing = false;
sizep.innerText = size.value;

function startDraw(e) {
  isDrawing = true;
  ctx6.beginPath();
  ctx6.strokeStyle = colors.value;
  ctx6.lineWidth = size.value;
  ctx6.moveTo(e.offsetX, e.offsetY);
}

function stopDraw() {
  isDrawing = false;
  ctx6.closePath();
}

function draw(e) {
  if (!isDrawing) return;
  ctx6.lineTo(e.offsetX, e.offsetY);
  ctx6.stroke();
}

canvas6.addEventListener("mousedown", startDraw);
canvas6.addEventListener("mousemove", draw);
canvas6.addEventListener("mouseup", stopDraw);
size.addEventListener("mouseup", () => {
  if (size.value == 0) {
    size.value = 1;
  }
  sizep.innerText = size.value; // 사이즈 바 옆 숫자 갱신
});
