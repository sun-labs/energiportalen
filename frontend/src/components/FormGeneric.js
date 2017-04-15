import React from 'react';

const FormGeneric = ({ className, onChange, onSubmit, children }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  const handleChange = (e) => {
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
          onChange: onChange ? onChange : handleChange
        });
      // nothing, just return without modifying
      } else {
        return child;
      }
    });
  }

  return(
    <form className={ className ? className : '' } onSubmit={ onSubmit ? onSubmit : handleSubmit }>
      { children ? renderChildren(children) : '' }
    </form>
  );
}

export default FormGeneric;