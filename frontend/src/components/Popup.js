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
    var popupClass = this.props.className ? this.props.className : '';
    var onClick = this.props.onClose ? this.props.onClose : this.handleClick;
    var { children } = this.props;
    return (
      <div className={`popup-bg ${popupClass}`}>
        <div className={`popup`}>
          <div className="close" onClick={ onClick }>x</div>
          {children ? children : ''}
        </div>
      </div>
    );
  }

}

export default Popup;