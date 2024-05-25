import clsx from "clsx";
import styles from "./cell.module.scss";
import { Svg } from "../svg/svg";
import { useState } from "react";

interface ICellProps {
  value: "" | "o" | "x";
  turn: boolean;
  isWinner: boolean;
  isActive: boolean;
  onClick: () => void;
  isGameRunning: boolean;
}

function Cell(props: ICellProps) {
  const { turn, value, isWinner, isActive, onClick, isGameRunning } = props;

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
