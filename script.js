const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let timer = 0;
let seconds = 0;
let minutes = 0;
let interval;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    //console.log('Card fliped');

    if (!hasFlippedCard && moves === 0) {
        //console.log('Starting timer');
        startTimer();
    }

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    if (document.querySelectorAll('.card.flip').length === cards.length){
        clearInterval(interval);
        //console.log('Game completed, timer stopped');
        showCongratsMessage();
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    moves++;
    document.getElementById('moves').textContent = moves;
}

function startTimer(){
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        document.getElementById('time').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        console.log(`Timer: ${minutes}:${seconds}`);
    }, 1000);
}

function showCongratsMessage(){
    const congratsMessage = document.getElementById('congrats-message');
    congratsMessage.classList.remove('hidden');
    congratsMessage.style.display = 'block';

    document.getElementById('final-moves').textContent = moves;
    document.getElementById('final-time').textContent = document.getElementById('time').textContent;

    console.log('Game completed, congratulations message displayed');//
}

document.getElementById('new-game').addEventListener('click', () => {
    resetTimer();
    startTimer();
    clearInterval(interval);
    showCongratsMessagecongratsMessage.classList.remove('hidden');
    window.location.reload();
})

function stopTimer(){
    clearInterval(interval);
}//

function resetTimer(){
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    document.getElementById('time').textContent = '0.00'; 
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('new-game').addEventListener('click',() =>
{
    resetTimer();
    startTimer()
    clearInterval(interval);
   window.location.reload();
});