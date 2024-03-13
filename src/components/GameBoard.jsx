/* eslint-disable react/prop-types */

export default function GameBoard({ onSelectSquare, board, winner }) {
  // function handelSelectSquare(i, j) {
  // setGameBoard((prevGameBoard) => {
  //   const updatedBoard = [
  //     ...prevGameBoard.map((innerArray) => [...innerArray]),
  //   ];
  //   updatedBoard[i][j] = activePlayerSymbol;
  //   return updatedBoard;
  // });

  // onSelectSquare();
  // checkWinner();
  // }

  const upMat = board.map((row, rowIndex) => (
    <li key={rowIndex}>
      <ol>
        {row.map((playerSymbol, colIndex) => (
          <li key={colIndex}>
            <button
              onClick={() => onSelectSquare(rowIndex, colIndex)}
              disabled={!(playerSymbol === null) || winner}
            >
              {playerSymbol}
            </button>
          </li>
        ))}
      </ol>
    </li>
  ));

  return <ol id="game-board">{upMat}</ol>;
}
