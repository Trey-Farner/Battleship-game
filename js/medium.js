
const mediumBtn = document.getElementById("medium-btn")
const mediumGrid = document.getElementById("med-container")
const resetSelectionBtn = document.getElementById("reset-selection-btn")
const red = document.getElementsByClassName("red")
let medGrid = []
let row = 5
let col = 5
const ship = document.getElementById("ship")
let shipSelect = false
let shipPlacement = []
const invalidPlacement = document.getElementById("invalid-placement")


//Boolean if placement of ship is off the board
const validShipPlacement = () => {
    if (shipPlacement[0].coordinates[0][0] > 4 || 
        shipPlacement[0].coordinates[0][1] > 4 ||
        shipPlacement[0].coordinates[1][0] > 4 ||
        shipPlacement[0].coordinates[1][1] > 4) {
            shipPlacement = []
            invalidPlacement.innerText = "Please replace your ship in a valid location"
            return true
    } else {
        return false
    }
}

//Tells computer to place the ship and add DOM visualisation
ship.addEventListener("click", () => {
    shipSelect ? shipSelect = false : shipSelect = true
    if (shipSelect) {
        ship.style.border = ".5rem solid orange"
        while (red.length > 0) {
        red[0].classList.remove("red")
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
                            coordinates: [[medGrid[i][i], medGrid[j][j]], [medGrid[i][i], medGrid[j][j + 1]]]
                        })
                    } else {
                        shipPlacement = []
                        shipPlacement.push({
                            name: "small-ship",
                            coordinates: [[medGrid[i][i], medGrid[j][j]], [medGrid[i][i], medGrid[j][j + 1]]]
                        })
                    }
                    if (validShipPlacement()) {
                        return
                    } else {
                        console.log(shipPlacement[0])
                        document.getElementById(`tile-${shipPlacement[0].coordinates[0][0]}-${shipPlacement[0].coordinates[0][1]}`).classList.add("red")
                        document.getElementById(`tile-${shipPlacement[0].coordinates[1][0]}-${shipPlacement[0].coordinates[1][1]}`).classList.add("red")
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
    while (red.length > 0) {
        red[0].classList.remove("red")
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

            //Selecting enemy tiles
            computertile.addEventListener("click", () => {
                if (`tile-${computerSelection[0][0]}-${computerSelection[0][1]}` === computertile.id ||
                    `tile-${computerSelection[1][0]}-${computerSelection[1][1]}` === computertile.id
                ) {
                    console.log("Hit!!!")
                } else {
                    console.log("Miss")
                    console.log(computertile.id)
                }
            })
        }
    }

    //Computer Tile selection
    const isHorizontal = Math.floor(Math.random() * 2) === 0 ? true : false
    const randomNumber = () => Math.floor(Math.random() * 5)
    const randomNumberLimit = () => Math.floor(Math.random() * 4)
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

startGameBtn.addEventListener("click", startGame)

generateTiles()