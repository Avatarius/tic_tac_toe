import styles from "./header.module.scss";

interface IHeaderProps {
  winner: string;
}

function Header({ winner }: IHeaderProps) {
  function displayWinner() {
    let content;
    switch (winner) {
      case "draw":
        content = "Draw!";
        break;
      case "x":
      case "o":
        content = `Player ${winner} wins!`;
        break;
      default:
        content = "Tic Tac Toe";
    }
    return <h1 className={styles.title}>{content}</h1>;
  }

  return <section className={styles.container}>{displayWinner()}</section>;
}

export { Header };
