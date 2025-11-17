import React, { useState } from "react";
import "./App.css";

export default function EmojiGame() {
  const emojis = [
    "😀","😁","😂","🤣","😃","😄","😅","😉","😊","😋",
    "😎","😍","😘","😗","😙","😚","🙂","🤗","🤔","😐",
    "😶","🙄","😏","😣","😥"
  ];

  const [shuffled, setShuffled] = useState([...emojis]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const shuffleCards = () => {
    const newOrder = [...shuffled].sort(() => Math.random() - 0.5);
    setShuffled(newOrder);
  };

  const handleClick = (emoji) => {
    if (clicked.includes(emoji)) {
      // Game over
      setTopScore(Math.max(topScore, score));
      setGameOver(true);
      return;
    }

    setClicked([...clicked, emoji]);
    setScore(score + 1);
    shuffleCards();
  };

  const restartGame = () => {
    setScore(0);
    setClicked([]);
    setGameOver(false);
    shuffleCards();
  };

  return (
    <div className="game-container">
      <header className="header">
        <h1>Emoji Game</h1>
        <div className="score-box">
          <span>Score: {score}</span>
          <span>Top Score: {topScore}</span>
        </div>
      </header>

      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div className="grid">
          {shuffled.map((emoji, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleClick(emoji)}
            >
              <span className="emoji">{emoji}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
