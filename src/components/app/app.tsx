import { useState, CSSProperties } from "react";
import { Cell } from "../cell/cell";
import styles from "./app.module.scss";
import { Turn } from "../turn/turn";

type Cell = "" | "x" | "o";

interface ICell {
  value: Cell;
  isActive: boolean;
  isWinner: boolean;
  x: number;
  y: number;
}

function App() {
  const size = 3; //tmp
  const [field, setField] = useState(initField(size));
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState("");

  function initField(size: number) {
    const array = [];
    for (let i = 0; i < size; i++) {
      const arr = [];
      for (let j = 0; j < size; j++) {
        arr.push({ value: "", isActive: false, isWinner: false, x: j, y: i });
      }
      array.push(arr);
    }
    return array;
  }

  function checkWin(array: ICell[][]) {
    const rows = array;
    const columns = array.map((arr, arrIndex) =>
      array.map((item) => item[arrIndex])
    );
    const diagonal = array.map((item, index) => item[index]);
    const diagonal_reversed = array.map(
      (item, index, arr) => item[arr.length - 1 - index]
    );
    let winningCells: number[][] = [];
    let winner = "";
    const isWon = [rows, columns, diagonal, diagonal_reversed].some(
      (gridArray) => {
        if (gridArray.every((entity) => !Array.isArray(entity))) {
          // diagonals
          const gridArr = gridArray as ICell[];
          const isEqual = gridArr.every(
            (item) => item.value !== "" && item.value === gridArr[0].value
          );
          if (isEqual) {
            winningCells = gridArr.map((item) => [item.x, item.y]);
            winner = gridArr[0].value === "x" ? "Player x" : "Player o";
          }

          return isEqual;
        } else {
          // columns, rows
          const gridArr = gridArray as ICell[][];
          const isEqual = gridArr.some((arr) =>
            arr.every((item) => {
              const isLineEqual =
                item.value !== "" && item.value === arr[0].value;
              if (isLineEqual) {
                winningCells = arr.map((item) => [item.x, item.y]);
                winner = item.value === "x" ? "Player x" : "Player o";
              }
              return isLineEqual;
            })
          );
          return isEqual;
        }
      }
    );
    if (isWon) {
      setWinner(winner);
      setField((prev) => {
        const array = prev.map((item, index) =>
          item.map((cell, cellIndex) => {
            if (
              winningCells.some(
                (winningCell) =>
                  winningCell[0] === cellIndex && winningCell[1] === index
              )
            ) {
              return { ...cell, isWinner: true };
            }
            return cell;
          })
        );
        return array;
      });
    }
  }

  function handleClick(row: number, column: number) {
    setField((prev) => {
      const array = prev.map((item, index) =>
        item.map((cell, cellIndex) => {
          if (row === index && column === cellIndex && cell.value === '') {
            return { ...cell, value: turn ? "x" : "o", isActive: true };
          }
          return cell;
        })
      );
      checkWin(array as ICell[][]);
      return array;
    });
    field[row][column].value === '' && setTurn((prev) => !prev);


  }

  function handleReset() {
    setField(initField(size));
    setWinner("");
    setTurn(false);
  }

  const fieldUI = field.map((item, index) =>
    item.map((cell, cellIndex) => (
      <Cell
        key={`${index} ${cellIndex}`}
        value={cell.value as Cell}
        turn={turn}
        isWinner={cell.isWinner}
        isActive={cell.isActive}
        onClick={() => handleClick(index, cellIndex)}
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
      {winner && <p>{winner} won</p>}
    </section>
  );
}

export { App };
