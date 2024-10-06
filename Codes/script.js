let boxes = document.querySelectorAll(".bdr");
let reset = document.querySelector("#reset");
let newGame = document.querySelector(".new-btn");
let winMessage = document.querySelector(".win");
let messageContainer = document.querySelector(".nw");
let countx = document.querySelector(".countx");
let counto = document.querySelector(".counto");
let x = 0, o = 0;

let turn0 = true, winning = false; //player -0-X

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let resetandnewGame = () => {
    turn0 = true;
    messageContainer.classList.add("hide");
    enableBox();
};

let enableBox = () => {
    for (let i of boxes) {
        i.disabled = false;
        i.innerText = "";
    }
};

let disableBox = () => {
    for (let i of boxes) {
        i.disabled = true;
    }
};

boxes.forEach((i) => {
    i.addEventListener("click", () => {

        if (turn0) {
            i.innerText = "O";
            turn0 = false;
            i.classList.add("bl");
            i.classList.add("rd");
        }
        else {
            i.innerText = "X";
            turn0 = true;
            i.classList.add("rd");
            i.classList.remove("bl");
        }
        i.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let i of winPatterns) {
        let pos1 = boxes[i[0]].innerText;
        let pos2 = boxes[i[1]].innerText;
        let pos3 = boxes[i[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winning = true;

                if (pos1 === "X") {
                    winMessage.classList.add("rd");
                    winMessage.classList.remove("bl");
                    winMessage.classList.remove("draw");
                    ++x;
                    countx.innerText = `X = ${x}`;
                }
                else {
                    winMessage.classList.add("bl");
                    winMessage.classList.remove("rd");
                    winMessage.classList.remove("draw");
                    ++o;
                    counto.innerText = `O = ${o}`;
                }
                showWinner(pos1);
            }
        }
    }
    if (!winning) {
        const alFilled = [...boxes].every(box => box.innerText !== "");
        if (alFilled) {
            drawGame();
        }
    }
};

const showWinner = (winner) => {
    messageContainer.classList.remove("hide");
    winMessage.innerText = `Winner is ${winner}`;
    disableBox();
};

const drawGame = () => {
    messageContainer.classList.remove("hide");
    winMessage.classList.add("draw");
    winMessage.classList.remove("bl");
    winMessage.classList.remove("rd");
    winMessage.innerText = `Draw!`;
};

reset.addEventListener("click", resetandnewGame);
newGame.addEventListener("click", resetandnewGame);