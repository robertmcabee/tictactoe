const box1 = {weight:0, status:"blank", id:document.getElementById('box1'), name:'box1'}
const box2 = {weight:0, status:"blank", id:document.getElementById('box2'), name:'box2'}
const box3 = {weight:0, status:"blank", id:document.getElementById('box3'), name:'box3'}
const box4 = {weight:0, status:"blank", id:document.getElementById('box4'), name:'box4'}
const box5 = {weight:0, status:"blank", id:document.getElementById('box5'), name:'box5'}
const box6 = {weight:0, status:"blank", id:document.getElementById('box6'), name:'box6'}
const box7 = {weight:0, status:"blank", id:document.getElementById('box7'), name:'box7'}
const box8 = {weight:0, status:"blank", id:document.getElementById('box8'), name:'box8'}
const box9 = {weight:0, status:"blank", id:document.getElementById('box9'), name:'box9'}

const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9, ]


const line1 = [box1, box2, box3] //top horizontal row
const line2 = [box4, box5, box6] //middle horizontal row
const line3 = [box7, box8, box9] //bottom horizontal row
const line4 = [box1, box4, box7] //left column
const line5 = [box2, box5, box8] //middle column
const line6 = [box3, box6, box9] //right column
const line7 = [box1, box5, box9] //descending line
const line8 = [box3, box5, box7] //ascending line

const allLines = [line1, line2, line3, line4, line5, line6, line7, line8]

const text = document.getElementById('statustext')

var gameOver = false

var playerGoesFirst = true

const button = document.getElementById('button')


//New Game Button
button.addEventListener('click', (e) => {
    boxes.forEach(box =>{
        box.id.innerHTML = ''
        box.status = "blank"
        box.weight = 0
    })

    gameOver = false
    //if the player went first, now the cpu goes
    if (playerGoesFirst === true) {
        playerGoesFirst = false
        evalBoardState()
        cpuChoice()
        text.innerText = "AI goes first"
    } else {
        playerGoesFirst = true
        text.innerText = "You go first"
    }
})



function winState() {
    text.innerText = "You Win!"
    gameOver = true
}

function loseState() {
    text.innerText = "You Lose!"
    gameOver = true
}

function tieState() {
    text.innerText = "Game is a tie!"
    gameOver = true
}

function evalBoardState() {
    //
    allLines.forEach(line => {
        let numOfXes = 0
        let numOfOs = 0
        //count x's & o's in each box of that line
        line.forEach(box =>{
            if(box.status === "x"){
                numOfXes++
            } if (box.status === "o"){
                numOfOs++
            }
        })
        //check for three in a rox
        if (numOfXes === 3){
            winState()
    
        } else if (numOfOs === 3){
            loseState()
    
        //add weight to empty boxes in line
        } else if (numOfXes === 0 && numOfOs === 0) {
            line.forEach(box =>{box.status === "blank" ? box.weight += (10 + Math.random()): box.weight = 0})
    
        } else if (numOfXes >= 1 && numOfOs >= 1) {
            null
    
        } else if (numOfXes === 1) {
            line.forEach(box =>{box.status === "blank" ? box.weight += (100 + Math.random()) : box.weight = 0})
    
        } else if (numOfXes === 2) {
            line.forEach(box =>{box.status === "blank" ? box.weight += (1000 + Math.random()) : box.weight = 0})
    
        } else if (numOfOs === 1) {
            line.forEach(box =>{box.status === "blank" ? box.weight += (100 + Math.random()) : box.weight = 0})
    
        } else if (numOfOs === 2) {
            line.forEach(box =>{box.status === "blank" ? box.weight += 10000 : box.weight = 0})
        } 
    })
    
    // display weight & status to console
    console.log("~-~-~-~-~-~-~-~-~-~-~-~-~-~-~")
    boxes.forEach(box => {
        console.log(box.name + "| status:" + box.status + " weight:" + box.weight)
    })
}

function cpuChoice() {
    if (gameOver === false) {
        //goes through each box to find the highest numbered
        var bestChoice = box1
        boxes.forEach(box => {
            if (box.weight > bestChoice.weight) {
                bestChoice = box
            }
        })
        //if nothing has been assigned weight, game ends
        if (bestChoice.weight === 0) {
            tieState()
            //or cpu goes
        } else {
            turnO(bestChoice)
            evalBoardState()
        }
    }
}

function turnX(box) {
    box.id.innerHTML = 'X'
    box.status = "x"
    box.weight = 0
}

function turnO(box) {
    box.id.innerHTML = 'O'
    box.status = "o"
    //reset weight
    boxes.forEach(box => {
        box.weight = 0
    })
}




boxes.forEach((box, index) => {
    box.id.addEventListener('click', (e) => {
        //only allow if game is still going & selected box is empty
        if (gameOver === false && box.status === "blank") {
            turnX(box)
            evalBoardState()

            //if game is not ended, cpu goes
            setTimeout(() => {
                gameOver === false ? cpuChoice() : null
            }, 200);

        }
    })
})

//right click to cheat!!
boxes.forEach((box, index) => {
    box.id.addEventListener('contextmenu', (e) => {
        if (gameOver === false && box.status === "blank") {
            turnX(box)
            evalBoardState()
        }
    })
})

// USE FOR TEST

// line1.forEach(box =>{
//     box.id.style.backgroundColor = 'black'
// })

