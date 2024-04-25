// localStorage.setItem("players", JSON.stringify([{id: 1, name: "Hà Hảo", score: 5}]));
interface IPlayer {
    id: number;
    name: string;
    score: number;
}

class Player implements IPlayer{
    id: number;
    name: string;
    score: number;
    players: IPlayer[]
    constructor(players: IPlayer[]){
        this.players = players || [];
        this.id = 1;
        this.name = "";
        this.score = 0;
    }
    renderPlayer(): void{
        if(this.players.length === 0){
            return
        }
        // const addPlayers: HTMLButtonElement = document.querySelector(".add-player") as HTMLButtonElement;
        const body: HTMLDivElement = document.getElementById("board-body") as HTMLDivElement;
        const player: HTMLSpanElement = document.getElementById("players") as HTMLSpanElement;
        const totals: HTMLSpanElement = document.getElementById("total-points") as HTMLSpanElement;
        let text = ``;
        let scoreArr: number[] = [];
        let totalPoints = 0;
        this.players.forEach(element => {
            scoreArr.push(element.score);
            text += `
            <div class="line">
            <div class="left-side">
            <i onclick="deletePlayer(${element.id})" class="fa-solid fa-x"></i>
            <i class="fa-solid fa-crown"></i>
            <span>${element.name}</span>
            </div>
            <div class="right-side">
            <button class="minus" onclick="minus(${element.id})">-</button>
            <div id="points">${element.score}</div>
            <button class="plus" onclick="plus(${element.id})">+</button>
            </div>
            </div>
            `;
            totalPoints += element.score;
        });
        let indexs = -1
        let max = scoreArr[0]
        scoreArr.forEach((item, index) =>{
            if(max < item){
                max = item;
                indexs = index;
            }
        })
        body.innerHTML = text;
        player.innerText = this.players.length.toString();
        totals.innerText = totalPoints.toString();
    }
    createPlayer(value: string): void{
        const inputName: HTMLButtonElement = document.querySelector(".input-name") as HTMLButtonElement;
        const obj: IPlayer = {
            id: Math.floor(Math.random() * 1000000),
            name: value,
            score: 0
        }
        this.players.push(obj);
        localStorage.setItem("players", JSON.stringify(this.players));
        inputName.value = "";
        this.renderPlayer();
    }
    updatePlayer(value: number, val: number): void{
        this.players.map((item) =>{
            if(item.id === value){
                if(val === 1){
                    return item.score += 1;
                }
                if(val === -1 && item.score > 0){
                    return item.score -= 1
                }
            }
        })
        this.renderPlayer();
    }
    deletePlayer(value: number): void{
        this.players.map((item, index) => {
            if(item.id === value){
                this.players.splice(index, 1);
            }
        })
        localStorage.setItem("players", JSON.stringify(players));
        this.renderPlayer();
    };
}

function minus(value: number):void{
    players.updatePlayer(value, -1);
}

function plus(value: number): void{
    players.updatePlayer(value, 1);
}

function addPlayer(): void{
    const inputPlayer: HTMLInputElement = document.querySelector(".input-name") as HTMLInputElement;
    if(inputPlayer.value === ""){
        return
    }
    players.createPlayer(inputPlayer.value);
}
const players = new Player(JSON.parse(localStorage.getItem("players") || '[]'))
players.renderPlayer();
// console.log(players);

function deletePlayer(value: number): void{
    players.deletePlayer(value);
}