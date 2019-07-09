import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FinishedQuiz.module.css';
// import { IQuestion } from '../../models/IQuestion';
import Button from '../UI/Button/Button';

interface IProps {
  results: any;
  // quiz: Array<IQuestion>;
  quiz: any;
  onRetry: Function;
}

const FinishedQuiz: React.FC<IProps> = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  const renderResults = () => {
    return quiz.map((quizItem, index) => {
      const cls = [
        'fa',
        results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
        styles[results[quizItem.id]],
      ];

      return (
        <li key={quizItem.id}>
          <strong>{index + 1}.</strong> {quizItem.question}
          <i className={cls.join(' ')} />
        </li>
      );
    });
  };

  return (
    <div className={styles.FinishedQuiz}>
      <div className={styles.image_wrapper}>
        <img src={`/img/${quiz[quiz.length - 1].imgTitle}`} alt="" />
      </div>
      {/* <ul>{renderResults()}</ul> */}
      <p>
        {successCount} correct answers from {quiz.length - 1}
      </p>
      <div>
        <Button onClick={() => onRetry()} disabled={false} type="primary">
          retry Again
        </Button>
        <Link to="/">
          <Button onClick={() => onRetry()} disabled={false} type="primary">
            To list of quizzes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
