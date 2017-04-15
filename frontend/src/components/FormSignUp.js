import React from 'react';
import { API_SIGNUP } from '../assets/APIRoutes';
import FormGeneric from './FormGeneric';

const FormSignUp = ({ className, children }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`[SIGN] ${API_SIGNUP}`);
  }

  const handleChange = (e) => {
    // TODO store in state
    console.log(`[SIGN][${e.target.name.toUpperCase()}] ${e.target.value}`);
  }

  return (
    <FormGeneric className={ className ? className : '' } onSubmit={ handleSubmit } onChange={ handleChange }>
      { children ? children : '' }
    </FormGeneric>
  );
}

export default FormSignUp;

