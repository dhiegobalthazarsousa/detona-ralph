const state = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60,
    },
    sounds: {
        success: "./src/audios/success.mp3",
        failed: "./src/audios/fail.mp3",
    },
    actions: {
        timerId: setInterval(randomEnemy, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        alert(`Acabou o Tempo!
        Sua pontuação foi ${state.values.result}
        `)
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
    }
}

function clearEnemy(){
    state.views.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
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
                playSuccess();
            } else {
                if(state.values.hitPosition !== null){
                    if(state.values.result > 0){
                        state.values.result--;
                    }
                    state.views.score.textContent = state.values.result;
                    playFailed();
                }
            }
        })
    });
}

function playSuccess(){
    const audio = new Audio(state.sounds.success);
    audio.play();
}

function playFailed(){
    const audio = new Audio(state.sounds.failed);
    audio.play();
}


function init(){
    addListenerHitBox();
}

init();