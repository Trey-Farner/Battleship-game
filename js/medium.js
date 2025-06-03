
const mediumBtn = document.getElementById("medium-btn")
const mediumGrid = document.getElementById("med-container")
const resetSelectionBtn = document.getElementById("reset-selection-btn")
const green = document.getElementsByClassName("green")
let medGrid = []
let row = 5
let col = 5
const ship = document.getElementById("ship")
let shipSelect = false
let shipPlacement = []
let numberOfHits = 0
let winningScore = 2
const invalidPlacement = document.getElementById("invalid-placement")
const turnIndicator = document.getElementById("turn-indicator")
let computerPicks = []


//random number generators
const randomNumber = () => Math.floor(Math.random() * 5)
const randomNumberLimit = () => Math.floor(Math.random() * 4)

//Boolean if placement of ship is off the board
const validShipPlacement = () => {
    if (shipPlacement[0].coordinates[0][0] > 4 || 
        shipPlacement[0].coordinates[0][1] > 4 ||
        shipPlacement[0].coordinates[1][0] > 4 ||
        shipPlacement[0].coordinates[1][1] > 4) {
            shipPlacement = []
            invalidPlacement.innerText = "Please place your ship in a valid location"
            return false
    } else {
        invalidPlacement.innerText = ""
        return true
    }
}

//Tells computer to place the ship and add DOM visualisation
ship.addEventListener("click", () => {
    shipSelect ? shipSelect = false : shipSelect = true
    if (shipSelect) {
        ship.style.border = ".5rem solid orange"
        while (green.length > 0) {
        green[0].classList.remove("green")
        shipPlacement = []
    }
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
                if (shipSelect) {
                    if (shipPlacement.length === 0) {
                        shipPlacement.push({
                            name: "small-ship",
                            coordinates: [[i, j], [i, (j + 1)]]
                        })
                        console.log(shipPlacement)
                    } else {
                        shipPlacement = []
                        shipPlacement.push({
                            name: "small-ship",
                            coordinates: [[i, j], [i, (j + 1)]]
                        })
                    }
                    if (!validShipPlacement()) {

                        return
                    } else {
                        console.log(shipPlacement[0])
                        document.getElementById(`tile-${shipPlacement[0].coordinates[0][0]}-${shipPlacement[0].coordinates[0][1]}`).classList.add("green")
                        document.getElementById(`tile-${shipPlacement[0].coordinates[1][0]}-${shipPlacement[0].coordinates[1][1]}`).classList.add("green")
                        shipSelect = false
                        ship.style.border = ".5rem solid #ffffff00"
                        return
                    }
                }
            })
        }
    }
    mediumGrid.style.display = "grid"
}

//hard reset for the ship placement
resetSelectionBtn.addEventListener("click", () => {
    while (green.length > 0) {
        green[0].classList.remove("green")
    }
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
                    if (`tile-${computerSelection[0][0]}-${computerSelection[0][1]}` === computertile.id ||
                        `tile-${computerSelection[1][0]}-${computerSelection[1][1]}` === computertile.id
                    ) {
                        computertile.style.backgroundColor = "red"
                        hasBeenClicked = true
                        numberOfHits += 1
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
    const isHorizontal = Math.floor(Math.random() * 2) === 0 ? true : false
    let randomNumberA = randomNumber()
    let randomNumberB = randomNumberLimit()
    let computerSelection = []
    if (isHorizontal) {
        computerSelection = [[computerGrid[randomNumberA][randomNumberA], computerGrid[randomNumberB][randomNumberB]], [computerGrid[randomNumberA][randomNumberA], computerGrid[randomNumberB][randomNumberB + 1]]]
    } else {
        computerSelection = [[computerGrid[randomNumberB][randomNumberB], computerGrid[randomNumberA][randomNumberA]], [computerGrid[randomNumberB][randomNumberB + 1], computerGrid[randomNumberA][randomNumberA]]]
    }

    console.log(computerSelection)
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
    setTimeout(() => {
        if (matches(computersCurrentChoice)) {
            computersTurn()
        } else {
            if (lastKnownHit.length === 0) {
                computerPicks.push(computersCurrentChoice)
                console.log(computerPicks)
                
                isThisAHit(computersCurrentChoice)
            } else {
                isThisAHit(selectAdjacentTile(lastKnownHit))
            }
        }
    }, 1000)
    // console.log(lastKnownHit)
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

const isThisAHit = arr => {
    // debugger
    if ((arr[0] === shipPlacement[0].coordinates[0][0] &&
        arr[1] === shipPlacement[0].coordinates[0][1]) ||
        (arr[0] === shipPlacement[0].coordinates[1][0] &&
        arr[1] === shipPlacement[0].coordinates[1][1])
    ) {
        lastKnownHit.push(arr)
        document.getElementById(`tile-${arr[0]}-${arr[1]}`).classList.remove("green")
        document.getElementById(`tile-${arr[0]}-${arr[1]}`).classList.add("red")
    } else {
        document.getElementById(`tile-${arr[0]}-${arr[1]}`).classList.add("grey")
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
