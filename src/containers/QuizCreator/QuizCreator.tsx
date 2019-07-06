import React, { Component, FormEvent, ChangeEvent, Fragment } from 'react';
import styles from './QuizCreator.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

const createOptionControl = (numOption: number) => {
  return createControl(
    {
      label: `Option ${numOption}`,
      errorMessage: 'The value cannot be empty',
      id: numOption,
    },
    { required: true }
  );
};

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Enter a question',
        errorMessage: 'The question cannot be empty',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

interface IProps {
  quiz: any;
  createQuizQuestion: Function;
  finishCreateQuiz: Function;
}

export class QuizCreator extends Component<IProps, {}> {
  state = {
    formControls: createFormControls(),
    isFormValid: false,
    rightAnswerId: 1,
  };

  submitHandler = (event: FormEvent): void => {
    event.preventDefault();
  };

  onAddQuestionHandler = (event: MouseEvent): void => {
    event.preventDefault();

    // const quiz = [...this.state.quiz];
    // const index = quiz.length + 1;
    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      formControls: createFormControls(),
      isFormValid: false,
      rightAnswerId: 1,
    });
  };

  createQuizHandler = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      formControls: createFormControls(),
      isFormValid: false,
      rightAnswerId: 1,
    });

    this.props.finishCreateQuiz();
  };

  changeHandler = (value: string, controlName: string) => {
    const formControls = { ...this.state.formControls };
    const control = this.state.formControls[controlName];
    let isFormValid: boolean = true;

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    isFormValid = validateForm(formControls);

    this.setState({ formControls, isFormValid });
  };

  selectChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ rightAnswerId: +event.target.value });
  };

  renderSelect = () => {
    return (
      <Select
        label="Select correct answer"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 },
        ]}
      />
    );
  };

  renderFormControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              this.changeHandler(event.target.value, controlName)
            }
          />
        </Fragment>
      );
    });
  };

  render() {
    const controls = this.renderFormControls();
    const select = this.renderSelect();
    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>
          <form onSubmit={this.submitHandler}>
            {controls}
            {select}
            <Button
              type="primary"
              onClick={this.onAddQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add Question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Create Quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.create.quiz,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreator);
