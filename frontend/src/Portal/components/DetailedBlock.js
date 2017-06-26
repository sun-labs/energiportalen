import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from './Portal';
import '../styles/Home.css';
import '../styles/DetailedBlock.css'
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';

class DetailedBlock extends Component {
  render() {

    const { 
      name = 'Stadshuset',
      subtitle = 'Stockholm',
      image,
      block,
      dispatch,
      actions
    } = this.props;

    return (
      <div className="detailedBlock">

        <header>
          <div className="compare-wrap">
            <FacBlock title={ name } subtitle={ subtitle } fac={ image }/>
            <Link to={`${ROOT}/locations/addCompare`} className="blockk add-block">+ ADD BLOCK</Link>
          </div>
        </header>

        <div className="content-detailedBlock">
            <LineBlock {...block} actions={actions} dispatch={dispatch} />
        </div>

        <footer>
        </footer>
      </div>
    );
  }
}

export default DetailedBlock;