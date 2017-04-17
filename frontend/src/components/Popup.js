import React from 'react';

import '../styles/Popup.css';

const Popup = ({ className, children }) => {
  var popupClass = className ? className : '';
  return (
    <div className={`popup-bg ${popupClass}`}>
      <div className={`popup`}>
      { children ? children : '' }
      </div>
    </div>
  );
}

export default Popup;