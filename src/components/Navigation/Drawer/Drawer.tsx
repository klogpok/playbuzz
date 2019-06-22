import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
  { to: '/', label: 'Quiz List', exact: true },
  { to: '/auth', label: 'Auth', exact: false },
  { to: '/quiz-creator', label: 'Quiz Creator', exact: false },
];

interface IProps {
  isOpen: boolean;
  onClose: Function;
}

class Drawer extends Component<IProps, {}> {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={styles.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    const cls = [styles.Drawer];

    if (!this.props.isOpen) {
      cls.push(styles.close);
    }
    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
