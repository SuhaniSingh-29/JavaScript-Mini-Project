//check for 1. O and X display
//          2. winner announce
//          3. reset game
//          4. new game
//          5. game draw announce

//Fetching all the elements
let buttons = document.querySelectorAll(".box"); 
let msg = document.querySelector("#msg");  
let msgContainer = document.querySelector(".msg-container");  
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let turnX = true;   //setting a boolean value for this variable
let winPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];     //adding all the winner cases in a 2-D array
let count = 0; //To Track Draw

const checkWinner = () => {
    for (pattern of winPatterns) {
        let index0 = buttons[pattern[0]].innerText;
        let index1 = buttons[pattern[1]].innerText;
        let index2 = buttons[pattern[2]].innerText;

        if(index0 != "" && index1 != "" && index2 != ""){
            if(index0 === index1 && index1 === index2){
                showWinner(index1);
                return true;
            }
        }
    } 
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");                //makes hide part visible
    disableButtons();
};

const disableButtons = () => {
    for(let button of buttons) {
        button.disabled = true;
    }
};

const enableButtons = () => {
    for(let button of buttons) {
        button.disabled = false;
        button.innerText = "";
    }
};

const resetGame = () => {
    turnX = true;
    count = 0;
    enableButtons();
    msgContainer.classList.add("hide");
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(turnX === true){
            button.innerText = "X";
            turnX = false;
        } else {
            button.innerText = "O";
            turnX = true;
        }
        
        button.disabled = true;
        count++; 

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);