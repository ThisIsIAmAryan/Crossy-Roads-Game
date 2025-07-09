import { queueMove } from "./components/Player";
import { audioManager } from "./audioManager";
import { isGameRunning } from "./gameState";

document
  .getElementById("forward")
  ?.addEventListener("click", () => {
    if (isGameRunning()) queueMove("forward");
  });

document
  .getElementById("backward")
  ?.addEventListener("click", () => {
    if (isGameRunning()) queueMove("backward");
  });

document
  .getElementById("left")
  ?.addEventListener("click", () => {
    if (isGameRunning()) queueMove("left");
  });

document
  .getElementById("right")
  ?.addEventListener("click", () => {
    if (isGameRunning()) queueMove("right");
  });

// Music toggle button
document
  .getElementById("music-toggle")
  ?.addEventListener("click", () => {
    const button = document.getElementById("music-toggle");
    audioManager.toggleMusic();
    
    // Update button appearance
    if (audioManager.isMusicPlaying) {
      button.textContent = "🎵";
      button.classList.remove("muted");
      button.title = "Turn Music Off";
    } else {
      button.textContent = "🔇";
      button.classList.add("muted");
      button.title = "Turn Music On";
    }
  });

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault(); // Avoid scrolling the page
    if (isGameRunning()) queueMove("forward");
  } else if (event.key === "ArrowDown") {
    event.preventDefault(); // Avoid scrolling the page
    if (isGameRunning()) queueMove("backward");
  } else if (event.key === "ArrowLeft") {
    event.preventDefault(); // Avoid scrolling the page
    if (isGameRunning()) queueMove("left");
  } else if (event.key === "ArrowRight") {
    event.preventDefault(); // Avoid scrolling the page
    if (isGameRunning()) queueMove("right");
  } else if (event.key === "m" || event.key === "M") {
    // Toggle music with 'M' key
    event.preventDefault();
    document.getElementById("music-toggle")?.click();
  }
});