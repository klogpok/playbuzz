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
  quizName?: string;
}

const ActiveQuiz = ({
  quiz,
  quizLength,
  onAnswerClick,
  answerNumber,
  answerState,
  quizName,
}: IProps) => {
  return (
    <div className={styles.ActiveQuiz}>
      <h2>{quizName}</h2>
      <div className={styles.Question}>
        <ProgressBar quizLength={quizLength} answerNumber={answerNumber} />
        <small>
          {answerNumber} / {quizLength}
        </small>
      </div>
      <div className={styles.image_wrapper}>
        <img src={`/img/${quiz.imageSrc}`} alt="Avatar" />
        <span className={styles.question_text}>{quiz.question}</span>
      </div>

      <AnswersList answers={quiz.answers} onAnswerClick={onAnswerClick} answerState={answerState} />
    </div>
  );
};

export default ActiveQuiz;
