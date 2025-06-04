
const mediumBtn = document.getElementById("medium-btn")
const mediumGrid = document.getElementById("med-container")
const resetSelectionBtn = document.getElementById("reset-selection-btn")
const green = document.getElementsByClassName("green")
let medGrid = []
let gridRow = 5
let gridCol = 5
const ship = document.getElementById("destroyer")
let shipSelect = false
let shipPlacement = []
let numberOfHits = 0
const winningScore = 2
const invalidPlacement = document.getElementById("invalid-placement")
const turnIndicator = document.getElementById("turn-indicator")
let computerPicks = []


class Ship {
    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.position = []
        this.hits = 0;
        this.hitTiles = []
        this.isSunk = false;
        this.isVertical = true;
    }

    hit(arr) {
        this.hits++;
        this.hitTiles.push(arr)
        if (this.hits >= this.size) {
            this.isSunk = true
        }
    }

    placement(row, col) {
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isVertical) {
                this.position.push([row++, col])
            } else {
                this.position.push([row, col++])
            }

            //Check if ship is on the board
            if (this.position[i][1] >= gridCol ||
                this.position[i][0] >= gridRow
            ) {
                //if not remove the ship
                this.position = []
                removeShip()
                invalidPlacement.innerText = "Please place your ship in a valid location"
            } else {
                //if it is on the board, add to dom
                document.getElementById(`tile-${this.position[i][0]}-${this.position[i][1]}`).classList.add("green")
                invalidPlacement.innerText = ""
            }
        }
    }

    computerPlacement(row, col) {
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isVertical) {
                this.position.push([row++, col])
            } else {
                this.position.push([row, col++])
            }

            //Check if ship is on the board
            if (this.position[i][1] >= gridCol ||
                this.position[i][0] >= gridRow
            ) {
                //if not remove the ship
                this.position = []
                this.computerPlacement(randomNumber(), randomNumber())
            }
        }
    }
}

const destroyerShip = new Ship("destroyer", 2)
console.log(ship.id === destroyerShip.name)

const fire = tile => {
    if (tile[0][0] === tile) {}
}






//random number generators
const randomNumber = () => Math.floor(Math.random() * 5)
const randomNumberLimit = val => Math.floor(Math.random() * val)
const removeShip = () => {
    while (green.length > 0) {
        green[0].classList.remove("green")
        shipPlacement = []
    }
}


//Tells computer to place the ship and add DOM visualisation



ship.addEventListener("click", () => {
    shipSelect ? shipSelect = false : shipSelect = true
    if (shipSelect) {
        ship.style.border = ".5rem solid orange"
        
    } else {
        ship.style.border = ".5rem solid #ffffff00"
    }
})

//Generate all tiles for player board
const generateTiles = () => {
    // debugger
    for (let i = 0; i <= 4; i++) {
        medGrid[i] = []
        for (let j = 0; j <= 4; j++) {
            medGrid[i][j] = j
            const tile = document.createElement("div")
            mediumGrid.appendChild(tile)
            tile.id = `tile-${i}-${j}`
            tile.classList.add("med-tiles")
            
            //event listener for logging the ship placement on board
            tile.addEventListener("click", () => {
                console.log(destroyerShip.position.length)
                if (destroyerShip.position.length === 0) { 
                    destroyerShip.placement(i, j)
                } else {
                    destroyerShip.position = []
                    removeShip()
                    destroyerShip.placement(i, j)
                }
            })
        }
    }
    mediumGrid.style.display = "grid"
}

//hard reset for the ship placement
resetSelectionBtn.addEventListener("click", () => {
    removeShip()
    ship.style.border = ".5rem solid #ffffff00"
})


//Computer grid generation
let computerGrid = []
const startGameBtn = document.getElementById("start-game")

const startGame = () => {
    //generate grid container
    const computerGridContainer = document.getElementById("computer-container")
    computerGridContainer.classList.add("computer-board-transition")
    mediumGrid.classList.add("player-board-transition")
    ship.style.display = "none"
    startGameBtn.style.display = "none"
    resetSelectionBtn.style.display = "none"
    
    for (i = 0; i <= 4; i++) {
        computerGrid[i] = []
        for (j = 0; j <= 4; j++) {
            computerGrid[i][j] = j
            const computertile = document.createElement("div")
            computerGridContainer.appendChild(computertile)
            computertile.id = `tile-${i}-${j}`
            computertile.classList.add("med-tiles")
            let hasBeenClicked = false
            
            //Selecting enemy tiles
            computertile.addEventListener("click", () => {
                if(hasBeenClicked) {
                    return
                } else {
                    if (`tile-${enemyDestroyer.position[0][0]}-${enemyDestroyer.position[0][1]}` === computertile.id ||
                        `tile-${enemyDestroyer.position[1][0]}-${enemyDestroyer.position[1][1]}` === computertile.id
                    ) {
                        computertile.style.backgroundColor = "red"
                        hasBeenClicked = true
                        enemyDestroyer.hit()
                    } else {
                        computertile.style.backgroundColor = "grey"
                        hasBeenClicked = true
                    }
                    didPlayerWin()
                    computersTurn()
                }
            })
        }
    }

    //Computer ship placement
    const enemyDestroyer = new Ship("Enemy Destroyer", 2)
    enemyDestroyer.isVertical = Math.floor(Math.random() * 2) === 0 ? true : false
    // let randomNumberB = randomNumberLimit(gridCol - 1)
    enemyDestroyer.computerPlacement(randomNumber(), randomNumber())
    // if (isHorizontal) {
    //     computerSelection = [[computerGrid[randomNumberA][randomNumberA], computerGrid[randomNumberB][randomNumberB]], [computerGrid[randomNumberA][randomNumberA], computerGrid[randomNumberB][randomNumberB + 1]]]
    // } else {
    //     computerSelection = [[computerGrid[randomNumberB][randomNumberB], computerGrid[randomNumberA][randomNumberA]], [computerGrid[randomNumberB][randomNumberB + 1], computerGrid[randomNumberA][randomNumberA]]]
    // }



console.log(enemyDestroyer.position)
}

//did the player win?
const didPlayerWin = () => {
    if (numberOfHits === winningScore) {
        turnIndicator.innerText = "You Win"
    }
}


//computer decides what coordinate to fire on
let lastKnownHit = []
let computersCurrentChoice = []

const computersTurn = () => {
    computersCurrentChoice = [randomNumber(), randomNumber()]
    console.log(computersCurrentChoice)
    
    
    //now it needs to know if the tile matches a tile that the player chose
    //if not then we flip the turn over to the player
    //if so we run the next function so the computer selects one of four adjacent tiles that havent already been picked
    if (matches(computersCurrentChoice)) {
        computersTurn()
    } else {
        setTimeout(() => {
            if (destroyerShip.hitTiles.length === 0) {
                computerPicks.push(computersCurrentChoice)
                console.log(computerPicks)
                
                isThisAHit(computersCurrentChoice, destroyerShip.position)
            } else {
                isThisAHit(selectAdjacentTile(destroyerShip.hitTiles), destroyerShip.position)
            }
        }, 1000)
        // console.log(lastKnownHit)
    }
}

//determines if the tile has already been chosen or not
const matches = match => {
    let bool = false
    computerPicks.forEach(arr => {
        if (match[0] == arr[0] &&
        match[1] == arr[1]) {
            bool = true
        } else {
            bool 
        }
    })
    return bool
}

//determines if the tile matches the ship no matter the size
const compare2Ship = (shipCoords, arr) => {
    shipCoords.forEach(arr => {
        if (shipCoo) {}
    })
}


const selectAdjacentTile = hit => {
    // debugger
    let nextTile = []
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            nextTile.push(hit[0][0] + 1)
            nextTile.push(hit[0][1])
            break;
        case 1:
            nextTile.push(hit[0][0] -1)
            nextTile.push(hit[0][1])
            break;
        case 2: 
            nextTile.push(hit[0][0])
            nextTile.push(hit[0][1] + 1)
            break;
        case 3:
            nextTile.push(hit[0][0])
            nextTile.push(hit[0][1] - 1)
            break;
        default:
            selectAdjacentTile()
    }

    if (5 >= nextTile[0] >= -1 ||
        5 >= nextTile[1] >= -1) {
        if (matches(nextTile)) {
            computersTurn()
        } else {
            return nextTile
        }
    } else {
        selectAdjacentTile(hit)
    }
}


const match2Ship = (arr1, arr2) => {
    if(arr1.forEach(arr => {
        JSON.stringify(arr) === JSON.stringify(arr2)
    })) {}
    let x = 0
    let bool = false

    for(let i = 0; i <= arr1.length; i++) {
        for (let j = 0; j <= arr1[i]; j++) {
            x = arr1[i][j]
            if (x === arr2[0][0] && x)
        }
    }
}
    
console.log(match2Ship([[1, 1], [1, 2]], [[1, 1]]))
console.log(JSON.stringify([[1, 1]]))
[[1, 1], [1, 2]].forEach((arr) => console.log(arr))




const isThisAHit = (arr1, arr2) => {
    // debugger
    console.log(arr1, arr2)
    if (JSON.stringify(arr1) === JSON.stringify(arr2[0]) ||
        JSON.stringify(arr1) === JSON.stringify(arr2[1])) {
        destroyerShip.hit(arr1)
        document.getElementById(`tile-${arr2[0]}-${arr2[1]}`).classList.remove("green")
        document.getElementById(`tile-${arr2[0]}-${arr2[1]}`).classList.add("red")
    } else {
        document.getElementById(`tile-${arr1[0]}-${arr1[1]}`).classList.add("grey")
    }
}

const turnSwitch = () => {
    let playersTurn = true
    if (!playersTurn) {
        playersTurn = true
        turnIndicator.innerText = "Computer's Turn"
        computersTurn()
    } else {
        turnIndicator.innerText = "Player's Turn"
        playersTurn = false
    }
}

startGameBtn.addEventListener("click", startGame)

generateTiles()
