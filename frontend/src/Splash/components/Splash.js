import React from 'react';
import '../styles/Splash.css';
import NavBar from './NavBar';
import Sections from './Sections';
import MessageBox from './MessageBox';
import { connect } from 'react-redux';
import { closeAuthError } from '../../actions/authActions';

const Splash = ({ signInError, error, dispatch, uiP }) => {
  return (
    <div id="Splash">
      {/*<NavBar { ...uiProps } />*/}
      {/* fix uiProps */}
      <NavBar />      
      { 
        signInError &&
        <MessageBox className="error" onClick={ () => dispatch(closeAuthError())} { ...error } />
      }
      {/* fix uiProps */}
      <Sections/>
      {/*<Sections { ...uiProps } />*/}
    </div>
  );
}

const mapStateToProps = (state) => ({
  signInError: state.authReducer.signInError,
  error: state.authReducer.error
})

export default connect(mapStateToProps)(Splash);