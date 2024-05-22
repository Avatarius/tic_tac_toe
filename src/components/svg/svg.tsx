import styles from "./svg.module.scss";

function Svg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.svg}>
      <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="currentColor"/>
      {/* <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 5 5 19M5 5l14 14"/> */}
    </svg>
  );
}

export { Svg };
