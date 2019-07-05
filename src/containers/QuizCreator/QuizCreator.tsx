import React, { Component, FormEvent, ChangeEvent, Fragment } from 'react';
import styles from './QuizCreator.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { createControl } from '../../form/formFramework';

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

export class QuizCreator extends Component<{}, {}> {
  state = {
    quiz: [],
    formControls: createFormControls(),
  };

  submitHandler = (event: FormEvent): void => {
    event.preventDefault();
  };

  onAddQuestionHandler = () => {};

  createQuizHandler = () => {};

  changeHandler = (value, controlName) => {};

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
            onChange={(event: ChangeEvent<HTMLInputElement>):void =>
              this.changeHandler(event.target.value, controlName)
            }
          />
        </Fragment>
      );
    });
  };

  render() {
    const controls = this.renderFormControls();
    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>
          <form onSubmit={this.submitHandler}>
            <select />
            {controls}
            {/* <Button type="primary" onClick={this.onAddQuestionHandler}>
              Add Question
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Create Quiz
            </Button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
