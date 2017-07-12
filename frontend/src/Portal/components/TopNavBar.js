import React, { Component } from 'react';
import { withRouter } from 'react-router';
import fileDownload from 'react-file-download';
import downloadImage from '../../imgs/download.png';
import PropTypes from 'prop-types';
import '../styles/TopNavBar.css';

class TopNavBar extends Component {
  render() {
    const { history } = this.props;
    const route = history.location.pathname;
    const endsWith = route.replace("/portal/locations/", "");

    return (
      <div className="top-navbar-portal">
        <p className="edit-btn">
        
        { route.includes("/portal/locations/") && endsWith.length > 0 && !isNaN(endsWith)
          ? <img 
              src={downloadImage}
              alt={'download'}
              onClick={() => {
                fileDownload("test,hello,world", 'filename.csv');
            }}/>
          : 'EDIT' }
        </p>

        <p className="profile-btn">PROFILE</p>
      </div>
    );
  }
}

TopNavBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(TopNavBar);
