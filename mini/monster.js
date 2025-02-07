export class Monster {
  constructor(x,y,hp,speed){
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.speed = speed;
  }



}

export let monsters = [];

export function createMonster(n) {
  for (let i = 0;i<n;i++){
    let monster = new Monster(-50,50,10,2);
    monsters.push(monster);
  }
}
