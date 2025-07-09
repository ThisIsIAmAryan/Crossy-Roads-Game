import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";
import { audioManager } from "../audioManager";

export const player = Player();

function Player() {
  const player = new THREE.Group();

  // Chicken body (main torso) - shorter and more proportional
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(16, 12, 12),
    new THREE.MeshLambertMaterial({
      color: 0xffffff, // White body
      flatShading: true,
    })
  );
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.z = 12; // Raised so bottom of body is at ground level (z=6)
  player.add(body);

  // Chicken head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshLambertMaterial({
      color: 0xffffff, // White head
      flatShading: true,
    })
  );
  head.position.z = 23; // Raised with body
  head.position.y = 2;
  head.castShadow = true;
  head.receiveShadow = true;
  player.add(head);

  // Chicken beak
  const beak = new THREE.Mesh(
    new THREE.BoxGeometry(3, 6, 2),
    new THREE.MeshLambertMaterial({
      color: 0xffa500, // Orange beak
      flatShading: true,
    })
  );
  beak.position.z = 23; // Raised with head
  beak.position.y = 8;
  beak.castShadow = true;
  beak.receiveShadow = true;
  player.add(beak);

  // Chicken comb (red thing on top of head)
  const comb = new THREE.Mesh(
    new THREE.BoxGeometry(6, 2, 4),
    new THREE.MeshLambertMaterial({
      color: 0xff0000, // Red comb
      flatShading: true,
    })
  );
  comb.position.z = 29; // Raised with head
  comb.position.y = 2;
  comb.castShadow = true;
  comb.receiveShadow = true;
  player.add(comb);

  // Chicken tail feathers
  const tail = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 8),
    new THREE.MeshLambertMaterial({
      color: 0xf0f0f0, // Light gray tail
      flatShading: true,
    })
  );
  tail.position.z = 14; // Raised with body
  tail.position.y = -8;
  tail.castShadow = true;
  tail.receiveShadow = true;
  player.add(tail);

  // Chicken wings (left and right)
  const leftWing = new THREE.Mesh(
    new THREE.BoxGeometry(3, 8, 8),
    new THREE.MeshLambertMaterial({
      color: 0xf5f5f5, // Very light gray wings
      flatShading: true,
    })
  );
  leftWing.position.x = -8;
  leftWing.position.z = 13; // Raised with body
  leftWing.castShadow = true;
  leftWing.receiveShadow = true;
  player.add(leftWing);

  const rightWing = new THREE.Mesh(
    new THREE.BoxGeometry(3, 8, 8),
    new THREE.MeshLambertMaterial({
      color: 0xf5f5f5, // Very light gray wings
      flatShading: true,
    })
  );
  rightWing.position.x = 8;
  rightWing.position.z = 13; // Raised with body
  rightWing.castShadow = true;
  rightWing.receiveShadow = true;
  player.add(rightWing);

  // Chicken legs (left and right) - positioned to rest on ground (z=3)
  const leftLeg = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 6),
    new THREE.MeshLambertMaterial({
      color: 0xffa500, // Orange legs
      flatShading: true,
    })
  );
  leftLeg.position.x = -4;
  leftLeg.position.y = 3;
  leftLeg.position.z = 6; // Position so bottom of leg is at ground level (z=3)
  leftLeg.castShadow = true;
  leftLeg.receiveShadow = true;
  player.add(leftLeg);

  const rightLeg = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 6),
    new THREE.MeshLambertMaterial({
      color: 0xffa500, // Orange legs
      flatShading: true,
    })
  );
  rightLeg.position.x = 4;
  rightLeg.position.y = 3;
  rightLeg.position.z = 6; // Position so bottom of leg is at ground level (z=3)
  rightLeg.castShadow = true;
  rightLeg.receiveShadow = true;
  player.add(rightLeg);

  // Eyes (left and right) - adjusted for new head position
  const leftEye = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 2.2, 2.2),
    new THREE.MeshLambertMaterial({
      color: 0x000000, // Black eyes
      flatShading: true,
    })
  );
  leftEye.position.x = -4; // Further out from head center
  leftEye.position.y = 6; // Further forward from head
  leftEye.position.z = 25; // Raised with head
  player.add(leftEye);

  const rightEye = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 2.2, 2.2),
    new THREE.MeshLambertMaterial({
      color: 0x000000, // Black eyes
      flatShading: true,
    })
  );
  rightEye.position.x = 4; // Further out from head center
  rightEye.position.y = 6; // Further forward from head
  rightEye.position.z = 25; // Raised with head
  player.add(rightEye);

  const playerContainer = new THREE.Group();
  playerContainer.add(player);

  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function initializePlayer() {
  // Initialize the Three.js player object
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 0;

  // Initialize metadata
  position.currentRow = 0;
  position.currentTile = 0;

  // Clear the moves queue
  movesQueue.length = 0;
}

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  // Play Mario jump sound when player starts moving
  audioManager.playJumpSound();
  
  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;

  // Add new rows if the player is running out of them
  if (position.currentRow > rows.length - 10) addRows();

  const scoreDOM = document.getElementById("score");
  if (scoreDOM) scoreDOM.innerText = position.currentRow.toString();
}