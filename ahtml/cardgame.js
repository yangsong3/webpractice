const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXDTrA5WEOXwX5KAzyjBrGCNcJ2Wu5g2eEg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTukIoZUYKAGsJPZ9rNSjzEqDniudRf7zgMfg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4X8WtQ9QtfWtjW0wKWvhoJlTrEqg-CL1Ew&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JFm05S7Qs8SKZd5RuOeh6xzkkjlKR21c5w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-0Vgjkq8SoyKZkUn3t0tgG71xX1nt-k21g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8dKERCKemkdzKVge5xRquT8yDgMctTJgbg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPCsLv-MF2c3hIddQjhFSntVhcaS79kngN_g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVzfKTxQgSL9y1xpPZ05u4MedwqYHPwRpp3g&s",
];

let index = 0;
let prevIndex;
let count = 0;

let select = [null,null];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function clear() {
  tds = document.getElementsByTagName("td");
  for (let i = 0; i < 16; i++) {
    tds[i].firstElementChild.style = "visibility:hidden";
  }
  select = [null,null];
}

window.onload = function () {
  tds = document.getElementsByTagName("td");
  shuffle(images);
  for (let i = 0; i < 8; i++) {
    let image = document.createElement("img");
    image.src = images[i];
    tds[i].appendChild(image);
  }
  shuffle(images);
  for (let i = 0; i < 8; i++) {
    let image = document.createElement("img");
    image.src = images[i];
    tds[i + 8].appendChild(image);
  }

  tds = document.getElementsByTagName("td");
	select[0] = tds[index].firstElementChild.src;
  tds[index].style = "border: 2px solid lightgreen";
  tds[index].firstElementChild.style = "visibility:visible";
  prevIndex = index;
};

window.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowDown":
      if (index / 4 >= 3) return;
      index += 4;
      break;
    case "ArrowUp":
      if (index / 4 < 1) return;
      index -= 4;
      break;
    case "ArrowLeft":
      if (index % 4 == 0) return;
      index--;
      break;
    case "ArrowRight":
      if (index % 4 == 3) return;
      index++;
      break;
    case "Enter":
			count++;
      tds[index].firstElementChild.style = "visibility: visible;";
			if (select[0] == null){
				select[0] = tds[index].firstElementChild.src;
			} else {
				select[1] = tds[index].firstElementChild.src;
			}

			if (select[0] != null && select[1] != null) {
				if (select[0] == select[1]) {
					select = [null,null];
					return;
				} else {
					setTimeout(clear, 1500);
				}
			}
      break;
    case "default":
      break;
  }
  tds[index].style = "border: 2px solid lightgreen";
  tds[prevIndex].style = "border: 1px solid black";
  prevIndex = index;
	let c = document.getElementById("count");
	c.innerText = count;
};