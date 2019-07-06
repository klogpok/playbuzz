import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './QuizList.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

interface IProps {
  quizes: Array<{ id: string; name: string }>;
  isLoading: boolean;
  fetchQuizes: Function;
}

export class QuizList extends Component<IProps, {}> {
  renderList = () => {
    return this.props.quizes.map((quiz: { id: string; name: string }) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <div>
          <h1>Quiz List</h1>
          {this.props.isLoading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderList()}</ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ quiz }) => {
  return {
    quizes: quiz.quizes,
    isLoading: quiz.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizList);
