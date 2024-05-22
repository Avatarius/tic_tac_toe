import { useState, CSSProperties } from "react";
import { Cell } from "../cell/cell";
import styles from "./app.module.scss";
import { Turn } from "../turn/turn";

type Cell = "" | "x" | "o";

function App() {
  const size = 3; //tmp
  const [field, setField] = useState(initField(size));
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState("");


  function initField(size: number) {
    const array = [];
    for (let i = 0; i < size; i++) {
      array[i] = Array.from(Array(size).fill(''));
    }
    return array;

  }

  function checkWin(array: string[][]) {
    const rows = array;
    const columns = array.map((arr, arrIndex) =>
      array.map((item) => item[arrIndex])
    );
    const diagonal = array.map((item, index) => item[index]);
    const diagonal_reversed = array.map(
      (item, index, arr) => item[arr.length - 1 - index]
    );
    const winningCells = [];
    const isWon = [rows, columns, diagonal, diagonal_reversed].some(
      (gridArray) => {
        if (gridArray.every((entity) => typeof entity === "string")) {
          /* return gridArray.every(
            (item) => item !== "" && item === gridArray[0]
          ); */
          const isEqual = gridArray.every(
            (item) => item !== "" && item === gridArray[0]
          );
          if (isEqual) {
            console.log(gridArray);
          }
          return isEqual;
        } else {
          return (gridArray as string[][]).some((arr) =>
            arr.every((item) => item !== "" && item === arr[0])
          );
        }
      }
    );
    if (isWon) setWinner("player 1");
  }

  function handleClick(row: number, column: number) {
    setField((prev) => {
      const array = prev.map((item, index) =>
        item.map((cell, cellIndex) => {
          if (row === index && column === cellIndex) {
            return turn ? "x" : "o";
          }
          return cell;
        })
      );
      checkWin(array);
      return array;
    });
    setTurn((prev) => !prev);
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
        value={cell as Cell}
        turn={turn}
        onClick={() => handleClick(index, cellIndex)}
      />
    ))
  );
  return (
    <section className={styles.container} style={{'--size': size} as CSSProperties}>
      <Turn value={turn} />
      <div className={styles.grid}>{fieldUI}</div>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
      {winner && <p>Player won</p>}
    </section>
  );
}

export { App };
