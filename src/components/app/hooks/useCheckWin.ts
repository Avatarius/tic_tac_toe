import { ICell } from "../../../types";



interface IWinningCells {
  x: number;
  y: number;
}


function useCheckWin(array: ICell[][]) {
  let winningCells: IWinningCells[] = [];
  let winner = '';
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
        winningCells = arr.map(item => ({x: item.x, y: item.y}));
        winner = arr[0].value;
      }
      return isLineEqual;
    }
  );
  const isDraw = array.every(arr => arr.every(item => item.value !== ''));

  return {isWon, isDraw, winningCells, winner};
}

export { useCheckWin };
