import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';

interface IProps {
  logout: Function;
}

class Logout extends Component<IProps, {}> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
