const startBtn = document.getElementById("start-btn")
const container = document.getElementById("game-container")
const loadScreen = document.getElementById("title-login")
const resetBtn = document.getElementById("reset-btn")
const menuBtn = document.getElementById("menu-btn")
const mediumBtn = document.getElementById("medium-btn")
const mediumGrid = document.getElementById("med-container")
let answer = Math.floor(Math.random() * 8) + 1

container.style.display = "none"
const startGame = () => {
    for (i = 0; i <= 8; i++) {
        let boxes = document.createElement("div")
        boxes.className = "boxes"
        boxes.id = i
        boxes.addEventListener("click", () => {
            if (answer.toString() === boxes.id) {
                document.getElementById(boxes.id).classList.add("red")
                result.style.display = "flex"
            } else {
                document.getElementById(boxes.id).classList.add("grey")
            }
        })
        container.appendChild(boxes)
        console.log(boxes.id)
    }
    container.style.display = "flex"
    loadScreen.style.display = "none"
    menuBtn.style.display = "block"
}

startBtn.addEventListener("click", startGame)
resetBtn.addEventListener("click", () => {
    for (i = 0; i <= 8; i++) {
        let boxes = document.getElementById(i)
        boxes.classList.remove("grey")
        boxes.classList.remove("red")
    }
    result.style.display = "none"
    answer = Math.floor(Math.random() * 8) + 1
})
menuBtn.addEventListener("click", () => window.location.reload())

//Medium Level code-- I have to generate the grid here

let medGrid = []
let row = 5
let col = 5
const ship = document.getElementById("ship")
let shipSelect = false
let shipPlacement = []

ship.addEventListener("click", () => {
    shipSelect ? shipSelect = false : shipSelect = true
    if (shipSelect) {
        ship.style.border = ".5rem solid orange"
    } else {
        ship.style.border = ".5rem solid #ffffff00"
    }
})


mediumBtn.addEventListener("click", () => {
    let val = 0
    loadScreen.style.display = "none"
    // debugger
    for (let i = 0; i <= 4; i++) {
        medGrid[i] = []
        for (let j = 0; j <= 4; j++) {
            medGrid[i][j] = j
            const tile = document.createElement("div")
            mediumGrid.appendChild(tile)
            tile.id = `tile-${i}-${j}`
            tile.classList.add("med-tiles")
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
                    console.log(shipPlacement[0].coordinates[0])
                    document.getElementById(`tile-${shipPlacement[0].coordinates[0][0]}-${shipPlacement[0].coordinates[0][1]}`).classList.add("red")
                    document.getElementById(`tile-${shipPlacement[0].coordinates[0][0]}-${shipPlacement[0].coordinates[0][1]}`).classList.add("red")



                    // tile.classList.add("red")
                    // document.getElementById(`tile-${medGrid[i][i]}-${medGrid[j][j + 1]}`).classList.add("grey")
                }
            })
        }
    }
    mediumGrid.style.display = "grid"
})

console.log(loadScreen.className)
