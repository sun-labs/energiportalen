import React, { Component } from 'react';

import '../styles/Popup.css';

class Popup extends Component {

  constructor() {
    super();
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    const {
      children,
      className = '',
      onClose = this.handleClick
    } = this.props;

    return (
      <div className={`popup-bg ${className}`}>
        <div className={`popup`}>
          <div className="close" onClick={ onClose }>x</div>
          { children ? children : null }
        </div>
      </div>
    );
  }

}

export default Popup;