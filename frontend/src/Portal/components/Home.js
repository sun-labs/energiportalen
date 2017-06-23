import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { 
//   fetchSumValueData,
//   fetchData,
//   toggleAddBlock,
//   addTableBlockRow,
//   toggleEditBlock,
//   getLocations
// } from '../../actions/blockActions';

import * as blockActions from '../../actions/blockActions';
import {
  PHONE,
  TABLE,
  SCOOTER,
  LINE
} from '../../constants/blockConstants';
import { ROOT } from './Portal';
import LineBlock from './LineBlock';
import TableBlock from './TableBlock';
import IlluPhoneBlock from './IlluPhoneBlock';
import IlluScooterBlock from './IlluScooterBlock';
import FacDashBlock from './DashboardLocations'
import AddBlock from './AddBlock';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      addBlock: false,
      tempStuffForPresentation: false
    }
    this.addNewBlock = this.addNewBlock.bind(this);
  }

  addNewBlock() {
    // TODO
    // when adding the new block, --> ADD the new block in here

    // TEMP FOR PRES
    if (this.state.addBlock) {
      this.setState({
        addBlock: !this.state.addBlock,
        tempStuffForPresentation: true
      })
    } else {
      this.setState({
        addBlock: !this.state.addBlock
      })
    }
  }

  render() {
    // const { addBlock } = this.state;
    const { 
      addingBlock, 
      blocks,
      dispatch,
      locations
    } = this.props;

    const {
      toggleAddBlock,
    } = blockActions;

    return (
      <div className="content">
        <Link to={`${ROOT}/addlocation`} id="AddlocationDash" className="blockk add-block">+ ADD LOCATION</Link>
        <div className="text-block">
          <h1>FAVORITE LOCATIONS<span className="inline-button"> add location + </span></h1>
          <h2> you may save or remove your own personally defined locations for easier access. </h2>
        </div>
        <FacDashBlock/>
        { addingBlock
          ? <AddBlock 
              blockActions={blockActions}
              dispatch={dispatch}
              locations={locations}
            />
          : <div 
              className="blockk add-block"
              onClick={() => dispatch(toggleAddBlock())}
            >+ ADD BLOCK</div>
        }
        <div className="text-block">
            <h1>blocks <span className="inline-button"> add block + </span></h1>
            <h2> These are your own personally defined blocks, you may add and remove as you like to customize your dashboard </h2>
        </div>
        <div className="block-wraper">

          {this.state.tempStuffForPresentation ? <LineBlock/> : ''}
          
          {blocks.map((block) => {
            const blockProps = {
              ...block,
              dispatch,
              blockActions,
            };
            
            switch(block.blockType) {
              // TEMP DO BETTER
              case PHONE:
                return <IlluPhoneBlock key={block.blockId} { ...blockProps }/>
              case TABLE:
                return <TableBlock key={block.blockId} { ...blockProps } />
              case SCOOTER:
                return <IlluScooterBlock key={block.blockId} { ...blockProps }/>
              case LINE:
                return <LineBlock key={block.blockId} { ...blockProps }/>
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    addingBlock: state.blocksReducer.addingBlock,
    blocks: state.blocksReducer.blocks,
    locations: state.blocksReducer.locations
  }
}

export default connect(mapStateToProps)(Home);