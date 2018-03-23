//Define the initial state
var state = {
  a: 0,
  b: 0,
  ans: false,
  timeLimit: 3000,
  gameOver: false,
  timeOutId: undefined,
  score: -1,
  sum: 0,
  color:'#6c7c6f'
}


//DOM object
var DOM = {
  body: document.getElementsByTagName('body')[0],
  rightBtn: document.getElementById('right-btn'),
  wrongBtn: document.getElementById('wrong-btn'),
  numbers: document.getElementById('numbers'),
  output: document.getElementById('output'),
  score: document.getElementById('score'),
  gameOver: document.getElementById('game-over'),
  gameOverMsg: document.getElementById('game-over-msg'),
  playAgainBtn: document.getElementById('play-again-btn'),
  currentScore: document.getElementById('current-score'),
  bestScore: document.getElementById('best-score'),
  timer: document.getElementById('timer')
}

//Initialize the DOM and load the function
document.addEventListener('DOMContentLoaded',function() {
  DOM.rightBtn.addEventListener('click', right)
  DOM.wrongBtn.addEventListener('click', wrong)
  DOM.playAgainBtn.addEventListener('click', pageRefresh)
  DOM.body.style['background-color'] = '#525b54'//Load the color for the first time
  DOM.body.style['background-color'] = getRandomColor() // changing the color randomly
  generateRandomNumbers()
  timeRefresh()
})


// Change the color randomly
function getRandomColor () {
  var possibleColors = ['#4286f4', '#f441ca', '#8c868a', '#12ba31']
  return possibleColors[Math.floor((Math.random()* 10) + 1)]
}

// reloading the page
function pageRefresh () {
  window.location.reload()
}

//generating the new random numbers
function generateRandomNumbers () {
  //DOM.body.style['background-color']=getRandomColor();
  state.a = Math.floor((Math.random()* 10) + 1);
  state.b = Math.floor((Math.random()* 10) + 1);
  state.ans = Math.floor((Math.random()* 10) + 1);
  state.score = state.score + 1
  contentRefresh()
}


// Reloading the page with the new number
function contentRefresh () {
  DOM.score.textContent = state.score
  DOM.numbers.textContent = state.a + ' + ' + state.b
  DOM.output.textContent = (function () {
    state.sum = state.a + state.b
    if (state.ans === true) {
      return '= ' + state.sum
    } else {
      return '= ' + (function () {
        var incorrect = state.sum
        while (true) {
          incorrect = Math.floor((Math.random()* 10) + 1);
          if (incorrect != state.sum) {
            return incorrect
            break
          }
        }
      })()
    }
  })()
}

// To check if the output is correct
function right () {
  if (state.ans === state.sum) {
    generateRandomNumbers()
    timeRefresh()
  } else {
    gameOver('Game Over')
  }
}

// Checking with the wrong output
function wrong () {
  
  if (state.ans !== state.sum) {
    generateRandomNumbers()
    timeRefresh()

  } else {
    gameOver('Game Over')
  }
}


// Refreshing the timer for the new problem
function timeRefresh () {
  if (state.timeOutId) {
    DOM.timer.className = ''
    window.clearTimeout(state.timeOutId)
  }
  timerStart()
}


//Restart the timer
function timerStart () {
  window.setTimeout(function () {
    DOM.timer.className = 'active'
  }, 100)
  state.timeOutId = window.setTimeout(function () {
    if (!state.gameOver) {
      gameOver('Time Out')
    }
  }, state.timeLimit)
}

// Game over
function gameOver (reason) {
  state.gameOver = true
  DOM.gameOverMsg.textContent = reason
  DOM.currentScore.textContent = state.score
  DOM.bestScore.textContent = getHighScore()
  DOM.gameOver.className = 'on-screen'
  DOM.rightBtn.disabled = true
  DOM.wrongBtn.disabled = true
}

//storing the value in local storage
function getHighScore () {
  var highScore = window.localStorage.getItem('high-score')
  if (highScore) {
    if (highScore < state.score) {
      window.localStorage.setItem('high-score', state.score)
      return state.score
    } else {
      return highScore
    }
  } else {
    window.localStorage.setItem('high-score', state.score)
    return state.score
  }
}



