/** @type {HTMLCanvasElement} */
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

ctx1.beginPath();
ctx1.strokeStyle='blue';
ctx1.rect(60,60,50,50);
ctx1.stroke();

