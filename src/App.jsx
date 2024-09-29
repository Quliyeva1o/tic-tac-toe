import React, { useEffect, useState } from "react";
import Cell from "./Components/Cell";
import donut from './assets/donut.png';
import cross from './assets/cross.png';

const App = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winningMsg, setWinningMsg] = useState(null);
  const [rainElements, setRainElements] = useState([]);

  const message = `It is now ${currentPlayer}'s go.`;

  useEffect(() => {
    checkForWinner();
  }, [cells]);

  useEffect(() => {
    if (winningMsg) {
      initiateRain();
    }
  }, [winningMsg]);

  const handleRestartGame = () => {
    setCells(Array(9).fill(""));
    setCurrentPlayer("O");
    setWinningMsg(null);
    setRainElements([]);
  };

  const checkForWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinningMsg(`${cells[a]} Wins!`);
        return;
      }
    }

    if (cells.every((cell) => cell !== "")) {
      setWinningMsg("It's a Draw!");
    }
  };

  const createRainElement = () => {
    const newRain = (
      <div
        className="makeRain"
        style={{
          left: Math.random() * 100 + "vw",
          animationDuration: `${Math.random() * 2 + 3}s`,
        }}
      >
        <img 
          className="rain" 
          src={winningMsg === "X Wins!" ? cross : winningMsg === "O Wins!" ? donut : null} 
          alt="rain" 
        />
      </div>
    );

    setRainElements((prev) => [...prev, newRain]);

    setTimeout(() => {
      setRainElements((prev) => prev.slice(1));
    }, 5000);
  };

  const initiateRain = () => {
    const intervalId = setInterval(createRainElement, 300);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);
  };

  return (
    <div className="app">
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winningMsg={winningMsg}
          />
        ))}
        {rainElements.map((rainElement, index) => (
          <React.Fragment key={index}>{rainElement}</React.Fragment>
        ))}
      </div>
      <p className="message">
        {winningMsg || message}
        <img
          src={donut}
          className="restartIcon"
          alt="restart"
          onClick={handleRestartGame}
        />
      </p>
    </div>
  );
};

export default App;
