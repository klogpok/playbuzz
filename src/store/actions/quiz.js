/*import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

export const fetchQuizes = () => {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Qiuz ${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError());
    }
  };
};

export const fetchQuizById = quizId => {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      //const id = this.props.match.params as { id: string };
      const response = await axios(`/quizes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
};

export const fetchQuizSuccess = quiz => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz,
  };
};

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START,
  };
};

export const fetchQuizesSuccess = quizes => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes,
  };
};

export const fetchQuizesError = error => {
  return {
    type: FETCH_QUIZES_ERROR,
    payload: error,
  };
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    payload: {
      answerState,
      results,
    },
  };
};

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ,
  };
};

export const quizNextQuestion = number => {
  return {
    type: QUIZ_NEXT_QUESTION,
    payload: number,
  };
};

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY,
  };
};

export const quizAnswerClick = answerId => {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({ [answerId]: 'success' }, results));
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }
      window.clearTimeout(timeout);
    }, 1000);
  };
};

// export const quizAnswerClick = answerId => {
//   return (dispatch, getState) => {
//     const state = getState().quiz;
//     console.log(state);

//     if (state.answerState) {
//       const key = Object.keys(state.answerState)[0];
//       if (state.answerState[key] === 'success') {
//         return;
//       }
//     }

//     const question = state.quiz[state.activeQuestion];
//     const results = state.results;

//     if (question.rightAnswerId === answerId) {
//       if (!results[question.id]) {
//         results[question.id] = 'success';
//       }

//       dispatch(quizSetState({ [answerId]: 'success' }, results));
//     } else {
//       results[question.id] = 'error';
//       dispatch(quizSetState({ [answerId]: 'error' }, results));
//     }

//     const timeout = window.setTimeout(() => {
//       console.log(isQuizFinished(state));
//       if (isQuizFinished(state)) {
//         dispatch(finishQuiz());
//       } else {
//         dispatch(quizNextQuestion(state.activeQuestion + 1));
//       }

//       window.clearTimeout(timeout);
//     }, 1000);
//   };
// };

const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length;*/

import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE,
} from './actionTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({ [answerId]: 'success' }, results));
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }
      window.clearTimeout(timeout);
    }, 1000);
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
