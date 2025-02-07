// import * as Tile from "./tile.js";
// import * as Tower from "./tower.js";

export class GameEvent {
  constructor(){}

  addTower(e, towerArr){
    let tower = new Tower(e.target.damage);
    towerArr.push(tower);
  }

  searchEnemy(tower) {
    
  }


  
}


export let towers = [];
