const cards = document.querySelectorAll('.card');
const buttom = document.querySelector('#btnRestart');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//Function to turn the card
function flipCard(){

    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this; /*receives the clicked element*/
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();

}

//Function that checks if the cards are the same
function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

//Function that does not allow the same cards to be turned over again.
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//Function that untap cards when they are not the same
function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function unflipAllCards(){
    cards.forEach((card) =>{
        card.classList.remove('flip');
    });
}

//Function that resets the board at the end of the game
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Immediately invoked function expression
//Function that shuffles the cards
(function shuffle(){
    cards.forEach((card) =>{
        let randomPosition = Math.floor(Math.random() *12);   
        card.style.order = randomPosition;   
    });
    console.log('Finish');
})();

//Restart the Game
buttom.onclick = function restartTheGame() {
    document.location.reload();
};

//Adds card click event
cards.forEach((card)=>{
    card.addEventListener('click', flipCard);
});




