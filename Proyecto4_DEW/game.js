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
const sleetTime = 300
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
    
}