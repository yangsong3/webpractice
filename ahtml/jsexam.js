function over(obj) {
  obj.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0F8faGMAkSWJZFqmw_6oLGx15LFYItdTFjw&s";
}

function out(obj) {
  obj.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkMGuo7-0rTyJQggb9GbX5Hxj5hpx_avd80A&s";
}

// document.write("<h3>aaaaaaaaaa</h3>");
// console.log("script 실행");
// let ret = prompt("이름", "박");
// if (ret == null) {
//   console.log("null case");
// } else if (ret == "") {
//   console.log("문자열 입력 없이 확인 누른 경우");
// } else {
//   console.log(ret);
// }

// alert("123");
// let a = confirm("yes or no");
// if (a == true) {
//   console.log("return true");
// } else {
//   console.log("return false");
// }

// let x; // 전역변수 x
// function f(){
//     let y; // 함수 내 지역변수 y
//     x=10; // 전역변수 x
//     y=20; // 지역변수 y
//     z=30; // 전역변수 z
//     if(y==20){ // 지역변수 y
//         let b=40; // 블록변수 b
//         b++
//     }
// }
// f();
// console.log(x);
// console.log(z);

// var x = 10; // 전역변수 x
// function xx(){
//     var x; // 지역변수 x
//     x=1; // 지역변수 값 할당
//     this.x=100; // 전역변수 x에 값 할당
//     console.log(x);
// }
// xx();

// var glv = 150;
// console.log(this.glv);
// // console.log(this.location);

// const MAX = 10;

// //Array
// let arr = new Array();
// arr = [1, 2, 3, 4, 5, 6];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }
// //Date
// let d = new Date(2024,11,1);
// console.log(d);
// let now = new Date();
// let date = now.getDate();
// let hour = now.getHours();
// console.log(date,hour)

// function jsexam1() {
//   let now = new Date();
//   if (now.getSeconds() % 2 == 0) {
//     document.getElementById("jsexam1").style.backgroundColor = "orange";
//   } else {
//     document.getElementById("jsexam1").style.backgroundColor = "lightblue";
//   }
// }
// let nows = new Date();
// console.log('현재 초 : '+nows.getSeconds()+' sec');
// jsexam1();

// function jsexam2() {
// 	let rn1 = Math.floor(Math.random()*100);
// 	let rn2 = Math.floor(Math.random()*100);
// 	let ans = prompt(rn1+"+"+rn2+"= ?");
// 	let a = eval(ans);
// 	if (a == (rn1+rn2)) {
// 		console.log("correct");
// 	} else {
// 		console.log("산수도 못하네 바보 ㅋㅋ");
// 	}
// }
// jsexam2();

let p = document.getElementById("firstp"); // DOM 객체화
// console.log(p);
p.style.color = "green"; // DOM 객체화 된 p 요소에 대해 속성을 통한 컬러 변경
p.style.cssText = "background-color:white;color:green";

let s = document.getElementById("pspan");
s.style.backgroundColor = "lightgreen";

let style = window.getComputedStyle(s);
let value = style.getPropertyValue("color");
// console.log(value);

let p2 = document.getElementById("secondp");
// console.log(p2.style.color);
// secondp 처럼 셀렉터를 통한 스타일이 부여 된 DOM객체의 경우에는
// ComputedStyle을 통해 속성 값을 조회 가능.
// 직접 접근하면 공백 출력.

let style2 = window.getComputedStyle(p2);
let value2 = style.getPropertyValue("color");
// console.log(value2);

function change() {
  let span = document.getElementById("jsexam2");
  span.style.color = "green";
  span.style.fontSize = "30px";
  span.style.width = "3em";
}

// console.log(p2.innerHTML);
function changeinner() {
  p2.innerHTML = "<img src='/Slimes/slime_hit.png'>";
}

function change1(obj, size, color) {
  obj.style.color = color;
  obj.style.fontSize = size;
}

// 추가 버튼 - onclick 연결하여 사용.
function addtodo() {
  let todotext = document.getElementById("newtodo").value;
  let newtodo = document.createElement("li");

  if (todotext != "") {
    newtodo.textContent = todotext;
    document.getElementById("todolist").appendChild(newtodo);
    console.log("추가 : " + todotext);
  } else {
    console.log("내용 없음.");
  }
}

// 추가 버튼 onclick 사용 x
let btn = document.getElementById("addtodo");

btn.addEventListener("click", () => {
  let todotext = document.getElementById("newtodo").value;
  let newtodo = document.createElement("li");

  if (todotext != "") {
    newtodo.textContent = todotext;
    document.getElementById("todolist").appendChild(newtodo);
    console.log("추가 : " + todotext);
  } else {
    console.log("내용 없음.");
  }
});

// 클릭한 요소 삭제
let todolist = document.getElementById("todolist");

todolist.addEventListener("click", (event) => {
  // 매개변수로 마우스 이벤트(포인터 이벤트 객체를 전달받음)
  if (event.target.tagName === "LI") {
    // 태그명 대문자로 입력해야 작동함.
    todolist.removeChild(event.target); // 해당 이벤트가 발생한 타겟을 ul에서 제거한다.
  }
});

//주사위 뽑기 예제
//주사위는 처음에 1개가 주어진다.
//주사위 숫자는 랜덤이다. 코어객체 math의 random 사용. 범위 1~6
//주사위 그림은 이미지를 사용한다.
//주사위 추가 버튼이 있다.
//주사위가 바로 이전 주사위와 다음 주사위의 숫자가 같은 숫자가 나오면 끝나는 게임.
//몇개를 추가 했는지를 p에 다가 추가 주사위 뽑은 수 출력
//같은 숫자 주사위가 연속으로 나오면 alert을 통해 게임 종료라는 멘트를 출력한다.
//주사위 추가 가능 횟수 : 5번

// let addbtn = document.getElementById("adddice");
// let dicebox = document.getElementById("dice_box");
// let count = 0;
// let prev = 0;
// let viewcount = document.getElementById("result");
// let run = true;

// let diceimg = {
//   1:'data:image/jpeg;base64,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',
//   2:'data:image/png;base64,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',
//   3:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8BAQEAAAD4+Pj39/fT09P7+/sREREHBwf09PTx8fEYGBglJSXo6OgtLS3h4eEWFhYzMzOVlZU9PT16enrS0tJ0dHQgICDCwsKysrI4ODheXl4bGxufn59WVlZ/f39oaGi5ubmQkJCGhoZDQ0OlpaWZmZlz03kbAAANbUlEQVR4nO1di3bjKBJVgGCj+O2knYeTdPdm8/+fuFSBLFkCVCDZSnu5Z84czzjS1YXiJXOposjIyMiYDkpNSs/FpRnkcnlpiiAuTi95eWGGMETJL8zAuZQXpgjSS35helUomdQQBBfwz0B6ru+TJFEIpen7q18qJdOqUEihpH64Yb0U3COJX9MLqRX20cPtdRUmUAh4Ll34Ii0ALJLpsVg476fnGroY4+tBnAp+iEQOtSAS6PWFp09Bel3R+lFlGV2IAhmk/ZwaqBLKNp2++uyn1+qVSOpnhA5PqXT147OltkXNDPQqerDAANLdnJLmYbz08GQqJcgMAz5k/d/RQPqU8sW+Fy8Tlt5TRroQ9O1FfPnrHrSK0IJbzuibQAzofk4Q+nsnveyl1w1QN/KkOSEOL/amAghFwoCmdIyldaOo0NJzDAV3CHGM4hQGM1W2d9XFpD/GVyH0D9wfX+FrG3XIYTh33QTauP5Dla7QtAFsEgmtUAcnDGbxIWpIC9sDGHrnTRT0Dip1ymVCW1+ulExqhAKiW6QEN15d0QuoIF9XJaChp864TyWjvEXYdwekT1xTnPoOLCGnBj1lLZJDFG5qOWSaQIGzLZXSARPpS8n1SD9kVcB5NRwlhAFEtyhSQ9TQoy7uFahnosXAVaeZDfKUGlQKu7hiyAOYEuaeNggxInnCQH/OATdP6exhRalHtIGvFVCiZxyELwe0gRMg0lN6KgmXlYP5dR15yxeG2jHeW8ACOOWyshDloBCt6P2DqS785F50BPCSD4+gXo4LE/TRX1pgRkZGRkZGRkZGRkZGRkZGRkZGRkZGRg/ud2+LOQ2Lu+rTgXbBbPG2u59Y38uCkXFsfN7QL1u8TKhvvddPcEcCY4fGn2qJc/KFbL+eSuAzVV5bYJRE0Pg8mUD6Qx5bghh7IEu8m0ji2tYLvUUlAQTO5myKQIU2eIBneHx5ur8QXh6BYDbTbfH6Al+YaV2fl6WRnyBQU12/R11g/LA/Fyd6MZG6uDhRC/eG98I1iPg0ZXntoX9naK9BJU1h7q7B1cAbsj5ehesRud6uwlXDNMPrNP+XSRriDFmfAn8x3u6cJzMojnY/GnBCEmr9YjmaxPsUhcuh9sleheV4/sEUhWo51F3Wo1COuYcrQWFogyTRidCjkEuetIXPuTk0XiGXwlvECp0SqldmWCGXPM3HK2D/pmjtVI5XCM4tTzsESxdud+97vr46LJL2UqJhhrfpYxUq2ALqF1h96HnAgMLln+/Pv7unhDo87XDlZ/SRCrnE3cDORtLYSN4n0atw/ca2bPO6Ya+72IbY0HVWi3EKeaF4AQ5Gx3eoqtpl2xOoPoXf7OGw2L9utiu9tIpbtiK9VJX1rA6zKIVCKXAlOZshhih8YR18wVr0KHxk2+3XZrGfw+qcBec8TnoIImX9i6cSjlGoLxbKUz28Np/ZYoxX+M1WW7b/WixWZj3A6MN+gD5CIUfvlnJXjnUrFPW/oxWu2XHGXg/zr+olE/ugPBZC1PSVA636iq4Qd6ujC9X5bW3i5RDNYVuBU+Hbavs1Y1CPlUL6SzLs5SqFUjXrgaxQSRjpubd5gUQjHq284c7UpXA5X7H9hi229VtG9rv/uSp6UQfPubuPqlDgTEZ6u0hzTgP0NMJv4DvBpfAPY8dXtpo1X25vep/rRA+E6GFsly9RIVfg+wl4pG3cC8Up/kGXwt12tnhdbZvviel9jR2i9WN2AoioUBgXuH+Qk5W/W1AcoC6FjzpGX7ett/fUMfFE37XX0aNU119oFK8CWFD8gx2FZck/2cN+dv6mn66wMvc56CkKeQnON1mG54p2kJUU/2BbIXR9793fWxijW3FkZSBsly9BoQ4ASbFPmrmOv7dtoKWwBF/YE5u3f6th2/5b1fRmSO7Q9yvkeEYCxR4K61aaj7OtEGZbYtv5MYr9JdyrflA4UKEbQP0KIYKk6l/VFtAWiR6ylkI9FdQidx2BEUFq6F2zYUId6iosg51Mg4O4rGsp1O1Ah5hctIP0m3a3Br0jgAgKwbw48uFg7Z5GKAjUdasnHec9NaWnKUkhGoPOaGGaz1Pjd2E21ot4ymgx6FAjJ3wr4OVH/fNtbIj6kPRGeDD872mefz+AvO3f0UypP02hxnK9HtNz+wMVjoys8DLICsfE/4NCNpHC6P0Ry/eP1WL18R750+I9m7FJFLKHOIXq12ku8CvqB9p73BV1fYXwbjRG4X09oWNxtX+PG7+ur1ALjHnOe9ZY/sdJvIcYnV9d4QbaBv0xFWMPs3pS/hCzcoS+lM2PKY85AEfcTkdX+EuXx7GSCHtL2S/ytWa0OKQ85gAc40aLJXb4RqLZPBvxq80/MR6+M1N3ENp2dzB7p178Tyj8MPGJ3ZN940j/XeqfULiqWuBxVr1SZSvqxf+EwuoVFWOLU3dD3or3Tyi0dQghWg0aN1aHph1iG6wGjRtrh7YvxTZYDRq31Zea8dCaSOygcVvjYQHripNLBiRGz2l+ukJ1ZgNix7vIeen1FR5i1/iNxdNd5OLZKLz2zHuziZt5D1sfwtri2jPv+ewhavWkUTbW+FEvjHF9OLt+O5wdr/eeZpo1Pki81ru2ad7T6MiJ2nuYjsnetV3NbTXd+9L8znss3IrCcr329LE3obD8u4VxcvPbtR/1FhR+1z/+f3Qr8gYUvjU3cHSHoEspDB9BP6bCN9d2Rp7oRohAOD3fiAq/2xupDi36CylU4ZRS4yksu9v9vs/pL6NQ+TeEI8ZT+Lct8I49yLPMdhdRCJs1k9ohGM/i0hltuwrZc9H0LUUoxDw1hN2VUpR9f+dRyKUKOh66cAQp7BdLq0MOeQ15T145gOhPz+dWKKjp+WqsO9uK2WK7O4sDskLc46wfodfeqXAfbTgznFNhnSGDnqikq3D1yv5zVkZUhfUj93QiHPM+9aTncylsBie5FpcthYwd9vP3Qsb3pc06CdaP0rEMCdCiPTNYb5Dzx5r7iBI37EzfYr84bl/OMqPRFKKoU3ZA6ZeoMD1fr4u3q7CdHdCX0qaN32cKV6+zr+O8jHeUoKRGdkBvTwk5bTghW0x3j3AnPR8xd9Tz2aR0xbbb7e/zIydIChvmQmtPcytUmIiV8GzdOmyk58OkVuTEPB+sEaKb+arjs6EpPEu/CPTu3HLgPSFln3REqagpuPAxOFD1NboCXzdfuh7/2/oDssLK3Sd92QHRXsqLknIaQlehPFGYgKUP+k/WUjs/sINeCP+n/T2tHZ6ydBoXnCc7ICSqpTUfR5SaZs55xz/YizWeTXj8mrF9twaJCo1tGBNKV0bGLiBPrShoyd18Cgvjx47MTCa/ze53dnh0eN0iFBa2t3PnlgMXtCyJs2ZHlNoRSHrzD4Ygn3ePj7tnp5ePGKWW3msu1L0o2tuIz+YY8e1UKa4NViixVNwZ1Wkjvk2A6A1RBenrtERq4btnbSYVaUp2QM6Vl544a5PVkOg246ORW9B/9PLMvFVaSm5cjHpXpOSZNw8kJ4TsvSomg6R79SQx7zz5JvV1igeuJK+epPQdp4Dp+YjWSgvfCth/tk/w0cDk6i0a+goYasn3HS/drdyHkd95W5O6GyO9p+Fx6drH/t1CBOineed9+2fu3f65ifbsy2sk9pzo7MvbP7+0OoP28i3xz0Rn0JrDb9ns4rX4yRZ45NQEJ7PvcacS6Szo5LOizVnQcOL0BGdBw6tcc0rzZXFnznOf5OD556aTKYT2kfPV/54/0A51Zz//2Hl255DI5hvq5VMJjMiNwObHzs8TxBpkU+ZGKGLyWxzb/4Oa4mLS/BYAyFEyo2B1/p+ki35AjpKMjIyMjIyMjIyMjIyMjIyMjIyMjIyMibEc85hfH8fo509HoLwCu1qOmD0vmjxlc90P5PBCwGZu77cJm0PdHGnJ85IS0rUghTMBQUWAe9kH52cEjpRKBEuZCFUAAUqW3Jc6DxNFmN32gyTyIEfwQoUCw765MMBXKLx2ljo7YNRWTBdH3GZOg5PjLODL6gOmKhG+faYN5QNqUWB6vsBeVh8aunoMhAFyXuI+WvflxgFqHTPe7cR94LBdW6n4WsAarNogwenqAhi0VeHbkK9sdkAZ565rQViO6PKx2+ALaz3s8bC6Ae7XgpeejlK00/P1eCx9HGADVvGNEEOU4K4LQSjoqbw9AIZu0z+YMqAJ7AuTepnaCmKCJ74dY+o86W9eolaoY0xFeRNOj4kcMWb1+tJGdkDMZxt9E4V5jgLXoWPPnZ6PCrDiBzlCQDuIpa+9hBHkumlojaX/OnnynHFSbjnHM6KxMcQRvNpYiix9fE8F43y4dKvEbmYsSamHfo4A7CEK3E4ZY2+CfbAKk5+65wT/oIVA/2LKlUVtjJYpAsuyVGayGEI1yPKkEFWapJ8jgEZywmiBkMIZ0ob1XSeq4kuoQTAuCgJHALV/MbqTwbk6ZXQzWZU9NujwlZieL3FJWEFa/2L0XWCKKBRphiLc6fkoHHq+TeMIAGyWKRNSGOdLYr1w+kEBZwAPaDl8fS6jjrapLytpaSkRAZPcaByh+8TP1Qz90PAhcAwO0WH0VyAf/GonIyPjdvE/7+Jxga7OXz4AAAAASUVORK5CYII=',
//   4:'data:image/png;base64,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',
//   5:'data:image/png;base64,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',
//   6:'data:image/png;base64,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'
// }

// prev = Math.floor(Math.random() * 6) + 1;
// let fdice = document.createElement("li");
// let fdice_img = document.createElement("img");
// fdice_img.src = diceimg[prev];
// fdice.appendChild(fdice_img);
// dicebox.appendChild(fdice);

// addbtn.addEventListener("click", () => {
//   if (count < 5 && run) {
//     let dice = document.createElement("li");
//     let rn = Math.floor(Math.random() * 6) + 1;
//     count++;
//     viewcount.innerText = count;
//     let dicei = document.createElement("img");
//     dicei.src = diceimg[rn];
//     dice.appendChild(dicei);
//     dicebox.appendChild(dice);

//     console.log(dicebox);
//     console.log(dicebox.lastChild);
//     if (prev == rn) {
//       alert("end");
//       run = false;
//       return;
//     }
//     prev = rn;
//   } else {
//     alert("end");
//     run = false;
//     return;
//   }
// });

// let box = document.getElementById("eventprac");

// document.body.addEventListener("keydown", (event) => {
//   box.innerText += event.key;
//   console.log(event.key);
// });

// function cap(){
//   console.log(1);
// }
// function bub() {
//   console.log(2);
// }

// let bt1 = document.getElementById("bt1");
// bt1.addEventListener("click", cap, true);
// bt1.addEventListener("click", bub, false);

// let tds;
// let prevIndex=0;
// let index=0;

// window.onload = function() {
//   tds = document.getElementsByTagName("td");
//   tds[index].style.backgroundColor = "orchid";
// }

// window.onkeydown = function(e) {
//   switch(e.key) {
//     case "ArrowDown":
//       if(index/3>=2) return;
//       index +=3;
//       break;
//     case "ArrowUp":
//       if(index/3<1) return;
//       index -=3;
//       break;
//     case "ArrowLeft":
//       if(index%3==0) return;
//       index --;
//       break;
//     case "ArrowRight":
//     if(index%3==2) return;
//     index ++;
//     break;
//   }
//   tds[index].style.backgroundColor='orchid';
//   tds[prevIndex].style.backgroundColor = 'white';
//   prevIndex=index;
// }

// let newWin = null;
// function load(URL) {
//   newWin = window.open(URL, "_blank", "left=300,top=300,width=300,height=300");
// }

// function closeNewWindow() {
//   if (newWin==null||newWin.closed) {
//     return;
//   } else {
//     newWin.close();
//   }
// }

// // on버튼 클릭시 2초마다 배경 r g b 순으로 바뀜 , off버튼 클릭시 작동멈춤.
// const colors = [
//   "red", "blue", "green"
// ];

// let index = 0;

// let btn1 = document.getElementById("btn1");
// let btn2 = document.getElementById("btn2");
// let interp = document.getElementById("inp");

// function changecolor(){
//   interp.style.backgroundColor=colors[index];
//   index++;
//   if (index>=colors.length) {
//     index = 0;
//   }
// }

// btn1.onclick= () => {
//   interval = setInterval('changecolor()',1000);
// }

// btn2.onclick= () => {
//   clearInterval(interval);
// }

// html div #exam9
// let span = document.getElementById("exam9span1");
// let interITV = setInterval("dort()", 200);
// span.onclick = function (e) {
//   clearInterval(interITV);
// };

// function dort() {
//   let str = span.innerHTML;
//   let firstChar = str.substr(0, 1);
//   let remains = str.substr(1, str.length - 1);
//   str = remains + firstChar;
//   span.innerHTML = str;
// }

console.log("script 실행 완료");
