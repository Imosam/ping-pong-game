let velocity = 0.07
const speed = 0.005
let flipX = 1
let flipY = 1
let direction = generateDirection()
export default function updateBall(
  ball,
  time,
  player,
  computer,
  playerScore,
  computerScore
) {
  const rect = ball.getBoundingClientRect()
  const rectPlayer = player.getBoundingClientRect()
  const rectComputer = computer.getBoundingClientRect()
  moveComputer(computer, rect, time)
  const x = parseFloat(getComputedStyle(ball).getPropertyValue("--x"))
  const y = parseFloat(getComputedStyle(ball).getPropertyValue("--y"))
  if (rect.bottom <= window.innerHeight && rect.top >= 0) {
    ball.style.setProperty("--y", y + flipY * direction.y * time * velocity)
  } else {
    flipY *= -1
    ball.style.setProperty("--y", y + flipY * direction.y * time * velocity)
  }
  if (rect.left >= 0 && rect.right <= window.innerWidth) {
    if (intersection(rect, rectPlayer) || intersection(rect, rectComputer)) {
      flipX *= -1
      velocity += 0.01
    }
    ball.style.setProperty("--x", x + flipX * direction.x * time * velocity)
  } else {
    const hue = getComputedStyle(document.documentElement).getPropertyValue(
      "--hue"
    )
    document.documentElement.style.setProperty("--hue", hue + 1)
    if (rect.left < 0) {
      computerScore.innerText = parseInt(computerScore.innerText) + 1
    } else playerScore.innerText = parseInt(playerScore.innerText) + 1
    velocity = 0.07
    direction = reset(ball, player, computer)
  }
}
function intersection(r1, r2) {
  return (
    r1.left <= r2.right &&
    r1.top <= r2.bottom &&
    r1.bottom >= r2.top &&
    r1.right >= r2.left
  )
}
function moveComputer(computer, rectBall, time) {
  const position = parseFloat(
    getComputedStyle(computer).getPropertyValue("--position")
  )
  const rectComputer = computer.getBoundingClientRect()
  computer.style.setProperty(
    "--position",
    position + (rectBall.y - rectComputer.y) * speed * time
  )
}
function reset(ball, player, computer) {
  let direction = {
    x: 0,
  }
  while (Math.abs(direction.x) <= 0.3 || Math.abs(direction.x) >= 0.7) {
    direction = { ...generateDirection() }
  }
  ball.style.setProperty("--x", 50)
  ball.style.setProperty("--y", 50)
  player.style.setProperty("--position", 50)
  computer.style.setProperty("--position", 50)
  return direction
}
function generateDirection() {
  const heading = Math.cos(Math.random() * 100)
  return {
    x: heading,
    y: heading,
  }
}
