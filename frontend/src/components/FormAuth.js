import React from 'react';
import { API_AUTH } from '../assets/APIRoutes';
import FormGeneric from './FormGeneric';

const FormAuth = ({ className, children }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`[AUTH] ${API_AUTH}`);
  }

  const handleChange = (e) => {
    console.log(`[AUTH][${e.target.name.toUpperCase()}] ${e.target.value}`);
  }

  /*
  * Bind each input-child passed into this component to the
  *  function that handles changes and stores state.
  * Ex: 
  *   <input type="text" /> 
  *   converts to 
  *   <input type="text" onchange="handleChange" />
  */
  const renderChildren = (children) => {
    return React.Children.map(children, (child) => {
      // does the current element contain an array of subelements? recursive call.
      if(child.props && child.props.children && typeof child.props.children === 'object') {
        return React.cloneElement(child, {
          children: renderChildren(child.props.children)
        });
      // is the element of type input? add onChange listener
      } else if(child.type === 'input') {
        return React.cloneElement(child, {
          onChange: handleChange
        });
      // nothing, just return without modifying
      } else {
        return child;
      }
    });
  }

  return (
    <FormGeneric className={ className ? className : '' } onSubmit={ handleSubmit } onChange={ handleChange }>
      { children ? renderChildren(children) : '' }
    </FormGeneric>
  );
}

export default FormAuth;