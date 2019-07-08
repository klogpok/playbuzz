import React from 'react';
import styles from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';
import { IQuestion } from '../../models/IQuestion';
import ProgressBar from './ProgressBar/ProgressBar';

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
      <div className={styles.Question}>
        {/* <span>
          <strong>
            {answerNumber}. {quiz.question}?
          </strong>
        </span> */}
        <ProgressBar quizLength={quizLength} answerNumber={answerNumber} />
        <small>
          {answerNumber} / {quizLength}
        </small>
      </div>

      <div className={styles.image_wrapper}>
        <img src="/img/harry/1.jpg" alt="Avatar" />
        <span className={styles.question_text}>{quiz.question}</span>
      </div>

      <AnswersList answers={quiz.answers} onAnswerClick={onAnswerClick} answerState={answerState} />
    </div>
  );
};

export default ActiveQuiz;
