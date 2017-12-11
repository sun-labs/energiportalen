import React, { Component } from 'react';
import Section from './Section';
import TextContent from './TextContent';
import FormSignUp from './FormSignUp';
import Popup from './Popup';
import '../styles/Sections.css';
import logo from '../../imgs/logo.png';
// import downButton from '../../imgs/downButton.png';

const ph_title = 'What is Sun Labs?';
const ph_body = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

class Section1 extends Component {

  constructor() {
    super();
    this.state = {
      popupVisible: false
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  togglePopup(e) {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  renderPopup() {
    if (this.state.popupVisible) {

      return (
        <Popup className="popup-signup" onClose={this.togglePopup}>
          <h1>SIGN UP</h1>
          <FormSignUp className="wrap-signup" {...this.props} />
        </Popup>
      );
    } else {
      return;
    }
  }

  render() {

    return (
      <Section className="section1">
        { this.renderPopup() }
        <div className="clouds"></div>
        <img className="logo" src={ logo } alt="Sun Labs Logo" />
        <div className="creat-wrap">
          <h1>SIGN UP WITH SUN LABS</h1>
          <h2>It's free and will always be for Sun Labs</h2>
          <FormSignUp {...this.props} />
        </div>
        <button id="mobile-btn-create-account" onClick={ this.togglePopup }>CREATE ACCOUNT</button>
        <TextContent title="What is Sun Labs?" body="Sun Labs dramatically improves the most important aspects of the Sun Energy experience. It introduces advanced visualisation and cloud first experience. Immersive statistics. The brightest, most colorful way to visualize energy data. And it looks every bit as powerful as it is. This is Sun Labs." />
        {/* <img className="downButton" src={downButton} alt="Down Button" /> */}
        <div className="hill"></div>
      </Section>
    );
  }

}

// const Section2 = () => {
//   return (
//     <Section className="section2">
//       <TextContent title="About Sun Labs." body="As all of Earth’s creatures live in the same home, understanding the importance of sharing has never been more vital. Identify a local solar plant, share ideas for ways to live in balance as a global community." />
//       <div className="clouds"></div>
//     </Section>
//   )
// }

// const Section3 = () => {
//   return (
//     <Section className="section3">
//       <TextContent title="Made by Sun Labs." body="With a vision that learning about the environment is the first step to preserving it. We wanted to create a platform to make the knowledge about solar energy accessible for everyone, to help people explore, understand, and celebrate the world around them. Like lessons that leave the world a better place." />
//     </Section>
//   )
// }

// const Section4 = () => {
//   return (
//     <Section className="section4">
//       <TextContent title="Partnership Sun Labs." body="We’re partnered up with public corporations and experts in global warming. It’s really about empowering every person on earth to achieve more. Connecting everyone with their and others energy data. Creating new dimensions of understanding." />
//       <div id="sunlabsLogo"></div>
//     </Section>
//   )
// }

const Sections = (props) => {
  return (
    <div className="sections">
      <Section1 {...props} />
      {/* <Section2 />
      <Section3 />
      <Section4 /> */}
    </div>
  );
}

export { ph_title, ph_body };
export default Sections;