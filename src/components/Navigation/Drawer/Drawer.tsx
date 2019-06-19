import React, { Component } from 'react';
import styles from './Drawer.module.css';

const links = [1, 2, 3];

interface IProps {
  isOpen: boolean;
}

class Drawer extends Component<IProps, {}> {
  renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
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
      <nav className={cls.join(' ')}>
        <ul>{this.renderLinks()}</ul>
      </nav>
    );
  }
}

export default Drawer;
