import clsx from "clsx";
import styles from "./cell.module.scss";
import { Svg } from "../svg/svg";
import { useState } from "react";

interface ICellProps {
  value: "" | "o" | "x";
  size: number;
  turn: boolean;
  isWinner: boolean;
  isActive: boolean;
  onClick: () => void;
  isGameRunning: boolean;
}

function Cell(props: ICellProps) {
  const { size, turn, value, isWinner, isActive, onClick, isGameRunning } =
    props;

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

  let cellSize = 150;
  let borderRadius = 35;
  if (size === 5) {
    cellSize = 130;
    borderRadius = 30;
  } else if (size === 7) {
    cellSize = 90;
    borderRadius = 25;
  }

  function displaySvgContent() {
    if (isActive) {
      return cellObj[value];
    } else {
      return cellObj[turn ? "x" : "o"];
    }
  }

  return (
    <div
      className={clsx({
        [styles.container]: true,
        [styles.container_hover]: isGameRunning,
        [styles.container_winner]: isWinner,
      })}
      onClick={onClick}
      style={{
        inlineSize: cellSize,
        blockSize: cellSize,
        borderRadius: borderRadius,
      }}
    >
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
