import React, { Component } from 'react';
import { API_AUTH } from '../assets/APIRoutes';

class FormAuth extends Component {

  handleSubmit(e) {
    // TODO send ajax request to backend
    e.preventDefault();
    console.log(API_AUTH);
  }

  handleChange(e) {
    // TODO store in state
    console.log(e.target.value);
  }

  /*
  * Bind each input-child passed into this component to the
  *  function that handles changes and stores state.
  * Ex: 
  *   <input type="text" /> 
  *   converts to 
  *   <input type="text" onchange="handleChange" />
  */
  renderChildren(children) {
    return React.Children.map(children, (child) => {
      // does the current element contain an array of subelements? recursive call.
      if(child.props && child.props.children && typeof child.props.children === 'object') {
        return React.cloneElement(child, {
          children: this.renderChildren(child.props.children)
        });
      // is the element of type input? add onChange listener
      } else if(child.type === 'input') {
        return React.cloneElement(child, {
          onChange: this.handleChange
        });
      // nothing, just return without modifying
      } else {
        return child;
      }
    });
  }

  render() {
    const className = this.props.className ? this.props.className : undefined;
    return(
        <form className={ className } onSubmit={ this.handleSubmit }>
          { this.renderChildren(this.props.children) }
        </form>
    );
  }

}

export default FormAuth;