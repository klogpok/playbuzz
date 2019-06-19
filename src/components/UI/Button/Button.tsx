import React from 'react';
import styles from './Button.module.css';

interface IProps {
  onClick: Function;
  disabled: boolean;
  type: string;
}

const Button: React.FC<IProps> = ({ children, onClick, disabled, type }) => {
  const cls = [styles.Button, styles[type]];
  return (
    <button onClick={() => onClick()} disabled={disabled} className={cls.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
