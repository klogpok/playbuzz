import React, { Component } from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import { IQuestion } from '../../models/IQuestion';

interface IState {
  activeQuestion: number;
  answerState: any;
  isFinished: boolean;
  results: any;
  quiz: Array<IQuestion>;
}

export default class Quiz extends Component<{}, IState> {
  state = {
    activeQuestion: 0,
    answerState: null, // {[id]: 'success}
    isFinished: false,
    results: {},
    quiz: [
      {
        id: 1,
        question: 'Question 1',
        rightAnswerId: 2,
        answers: [
          { id: 1, text: 'Answer 1' },
          { id: 2, text: 'Answer 2' },
          { id: 3, text: 'Answer 3' },
          { id: 4, text: 'Answer 4' },
        ],
      },
      {
        id: 2,
        question: 'Question 2',
        rightAnswerId: 4,
        answers: [
          { id: 1, text: 'Answer 1' },
          { id: 2, text: 'Answer 2' },
          { id: 3, text: 'Answer 3' },
          { id: 4, text: 'Answer 4' },
        ],
      },
    ],
  };

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  setAnswerStateAndResults = (answerId: number, questionId: number, result: string) => {
    this.setState({
      answerState: { [answerId]: result },
      results: { ...this.state.results, [questionId]: result },
    });
  };

  onAnswerClickHandler = (answerId: number): void => {
    if (this.state.answerState) return; // Double click on answer
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setAnswerStateAndResults(answerId, question.id, 'success');
    } else {
      this.setAnswerStateAndResults(answerId, question.id, 'error');
    }

    const timeout = window.setTimeout(() => {
      if (this.isQuizFinished()) {
        this.setState({ isFinished: true });
      } else {
        this.setState({ activeQuestion: this.state.activeQuestion + 1 });
      }

      this.setState({ answerState: null });

      window.clearTimeout(timeout);
    }, 1000);
  };

  isQuizFinished = (): boolean => this.state.activeQuestion + 1 === this.state.quiz.length;

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.quizWrapper}>
          <h1>Answer to the questions</h1>
          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              quiz={{ ...this.state.quiz[this.state.activeQuestion] }}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
