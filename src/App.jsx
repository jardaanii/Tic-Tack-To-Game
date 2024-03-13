import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/log";
import GameOver from "./components/GameOver";
import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let gameBoard = [...initialGameBoard.map((innert) => [...innert])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  const activePlayer = deriveActivePlayer(gameTurns);

  let winner = false;
  let asdf = [...gameBoard.map((inner) => [...inner])];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (asdf[i][j] === "X") {
        asdf[i][j] = 1;
      } else if (asdf[i][j] === "O") {
        asdf[i][j] = 0;
      } else {
        asdf[i][j] = 10;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      asdf[i][0] + asdf[i][1] + asdf[i][2] === 0 ||
      asdf[i][0] + asdf[i][1] + asdf[i][2] === 3
    ) {
      winner = true;
      break;
    } else if (
      asdf[0][i] + asdf[1][i] + asdf[2][i] === 0 ||
      asdf[0][i] + asdf[1][i] + asdf[2][i] === 3
    ) {
      winner = true;
      break;
    }
  }

  if (!winner) {
    if (
      asdf[0][0] + asdf[1][1] + asdf[2][2] === 0 ||
      asdf[0][0] + asdf[1][1] + asdf[2][2] === 3
    ) {
      winner = true;
    } else if (
      asdf[2][0] + asdf[1][1] + asdf[0][2] === 3 ||
      asdf[2][0] + asdf[1][1] + asdf[0][2] === 0
    ) {
      winner = true;
    }
  }

  const hasdraw = gameTurns.length === 9 && !winner;
  function handelSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);
      const upadateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];

      return upadateTurns;
    });
  }

  function Rematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            player="Player 1"
            symbol="X"
          />
          <Player
            isActive={activePlayer === "O"}
            player="Player 2"
            symbol="0"
          />
        </ol>
        {(winner || hasdraw) && (
          <GameOver
            winner={winner ? gameTurns[0].player : false}
            Rematch={Rematch}
          />
        )}

        <GameBoard
          onSelectSquare={handelSelectSquare}
          board={gameBoard}
          winner={winner}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
