import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './QuizList.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

interface IProps {
  quizes: Array<{ id: string; name: string; imgTitle: string }>;
  isLoading: boolean;
  fetchQuizes: Function;
}

export class QuizList extends Component<IProps, {}> {
  renderList = () => {
    return this.props.quizes.map((quiz: { id: string; name: string; imgTitle: string }) => {
      return (
        <NavLink to={`/quiz/${quiz.id}`} key={quiz.id}>
          <div className={styles.card}>
            {/* <img src={`${process.env.PUBLIC_URL}/img/harry/h1.jpg alt="Avatar"`} /> */}
            <img src={`/img/${quiz.imgTitle}`} alt="Avatar" />
            <div className="container">
              <h4>
                <b>{quiz.name}</b>
              </h4>
            </div>
          </div>
        </NavLink>
      );
    });
  };

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={styles.QuizList}>
        {this.props.isLoading && this.props.quizes.length !== 0 ? (
          <Loader />
        ) : (
          <div className={styles.wrapper}>{this.renderList()}</div>
        )}
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
