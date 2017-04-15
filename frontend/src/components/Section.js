import React, { Component } from 'react';

import '../styles/Section.css';

const title = 'What is Sun Labs?';
const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

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

export { placeholder, title };
export default Section;