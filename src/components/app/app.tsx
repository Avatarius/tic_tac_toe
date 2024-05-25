import { useState, CSSProperties } from "react";
import { Cell } from "../cell/cell";
import styles from "./app.module.scss";
import { Turn } from "../turn/turn";
import { useCheckWin } from "./hooks/useCheckWin";
import { ICell } from "../../types";
import { CellType } from "../../types";

interface IWinningCells {
  x: number;
  y: number;
}

function App() {
  const size = 3; //tmp
  const [field, setField] = useState(initField(size));
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState("");
  const [isGameRunning, setIsGameRunning] = useState(true);

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

  function checkWin(array: ICell[][]) {
    let winningCells: IWinningCells[] = [];
    const rows = array;
    const columns = array.map((arr, arrIndex) =>
      array.map((item) => item[arrIndex])
    );
    const diagonal = array.map((item, index) => item[index]);
    const diagonal_reversed = array.map(
      (item, index, arr) => item[arr.length - 1 - index]
    );
    const isWon = [...rows, ...columns, diagonal, diagonal_reversed].some(
      (arr) => {
        const isLineEqual = arr.every(
          (item) => item.value === arr[0].value && item.value !== ""
        );
        if (isLineEqual) {
          winningCells = arr.map((item) => ({ x: item.x, y: item.y }));
          arr[0].value === "x" ? setWinner("x") : setWinner("o");
        }

        return isLineEqual;
      }
    );
    const isDraw = array.every((arr) => arr.every((item) => item.value !== ""));
    return { isWon, isDraw, winningCells };
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
    if (!isGameRunning) return;
    setField((prev) => {
      const array = prev.map((item, index) =>
        item.map((cell, cellIndex) => {
          if (row === index && column === cellIndex && cell.value === "") {
            return {
              ...cell,
              value: turn ? "x" : ("o" as CellType),
              isActive: true,
            };
          }
          return cell;
        })
      );
      const { isWon, isDraw, winningCells } = checkWin(array);
      if (isWon || isDraw) {
        setIsGameRunning(false);
      }
      if (isDraw) {
        setWinner("draw");
        return array;
      }
      if (isWon) {
        handleWin(winningCells);
      }
      return array;
    });
    field[row][column].value === "" && setTurn((prev) => !prev);
  }

  function handleReset() {
    setField(initField(size));
    setWinner("");
    setTurn(false);
    setIsGameRunning(true);
  }

  function displayWinner() {
    switch (winner) {
      case "draw":
        return <p>Draw</p>;
      case "x":
      case "o":
        return <p>Player {winner} wins!</p>;
      default:
        return null;
    }
  }

  const fieldUI = field.map((item, index) =>
    item.map((cell, cellIndex) => (
      <Cell
        key={`${index} ${cellIndex}`}
        value={cell.value as CellType}
        turn={turn}
        isWinner={cell.isWinner}
        isActive={cell.isActive}
        onClick={() => handleClick(index, cellIndex)}
        isGameRunning={isGameRunning}
      />
    ))
  );
  return (
    <section
      className={styles.container}
      style={{ "--size": size } as CSSProperties}
    >
      <Turn value={turn} />
      <div className={styles.grid}>{fieldUI}</div>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
      {displayWinner()}
    </section>
  );
}

export { App };
