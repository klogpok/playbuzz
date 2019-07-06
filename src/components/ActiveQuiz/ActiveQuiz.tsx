import React from 'react';
import styles from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';
import { IQuestion } from '../../models/IQuestion';

interface IProps {
  quiz: IQuestion;
  onAnswerClick: Function;
  quizLength: number;
  answerNumber: number;
  answerState: any;
}

const ActiveQuiz = ({ quiz, quizLength, onAnswerClick, answerNumber, answerState }: IProps) => {
  return (
    <div className={styles.ActiveQuiz}>
      <p className={styles.Question}>
        <span>
          <strong>
            {answerNumber}. {quiz.question}?
          </strong>
        </span>
        <small>
          {answerNumber} from {quizLength}
        </small>
      </p>

      {/* <img src="#" alt="xxx" /> */}

      <AnswersList answers={quiz.answers} onAnswerClick={onAnswerClick} answerState={answerState} />
    </div>
  );
};

export default ActiveQuiz;
