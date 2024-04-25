"use strict";
class Player {
    constructor(players) {
        this.players = players || [];
        this.id = 1;
        this.name = "";
        this.score = 0;
    }
    renderPlayer() {
        if (this.players.length === 0) {
            return;
        }
        // const addPlayers: HTMLButtonElement = document.querySelector(".add-player") as HTMLButtonElement;
        const body = document.getElementById("board-body");
        const player = document.getElementById("players");
        const totals = document.getElementById("total-points");
        let text = ``;
        let scoreArr = [];
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
        let indexs = -1;
        let max = scoreArr[0];
        scoreArr.forEach((item, index) => {
            if (max < item) {
                max = item;
                indexs = index;
            }
        });
        body.innerHTML = text;
        player.innerText = this.players.length.toString();
        totals.innerText = totalPoints.toString();
    }
    createPlayer(value) {
        const inputName = document.querySelector(".input-name");
        const obj = {
            id: Math.floor(Math.random() * 1000000),
            name: value,
            score: 0
        };
        this.players.push(obj);
        localStorage.setItem("players", JSON.stringify(this.players));
        inputName.value = "";
        this.renderPlayer();
    }
    updatePlayer(value, val) {
        this.players.map((item) => {
            if (item.id === value) {
                if (val === 1) {
                    return item.score += 1;
                }
                if (val === -1 && item.score > 0) {
                    return item.score -= 1;
                }
            }
        });
        this.renderPlayer();
    }
    deletePlayer(value) {
        this.players.map((item, index) => {
            if (item.id === value) {
                this.players.splice(index, 1);
            }
        });
        localStorage.setItem("players", JSON.stringify(players));
        this.renderPlayer();
    }
    ;
}
function minus(value) {
    players.updatePlayer(value, -1);
}
function plus(value) {
    players.updatePlayer(value, 1);
}
function addPlayer() {
    const inputPlayer = document.querySelector(".input-name");
    if (inputPlayer.value === "") {
        return;
    }
    players.createPlayer(inputPlayer.value);
}
const players = new Player(JSON.parse(localStorage.getItem("players") || '[]'));
players.renderPlayer();
// console.log(players);
function deletePlayer(value) {
    players.deletePlayer(value);
}
