
const grid = document.querySelector('.grid');
grid.style.visibility = 'hidden';
let lives = 0;
let gameActive = false;

function createGrid(size) {
    let n = 0;
    grid.style.visibility = 'visible';
    for (let i = 0; i < size; i++){
        // create row
        const newRow = document.createElement('div');
        newRow.className = 'row';
        grid.appendChild(newRow);
        
        for (let i = 0; i < size; i++) {
            // create square
            const newSquare = document.createElement('div');
            newSquare.className = 'square'
            newSquare.id = n;
            newRow.appendChild(newSquare);
            n++;
        }
    }
}

const gridInput = document.getElementById('setgrid');
gridInput.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const size = document.querySelector('#setgrid input').value;
    createGrid(size);
});
createGrid(4);
let minesLoc = [];

const squares = document.querySelectorAll('.square');

for (square of squares) {
    square.addEventListener('click', checkSquare);
    // square.addEventListener('click', function() {console.log(this.id)});
}


function initGame() {
    gameActive = true;
    minesLoc = [];
    for (square of squares) {
        square.textContent = '';
        // allow to be rotated again
        square.classList.remove('rotate');
    }
    while (minesLoc.length < Math.floor(squares.length / 3)) {
        const newLoc = Math.floor(Math.random() * squares.length);
        if (!minesLoc.includes(newLoc)) {
            // squares[newLoc].textContent = 'yellow';
            minesLoc.push(newLoc);
        }
    }
    lives = 5;
    document.querySelector('.header-text').textContent = `Lives: ${lives}`;
    
}

initGame();
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', initGame);

const revealButton = document.querySelector('.reveal-button');
revealButton.addEventListener('click', revealAll);

function revealAll() {
    gameActive = false;
    for (square of squares) {
        square.classList.add('rotate');
        if (minesLoc.includes(Number(square.id))) {
            square.textContent = 'FUCK';
            square.style.color = '#d20621';
        }
        else {
            square.textContent = 'YAY!';
            square.style.color = '#0ad476';
        }
    }
}


function checkSquare() {
    
    if (gameActive){
        if (!this.classList.contains('disabled')){
            this.classList.add('rotate');
            // setTimeout(function() {
            //     this.classList.remove('rotate');
            // }.bind(this), 1000);
            if (minesLoc.includes(Number(this.id))) {
                this.textContent = 'FUCK';
                this.style.color = '#d20621';
                lives--;
                if (lives === 0) {
                    document.querySelector('.header-text').textContent = 'You lose!';
                    gameActive = false;
                }
                else {
                    document.querySelector('.header-text').textContent = `Lives: ${lives}`;
                }
            }
            else {
                this.textContent = 'YAY!';
                this.style.color = '#0ad476';
            }
            this.classList.add('disabled');
        }
    }
    
}
