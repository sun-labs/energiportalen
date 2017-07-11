import React from 'react';
import { withRouter } from 'react-router';
import fileDownload from 'react-file-download';
import downloadImage from '../../imgs/download.png';
import '../styles/TopNavBar.css';

const TopNavBar = ({ history }) => {
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

export default withRouter(TopNavBar);
