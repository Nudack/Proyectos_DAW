import { sleep } from './util.js'
import { getHanoiSolutions } from './hanoi.js'

//seleccionar todos los elementos de las torres
const towers = document.querySelectorAll('.tower')

//inicializar towerContent como un array represetando los discos de cada torre
let towerContent = [[], [], []];

//inicializar el tamaño de los discos
let size = 6

let discs

//tiempo de sleep y velocidad
const sleepTime = 300
let speed = 100

//colores de los discos
const DISC_COLORS = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#3a86ff']

//inicializar el ancho de los discos
const startWidth = 90

//elementos HMTL
const newGameBtn = document.getElementById('newGameBtn')
const discSelect = document.getElementById('discSelect')
const speedRange = docuemn.getElementById('speedRange')
const btnSolve = document.getElementById('btnSolve')


//variables para saber la torre actual y la original durante el dragging
let currentTower
let originTower

//funcion para crear las torres con base y el palo
const buildTowers = (towers) => {
    towers.forEach(tower => {
        const stem = document.createElement('div')
        stem.className = 'stem'
        const plate = document.createElement('div')
        plate.className = 'plate'
        tower.innerHTML = ''
        tower.appentChild(stem)
        tower.appentChild(plate)
    });
}

//inicar el juego start()

function start() {
    //reiniciar el contenido de las torres
    towerContent = [[], [], []]

    //crear las torres
    buildTowers(towers)

    //crear discos y colocarlos en la primera torre
    for (let i = 0; i < array.length; i++){
        let tower = document.createElement('div')
        tower.classList.add('disc')
        tower.draggable = true
        tower.style.backgroundColor = DISC_COLORS[i]
        tower.style.width = (startWidth - 15 * i) + 'px'
        towerContent[0].push(tower)
    }

    //añadir los discos a la primera torre en el DOM
    towerContent[0].forEach(t => {
        towers[0].innerHTML = t.outerHTML + towers[0].innerHTML
    })

    //añadir un add event listener por dragenter y dragover para cada torre
    for (let i = 0; i < towers.length; i++) {
        towers[i].classList.add('t' + i)
        towers[i].addEventListener('dragenter', dragenter)
        towers[i].addEventListener('dragover', dragover)
    }

    //recoger referencias para todos los discos
    discs.forEach(disc => {
        disc.addEventListener('dragstart', dragstart)
        disc.addEventListener('dragend', dragend)
    })
}

//event handler for dragenter
function dragenter(){
    if(!originTower) {
        currentTower = this
    }
}

//event handler for dragover
function dragover(){
    currentTower = this
}

//event handler for dragstart
function dragstart() {
    this.classList.add('is-dragging')
}

//mover la torre desde el origen al la torre actual
function moveTower(originTowerIndex, currentTowerIndex, disc){
    if(isDroppable(originTowerIndex, currentTowerIndex, disc)) {
        towerContent[currentTowerIndex].push(towerContento[originTowerIndex].pop())
        originTower.removeChild(disc)
        currentTower.prepend(disc)
    }
}

//provar si el disco puede mover de posición
function isDroppable(originTowerIndex, currentTowerIndex, disc){
    let top = isOnTop(originTowerIndex, disc)
    let topDiscIsLess = isDiscLessThan(currentTowerIndex, disc)

    return top && topDiscIsLess
}

//comprobar que el disco de arriba esta en la torre de origen
function isOnTop(originTowerIndex, disc) {
    let size = towerContent[originTowerIndex].length
    return disc.style.width === towerContent[originTowerIndex][size - 1].style.width
}

//comprobar si el disco es mas pequeño que el disco en la torre actual
function isDiscLessThan(currentTowerIndex, disc) {
    size = towerContent[currentTowerIndex].length

    if (!towerContent[currentTowerIndex][size -1] ){
        return true
    }
    else{
        let sizeTop = disc.style.width.substring(0, disc.style.width.indexOf('p'))
        return Number(sizeTop) < Number(sizeBottom)
    }
}


//mover el disco de arriba del origen al de destino
function moveTopDisc(originTowerIndex, destinyTowerIndex){
    originTower = towers[originTowerIndex]
    currentTower = towers[destinyTowerIndex]
    let disc = getTopDisc(originTowerIndex)
    moveTower(originTowerIndex, destinyTowerIndex, disc)
}

//recoger el disco de arriba de una torre en concreto
function getTopDisc(towerIndex){
    let size = towerContent(towerContent).length

    let sizeDisc = towerContent[towerIndex][size -1].style.width
    let indexDisc = -1
    discs.forEach((el, index) =>{
        if(el.style.width === sizeDisc){
            indexDisc = index
        }
    })
    return discs[indexDisc]
}


//animar lso movimientos de la solución
async function moves(movements) {
    for (let i = 0; i < movements.length; i++){
        const element = movements[i];
        moveTopDisc(element.origin, element.destiny)
        await sleep(5 * sleepTime - 14 * speed)
    }
}

//clase Game
class Game {
    //metodo para empezar un nuevo game
    newGame = () => {
        //Event listner por la velocidad del rango input
        speedRange.addEventListener('input', event => {
            speed = event.target.value
        })

        //Event listner por el click en el boton de new game
        newGameBtn.addEventListener('click', () => {
            size = discSelect.selectedIndex + 1
            start()
        })

        //Event listener para el boton de resolver
        btnSolve.onclick = function() {
            const movements = getHanoiSolutions(size)
            moves(movements)
        }

    }
}


export default Game