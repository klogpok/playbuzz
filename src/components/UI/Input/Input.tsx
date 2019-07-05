import React, { FC } from 'react';
import styles from './Input.module.css';

interface IProps {
  type?: string;
  label: string;
  value: string;
  onChange: any;
  errorMessage?: string;
  valid: boolean;
  touched: boolean;
  shouldValidate: boolean;
}

const isInvalid = (valid: boolean, touched: boolean, shouldValidate: boolean): boolean => {
  return !valid && shouldValidate && touched;
};

const Input: FC<IProps> = ({
  type,
  label,
  value,
  onChange,
  errorMessage,
  valid,
  touched,
  shouldValidate,
}) => {
  const inputType = type || 'text';
  const cls = [styles.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(valid, touched, shouldValidate)) {
    cls.push('invalid');
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={inputType} id={htmlFor} value={value} onChange={onChange} />
      {isInvalid(valid, touched, shouldValidate) ? (
        <span>{errorMessage || 'Please, insert correct value'}</span>
      ) : null}
    </div>
  );
};

export default Input;
