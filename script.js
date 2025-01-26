const gridContainer = document.querySelector('.grid-container');
const gridCols = document.querySelectorAll('.grid-col');

let randomMode = false;
let progressiveMode = false;

const randomBtn = document.querySelector('.random-button');
const progressiveBtn = document.querySelector('.progressive-button');

function toggleRandom() {
    if (!randomMode) {
        randomMode = true;
        progressiveMode = false;
        randomBtn.classList.add('button-on');
        progressiveBtn.classList.remove('button-on');
    } else if (randomMode) {
        randomMode = false;
        randomBtn.classList.remove('button-on');
    };
};

function toggleProgressive() {
    if (!progressiveMode) {
        progressiveMode = true;
        randomMode = false;
        progressiveBtn.classList.add('button-on');
        randomBtn.classList.remove('button-on');
    } else if (progressiveMode) {
        progressiveMode = false;
        progressiveBtn.classList.remove('button-on');
    };
};

randomBtn.addEventListener('click', toggleRandom);
progressiveBtn.addEventListener('click', toggleProgressive);

function addHoverEffect() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', changeColour)
    });
};

addHoverEffect();

const clearBtn = document.querySelector(".clear-button");
clearBtn.addEventListener('click', clearGrid);

function changeColour(e) {
    if (!randomMode && !progressiveMode) {
        if (e.target.classList.contains('white')) {
            e.target.classList.remove("white");
            e.target.classList.add("black");
        } 
    } else if (randomMode) {
        e.target.classList.remove('white', 'black');
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    } else if (progressiveMode) {
        e.target.classList.remove('white');
        if (!e.target.classList.contains('black')) {
            e.target.classList.add('black');
        }
        let currentOpacity = parseFloat(e.target.style.opacity) || 0;
        currentOpacity += .1;
        e.target.style.opacity = currentOpacity;
    };
};

function clearGrid() {
    gridContainer.innerHTML = '';
    let newNum = prompt('How many squares per row?');
    if (newNum > 100) {
        newNum = prompt('Try again! Must be 100 or less.');
    };
    for (let i = 0; i < newNum; i++) {
        let rowsCodeBlock = '';
        for (j = 0; j < newNum; j++) {
            rowsCodeBlock += "<div class='grid-item white'></div>";
        }
        gridContainer.innerHTML += "<div class='grid-col'>" + rowsCodeBlock + "</div>";
    }
    randomMode = false;
    progressiveMode = false;
    addHoverEffect();
};

