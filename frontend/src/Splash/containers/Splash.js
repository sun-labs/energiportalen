import React from 'react';
import '../styles/Splash.css';
import NavBar from '../components/NavBar';
import Sections from '../components/Sections';
import MessageBox from '../components/MessageBox';
import { connect } from 'react-redux';
import actions from '../../actions';

console.log('actions', actions);

const Splash = ({ signInError, error, dispatch }) => {
  return (
    <div id="Splash">
      <NavBar dispatch={dispatch} actions={actions}/>      
      { 
        signInError &&
        <MessageBox className="error" onClick={ () => dispatch(actions.closeAuthError())} { ...error } />
      }
      <Sections dispatch={dispatch} actions={actions} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  signInError: state.authReducer.signInError,
  error: state.authReducer.error
})

export default connect(mapStateToProps)(Splash);