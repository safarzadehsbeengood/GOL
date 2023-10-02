function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let frames = 200;
let resetButton = document.getElementById('resetButton');
let resSlider = document.getElementById('resSlider');
let resValue = document.getElementById('resValue');
let resolution = resSlider.value;
resSlider.onchange = function() {
    updateRes(this.value);
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    cols = floor(width / resolution);
    rows = floor(height / resolution);

    frameRate(frames);
    
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }

    resetButton = select('#resetButton');
    resetButton.mousePressed(resetAnimation);
}

function draw() {
    background(30);

    // Display current grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    // Calculate next generation
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    
    grid = next; // Update the grid for the next frame
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function resetAnimation() {
    // Reset the grid to a new random state
    setup();
}

function updateRes(res) {
    resolution = resSlider.value;
    resValue.innerHTML = resSlider.value;
    setup();
}