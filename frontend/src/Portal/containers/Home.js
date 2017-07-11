import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../actions';
import LineBlock from '../components/LineBlock';
import TableBlock from '../components/TableBlock';
import IlluPhoneBlock from '../components/IlluPhoneBlock';
import IlluScooterBlock from '../components/IlluScooterBlock';
import DashboardLocations from '../components/DashboardLocations'
import AddBlock from '../components/AddBlock';
import '../styles/Home.css';
import * as blockConstants from '../../constants/blockConstants';
import * as routeConstants from '../components/Portal';

const c = {
  ...blockConstants,
  ...routeConstants
};

class Home extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.getLocations());
  }

  render() {
    const { 
      addingBlock, 
      blocks,
      dispatch,
      locations
    } = this.props;

    const {
      toggleAddBlock,
    } = actions;

    return (
      <div className="content">
        <Link to={`${c.PORTAL_ROOT}/addlocation`} id="AddlocationDash" className="blockk add-block">+ ADD LOCATION</Link>
        <div className="text-block">
          <h1>FAVORITE LOCATIONS<span className="inline-button"> add location + </span></h1>
          <h2> you may save or remove your own personally defined locations for easier access. </h2>
        </div>
        <DashboardLocations 
          actions={actions} 
          dispatch={dispatch} 
          locations={locations} 
        />
        { addingBlock
          ? <AddBlock 
              actions={actions}
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

          {blocks.map((block) => {
            const blockProps = {
              ...block,
              dispatch,
              actions,
            };
            
            switch(block.blockType) {
              case c.PHONE:
                return <IlluPhoneBlock key={block.blockId} { ...blockProps }/>
              case c.TABLE:
                return <TableBlock key={block.blockId} { ...blockProps } />
              case c.SCOOTER:
                return <IlluScooterBlock key={block.blockId} { ...blockProps }/>
              case c.LINE:
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
    locations: state.locationsReducer.locations
  }
}

export default connect(mapStateToProps)(Home);