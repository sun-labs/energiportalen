import React, { Component } from 'react';
import '../styles/Splash.css';
import NavBar from '../components/NavBar';
import Sections from '../components/Sections';
import MessageBox from '../components/MessageBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import actions from '../../actions';
import PropTypes from 'prop-types';

class Splash extends Component {
  render() {
    const {
      signInError,
      closeAuthError,
      error,
      authSignIn,
      authSignUp,
    } = this.props;

    return (
      <div id="Splash">
        <NavBar authSignIn={authSignIn} />
        { signInError ?
          <MessageBox
            className="error"
            onClick={ () => closeAuthError()} { ...error } />
        : null }
        <Sections authSignUp={authSignUp} />
      </div>
    );
  }
}

Splash.propTypes = {
  signInError:        PropTypes.bool.isRequired,
  closeAuthError:     PropTypes.func.isRequired,
  error:              PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  signInError: state.authReducer.signInError,
  error: state.authReducer.error
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);