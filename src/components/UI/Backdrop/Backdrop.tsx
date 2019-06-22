import React from 'react';
import styles from './Backdrop.module.css';

interface IProps {
  onClick: Function;
}

const Backdrop: React.FC<IProps> = ({ onClick }) => (
  <div className={styles.Backdrop} onClick={() => onClick()} />
);

export default Backdrop;
