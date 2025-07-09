import * as THREE from "three";

export function Renderer() {
  const canvas = document.querySelector("canvas.game");
  if (!canvas) throw new Error("Canvas not found");

  const container = document.getElementById("game-container");
  if (!container) throw new Error("Game container not found");

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Use container dimensions instead of window dimensions
  const containerRect = container.getBoundingClientRect();
  renderer.setSize(containerRect.width, containerRect.height);
  renderer.shadowMap.enabled = true;

  return renderer;
}