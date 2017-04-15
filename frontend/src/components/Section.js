import React, { Component } from 'react';

import '../styles/Section.css';

const ph_title = 'What is Sun Labs?';
const ph_body = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

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

export { ph_body, ph_title };
export default Section;