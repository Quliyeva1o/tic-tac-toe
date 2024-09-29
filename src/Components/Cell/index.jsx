import React from "react";

const Cell = ({ cell, id, currentPlayer, setCurrentPlayer, cells, setCells, winningMsg }) => {
  const handleClick = () => {
    if (!winningMsg && !cell) {
      const newCellValue = currentPlayer;
      updateCell(newCellValue);
      setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
    }
  };

  const updateCell = (value) => {
    const updatedCells = cells.map((cell, index) => (index === id ? value : cell));
    setCells(updatedCells);
  };

  return (
    <div className="square" id={id} onClick={handleClick}>
      <div className={cell}></div>
    </div>
  );
};

export default Cell;
