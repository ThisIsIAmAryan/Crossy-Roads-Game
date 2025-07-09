import * as THREE from "three";
import { metadata as rows } from "./components/Map";
import { player, position } from "./components/Player";
import { audioManager } from "./audioManager";
import { gameState, setGameOver, isGameRunning } from "./gameState";

const resultDOM = document.getElementById("result-container");
const finalScoreDOM = document.getElementById("final-score");

export function hitTest() {
  // Don't check for hits if game is already over
  if (!isGameRunning()) return;

  const row = rows[position.currentRow - 1];
  if (!row) return;

  if (row.type === "car" || row.type === "truck") {
    const playerBoundingBox = new THREE.Box3();
    playerBoundingBox.setFromObject(player);

    row.vehicles.forEach(({ ref }) => {
      if (!ref) throw Error("Vehicle reference is missing");

      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        if (!resultDOM || !finalScoreDOM) return;
        
        // Set game over state to prevent multiple collisions
        setGameOver();
        
        // Play crash sound only once
        audioManager.playCrashSound();
        
        // Stop ambient music on game over
        audioManager.stopAmbientMusic();
        
        resultDOM.style.visibility = "visible";
        finalScoreDOM.innerText = position.currentRow.toString();
      }
    });
  }
}