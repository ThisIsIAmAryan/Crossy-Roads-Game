// Game state management
export const gameState = {
  isGameOver: false,
  isRunning: true,
  score: 0
};

export function setGameOver() {
  gameState.isGameOver = true;
  gameState.isRunning = false;
}

export function resetGame() {
  gameState.isGameOver = false;
  gameState.isRunning = true;
  gameState.score = 0;
}

export function isGameRunning() {
  return gameState.isRunning && !gameState.isGameOver;
}
