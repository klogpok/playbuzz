import React from 'react';
import styles from './MenuToggle.module.css';

interface IProps {
  isOpen: boolean;
  onToggle: Function;
}

const MenuToggle: React.FC<IProps> = ({ isOpen, onToggle }) => {
  const cls = [styles.MenuToggle, 'fa'];

  if (isOpen) {
    cls.push(...['fa-times', `${styles.open}`]);
  } else {
    cls.push('fa-bars');
  }

  return <i className={cls.join(' ')} onClick={() => onToggle()} />;
};

export default MenuToggle;
