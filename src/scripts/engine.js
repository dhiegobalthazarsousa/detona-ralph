const state = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: null,
        result: 0
    }
};

function clearEnemy(){
    state.views.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
}

function moveEnemy(){
    state.values.timerId = setInterval(randomEnemy, state.values.gameVelocity);
}

function randomEnemy(){
    clearEnemy();
    let number = Math.floor(Math.random() * 8);
    let randomSquare = state.views.squares[number];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.views.squares.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.hitPosition = null;
                state.values.result++;
                state.views.score.textContent = state.values.result;
            }
        })
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init();