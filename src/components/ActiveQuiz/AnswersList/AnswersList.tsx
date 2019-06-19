import React from 'react';
import styles from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

interface IProps {
  onAnswerClick: Function;
  answers: { id: number; text: string }[];
  answerState: any;
}

const AnswersList = ({ answers, onAnswerClick, answerState }: IProps) => {
  return (
    <ul className={styles.AnswersList}>
      {answers.map((answer: { id: number; text: string }) => {
        return (
          <AnswerItem
            key={answer.id}
            answer={answer}
            onAnswerClick={onAnswerClick}
            answerState={answerState ? answerState[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
