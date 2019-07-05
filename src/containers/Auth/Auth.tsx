import React, { Component, FormEvent } from 'react';
import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

interface IEmail {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: {
    required: boolean;
    email: boolean;
  };
}

interface IPassword {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: {
    required: boolean;
    minLength: number;
  };
}

interface IState {
  formControls: {
    email: IEmail;
    password: IPassword;
  };
  isFormValid: boolean;
}

export class Auth extends Component<{}, IState> {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Insert correct value',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Insert correct value',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = (event: FormEvent): void => {
    event.preventDefault();
  };

  validateControl(value: string, validation: any): boolean {
    if (!validation) {
      return true;
    }

    let isValid: boolean = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string): void => {
    const formControls = { ...this.state.formControls };
    let isFormValid: boolean = true;

    const control = this.state.formControls[controlName];
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    for (let name of Object.keys(formControls)) {
      isFormValid = formControls[name].valid && isFormValid;
    }

    this.setState({ formControls, isFormValid });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.onChangeHandler(event, controlName)
          }
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.submitHandler} className={styles.AuthForm}>
            {this.renderInputs()}
            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>
              LogIn
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
