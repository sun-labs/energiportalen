import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageBox extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
  }

  render() {
    const { 
      title, 
      body, 
      className = '', 
      onClick = this.handleClick 
    } = this.props;

    return (
      <div className={ `message-box ${className}` }>
        <div className="info">
          <h1 className="title">{ title }</h1>
          <p className="body">{ body }</p>
        </div>
        <div className="close" onClick={ onClick }>x</div>
      </div>
    );
  }
}

MessageBox.propTypes = {
  className:              PropTypes.string.isRequired,
  title:                  PropTypes.string.isRequired,
  body:                   PropTypes.string.isRequired,
  onClick:                PropTypes.func.isRequired,
};

export default MessageBox;