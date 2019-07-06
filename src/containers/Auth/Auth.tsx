import React, { Component, FormEvent } from 'react';
import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validate, validateForm } from '../../form/formFramework';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

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

interface IProps {
  auth: Function;
}

export class Auth extends Component<IProps, IState> {
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

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );

    // try {
    //   const response = await axios.post(
    //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1EgtAubI8bzqe1iaaP0u9eDa6634L1LY',
    //     authData
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  submitHandler = (event: FormEvent): void => {
    event.preventDefault();
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string): void => {
    const formControls = { ...this.state.formControls };
    let isFormValid: boolean = true;

    const control = this.state.formControls[controlName];
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;

    isFormValid = validateForm(formControls);
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

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
