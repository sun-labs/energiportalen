import React, { Component } from 'react';

import '../styles/Section.css';

class Section extends Component {

  render() {
    const sectionClass = this.props.className ? this.props.className : '';
    return (
      <div className={`section ${sectionClass}`}>
        { this.props.children }
        <div className="header"></div>
        <div className="footer"></div>
      </div>
    );
  }

}

export default Section;