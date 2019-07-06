import React, { FC } from 'react';
import styles from './Select.module.css';

interface IProps {
  label: string;
  value: number;
  onChange: any;
  options: Array<{ text: string; value: number }>;
}

const Select: FC<IProps> = ({ label, value, onChange, options }) => {
  const htmlForm: string = `${label}-${Math.random()}`;

  return (
    <div className={styles.Select}>
      <label htmlFor={htmlForm}>{label}</label>
      <select id={htmlForm} value={value} onChange={onChange}>
        {options.map((option, index: number) => {
          return (
            <option value={option.value} key={option.value + index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
