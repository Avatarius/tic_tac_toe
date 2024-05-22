import clsx from "clsx";
import styles from "./cell.module.scss";
import { Svg } from "../svg/svg";
import { useState } from "react";

interface ICellProps {
  value: "" | "o" | "x";
  turn: boolean;
  onClick: () => void;
}

function Cell(props: ICellProps) {
  const { turn, value, onClick } = props;

  const [isActive, setIsActive] = useState(false);

  const cellObj = {
    x: (
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 5 5 19M5 5l14 14"
      />
    ),
    o: (
      <circle
        cx="12"
        cy="12"
        r="11.5"
        fill="transparent"
        stroke="currentColor"
      />
    ),
    "": null,
  };

  function handleClick() {
    onClick();
    setIsActive(true);
  }

  function displaySvgContent() {
    if (isActive) {
      return cellObj[value];
    } else {
      return cellObj[turn ? 'x' : 'o'];
    }
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={clsx({ [styles.svg]: true, [styles.svg_active]: isActive })}
      >
        {displaySvgContent()}
      </svg>
    </div>
  );
}

export { Cell };
