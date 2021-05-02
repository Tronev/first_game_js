// Переменные
var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var score = 0
var $time = document.querySelector('#time')
var isGameStarted = false
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var colors = ['red', 'blue' , 'green', 'yellow']
// обработчик событий
$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

// Начало игры. При клике на кнопку запускается игра, меняется фон поля и сама кнопка исчезает
function startGame() {
  score = 0
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')

  var interval =  setInterval(function() {
    var time = parseFloat($time.textContent)
    if(time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }

  }, 100)
  renderBox()
}
// функции скрытия и показа контента
function hide($el) {
  $el.classList.add('hide')
}

function show($el) {
  $el.classList.remove('hide')
}

// клик ко квадрату, есть или нет
function handleBoxClick(event) {
  if(!isGameStarted) {
    return
  }

  if(event.target.dataset.box) {
    score++
    renderBox()
  }
}
// завершение игры
function endGame() {
  isGameStarted = false
  setGameScore()
  show($start)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  hide($timeHeader)
  show($resultHeader)
  $gameTime.removeAttribute('disabled')
}
// Счет игры 
function setGameScore () {
  $result.textContent = score.toString()
}
// Функция ввода времени
function setGameTime() {
  var time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

//  Функция создания квадратиков рандомных
function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  var randomColorIndex = getRandom(0, colors.length)

  box.style.borderRadius = '100%'
  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = colors[randomColorIndex]

  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')
  
  $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min) + min) 
}