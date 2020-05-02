document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')
  const square = document.querySelector('.grid')

  const width = 10
  const speed = 0.9
  let currentIndex = 0 // so first div in our grid
  let appleIndex = 0 // so first div in our grid
  let currentSnake = [2, 1, 0] // so the div in our grid being 2 (or the HEAD) and 0 being the end (Tail, with all 1's being the body from now on)
  let direction = 1
  let score = 0
  let intervalTime = 0
  let interval = 0

  function addDivs () {
    for (let i = 0; i < 100; i++) {
      const div = document.createElement('div')
      square.appendChild(div)
    }
  }

  // to start, and restart the game
  function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  // function that deals with ALL the other outcomes of the Snake
  function moveOutcomes () {
    // deals with the snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top
      squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
    ) {
      return clearInterval(interval) // this will clear the interval if any of the above conditions happen.
    }

    const tail = currentSnake.pop() // removes last bite of the array and shows it
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the snake

    // deals with the snake getting an apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  // generate the apple once apple is eaten
  function randomApple () {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
  }

  // assign functions to keycodes
  function control (e) {
    squares[currentIndex].classList.remove('snake') // we are removing the class of snake

    if (e.keyCode === 39) {
      direction = 1 // if we press the right arrow on our keyboard, the snake will turn right one div
    } else if (e.keyCode === 38) {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width // if we press the down arrow, the snake will  go forward ten divs, appearing to go down
    }
  }

  addDivs()

  document.addEventListener('keyup', control)

  startBtn.addEventListener('click', startGame)
})
