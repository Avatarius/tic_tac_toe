import { useState } from "react";
import { Cell } from "../cell/cell";
import styles from "./app.module.scss";
import { Turn } from "../turn/turn";
import { useCheckWin } from "./hooks/useCheckWin";
import { CellType } from "../../types";
import { Header } from "../header/header";
import clsx from "clsx";

interface IWinningCells {
  x: number;
  y: number;
}

function App() {
  const size = 3; //tmp
  const [field, setField] = useState(initField(size));
  const [turn, setTurn] = useState(false);
  const { isWon, isDraw, winningCells, winner } = useCheckWin(field);

  function initField(size: number) {
    const array = [];
    for (let i = 0; i < size; i++) {
      const arr = [];
      for (let j = 0; j < size; j++) {
        arr.push({
          value: "" as CellType,
          isActive: false,
          isWinner: false,
          x: j,
          y: i,
        });
      }
      array.push(arr);
    }
    return array;
  }

  function handleWin(winningCells: IWinningCells[]) {
    setField((prev) => {
      return prev.map((arr) =>
        arr.map((item) => {
          if (
            winningCells.some((cell) => cell.x === item.x && cell.y === item.y)
          ) {
            return { ...item, isWinner: true };
          }
          return item;
        })
      );
    });
  }

  function handleClick(row: number, column: number) {
    setField((prevField) =>
      prevField.map((arr, arrIndex) =>
        arr.map((item, itemIndex) => {
          if (row === arrIndex && column === itemIndex && item.value === "") {
            return {
              ...item,
              value: turn ? "x" : "o",
              isActive: true,
            };
          }
          return item;
        })
      )
    );
    if (field[row][column].value === "") {
      setTurn((prev) => !prev);
    }
  }

  function handleReset() {
    setField(initField(size));
    setTurn(false);
  }

  const fieldUI = field.map((item, index) =>
    item.map((cell, cellIndex) => (
      <Cell
        key={`${index} ${cellIndex}`}
        value={cell.value as CellType}
        turn={turn}
        isWinner={winningCells.some(
          (item) => item.x === cell.x && item.y === cell.y
        )}
        isActive={cell.isActive}
        onClick={() => handleClick(index, cellIndex)}
        isGameRunning={!(isWon || isDraw)}
      />
    ))
  );
  return (
    <main
      className={clsx({
        [styles.container]: true,
        [styles.container_expanded]: winner,
      })}
    >
      <Header winner={winner} />
      <section className={styles.grid}>{fieldUI}</section>
      <Turn value={!isWon && !isDraw ? turn : !turn} />
      <button type="reset" onClick={handleReset} className={styles.button}>
        Reset
      </button>
    </main>
  );
}

export { App };
