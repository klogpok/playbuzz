import React, { Component, FormEvent } from 'react';
import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export class Auth extends Component {
  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  handlerChange = () => {};

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.submitHandler} className={styles.AuthForm}>
            <Input type="email" value="" label="Email" onChange={this.handlerChange} />
            <Input type="password" value="" label="Password" onChange={this.handlerChange} />
            <Button type="success" onClick={this.loginHandler} disabled={false}>
              Log In
            </Button>
            <Button type="primary" onClick={this.registerHandler} disabled={false}>
              Log In
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
