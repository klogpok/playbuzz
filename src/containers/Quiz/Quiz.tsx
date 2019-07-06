import React, { Component } from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import { IQuestion } from '../../models/IQuestion';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

interface IProps {
  activeQuestion: number;
  answerState: any;
  isFinished: boolean;
  results: any;
  quiz: Array<IQuestion>;
  isLoading: boolean;
  fetchQuizById: Function;
  quizAnswerClick: Function;
  retryQuiz: Function;
}

class Quiz extends Component<IProps & RouteComponentProps, {}> {
  componentDidMount() {
    const id = this.props.match.params as { id: string };
    this.props.fetchQuizById(id.id);
  }

  componentWillMount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.quizWrapper}>
          <h1>Answer to the questions</h1>

          {this.props.isLoading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              quiz={this.props.quiz[this.props.activeQuestion]}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ quiz }) => {
  return {
    activeQuestion: quiz.activeQuestion,
    answerState: quiz.answerState,
    isFinished: quiz.isFinished,
    results: quiz.results,
    quiz: quiz.quiz,
    isLoading: quiz.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
