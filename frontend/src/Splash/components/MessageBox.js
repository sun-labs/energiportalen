import React, { Component } from 'react';

class MessageBox extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('close messagebox');
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

export default MessageBox;