import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player, initializePlayer } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import { audioManager } from "./audioManager";
import { resetGame, isGameRunning } from "./gameState";
import "./style.css";
import "./collectUserInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

const scoreDOM = document.getElementById("score");
const resultDOM = document.getElementById("result-container");

initializeGame();

document
  .querySelector("#retry")
  ?.addEventListener("click", initializeGame);

function initializeGame() {
  // Reset game state
  resetGame();
  
  initializePlayer();
  initializeMap();

  // Initialize UI
  if (scoreDOM) scoreDOM.innerText = "0";
  if (resultDOM) resultDOM.style.visibility = "hidden";
  
  // Restart ambient music
  audioManager.startAmbientMusic();
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

// Handle window resize
window.addEventListener('resize', () => {
  const container = document.getElementById("game-container");
  if (container) {
    const containerRect = container.getBoundingClientRect();
    renderer.setSize(containerRect.width, containerRect.height);
    
    // Update camera if needed
    const size = 300;
    const viewRatio = containerRect.width / containerRect.height;
    const width = viewRatio < 1 ? size : size * viewRatio;
    const height = viewRatio < 1 ? size / viewRatio : size;
    
    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();
  }
});

function animate() {
  // Only animate if game is running
  if (isGameRunning()) {
    animateVehicles();
    animatePlayer();
    hitTest();
  }

  renderer.render(scene, camera);
}