export default function movePlayer(paddle) {
  document.addEventListener("mousemove", (e) => {
    paddle.style.setProperty("--position", (e.y * 100) / window.innerHeight)
  })
}
