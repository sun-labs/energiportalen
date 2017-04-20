import React from 'react';
import { Link } from 'react-router-dom';

import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';

// COMPONENT IMPORTS
import LineBlock from './LineBlock';

const Home = () => {
  return (
    <div className="content">
      <Link to={`${ROOT}/addblock`} className="add-block block">+ ADD BLOCK</Link>

      <LineBlock/>
      <LineBlock/>
      <LineBlock/>
      <LineBlock/>
      <LineBlock/>
    </div>
  );
}

export default Home;