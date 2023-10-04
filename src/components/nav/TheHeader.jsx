import React from 'react'

export default function TheHeader(
    {score,
    bestScore,
    startGame,
    gameStarted
}
) {
  return (
<div className="flex items-center justify-between bg-blue-500 p-4">
  <img src="/images/pngwing.com.png" alt='' className="w-12 h-12" />

  <div className="text-white text-lg">
    {gameStarted && (<h2>Current Score: {score}</h2>)}
    <h2>Best Score: {bestScore}</h2>
  </div>

  <div>
    <button type="button" onClick={startGame} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Start Game
    </button>
  </div>
</div>

  )
}
