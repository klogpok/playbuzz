import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ quizLength, answerNumber }) => {
  const dotsRender = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
      let cls = null;
      if (index + 1 < answerNumber) cls = `${styles.past}`;
      else if (index + 1 === answerNumber) cls = `${styles.current}`;

      return <div className={`${styles.dot} ${cls}`} key={index} />;
    });
  };
  return <div className={styles.dots_container}>{dotsRender()}</div>;
};

export default ProgressBar;
