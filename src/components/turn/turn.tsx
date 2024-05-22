import styles from './turn.module.scss';
import { Svg } from '../svg/svg';
import clsx from 'clsx';

interface ITurnProps {
  value: boolean;
}

function Turn({value} : ITurnProps) {
  return (
    <div className={styles.container}>
      <div className={clsx({[styles.item]: true, [styles.item_circle]: true, [styles.item_active]: !value})}>
      </div>
      <div className={clsx({[styles.item]: true, [styles.item_cross]: true, [styles.item_active]: value})}>
      </div>
    </div>
  )
}

export {Turn};
