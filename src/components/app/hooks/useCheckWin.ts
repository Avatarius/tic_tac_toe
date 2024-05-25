import { useState } from "react";
import { ICell } from "../../../types";

interface IUseCheckWinProps {
  field: ICell[][];
}

function copyArrayDeep(array: ICell[][]) {
  return array.map((arr) => arr.map((item) => item));
}

function checkWin(array: ICell[] | ICell[][]) {
  if (array.every(entity => Array.isArray(entity))) {
    return (array as ICell[][]).some((arr) =>
      arr.every((item) => {
        const isLineEqual =
          item.value !== "" && item.value === arr[0].value;
        return isLineEqual;
      })
    );
  } else {
    return (array as ICell[]).every(item => item.value === (array[0] as ICell).value);
  }
}

function useCheckWin(props: IUseCheckWinProps) {
  const { field } = props;
  const [isWon, setIsWon] = useState(false);
  const rows = field;
  const columns = field.map((arr, arrIndex) =>
    field.map((item) => item[arrIndex])
  );
  const diagonal = field.map((item, index) => item[index]);
  const diagonal_reversed = field.map(
    (item, index, arr) => item[arr.length - 1 - index]
  );
  setIsWon([...rows, ...columns, diagonal, diagonal_reversed].some(arr => {
    return arr.every(item => item.value === arr[0].value);
  }));
  /* const rows = array;
    const columns = array.map((arr, arrIndex) =>
      array.map((item) => item[arrIndex])
    );
    const diagonal = array.map((item, index) => item[index]);
    const diagonal_reversed = array.map(
      (item, index, arr) => item[arr.length - 1 - index]
    ); */
  return isWon;
}

export { useCheckWin };
