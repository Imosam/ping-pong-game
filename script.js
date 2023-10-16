import updateBall from "./updateBall.js"
import movePlayer from "./movePlayer.js"
const ball = document.querySelector("#ball")
const playerPaddle = document.querySelector("#player-paddle")
const computerPaddle = document.querySelector("#computer-paddle")
const playerScore = document.querySelector(".player-score")
const computerScore = document.querySelector(".computer-score")
let lastTime
playGame()
function playGame() {
  movePlayer(playerPaddle)
  window.requestAnimationFrame(update)
}
function update(time) {
  if (lastTime) {
    let delta = time - lastTime
    updateBall(
      ball,
      delta,
      playerPaddle,
      computerPaddle,
      playerScore,
      computerScore
    )
  }
  lastTime = time
  window.requestAnimationFrame(update)
}
