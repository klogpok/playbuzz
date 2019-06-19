import React from 'react';
import styles from './AnswerItem.module.css';

interface IProps {
  answer: { text: string; id: number };
  onAnswerClick: Function;
  answerState: number | null;
}

const AnswerItem = ({ answer, onAnswerClick, answerState }: IProps) => {
  const cls = [styles.AnswerItem];

  if (answerState) {
    cls.push(styles[answerState]);
  }

  return (
    <li className={cls.join(' ')} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

export default AnswerItem;
