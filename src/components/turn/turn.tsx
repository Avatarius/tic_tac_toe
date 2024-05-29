import styles from './turn.module.scss';
import { Svg } from '../svg/svg';
import clsx from 'clsx';

interface ITurnProps {
  value: boolean;
}

function Turn({value} : ITurnProps) {
  return (
    <section className={styles.container}>
      <div className={clsx({[styles.item]: true, [styles.item_left]: true, [styles.item_active]: !value})}>
        Player 1
      </div>
      <div className={clsx({[styles.item]: true, [styles.item_right]: true, [styles.item_active]: value})}>
        Player 2
      </div>
    </section>
  )
}

export {Turn};
