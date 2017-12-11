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
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import * as blockConstants from '../../constants/blockConstants';
import * as routeConstants from '../components/Portal';

const c = {
  ...blockConstants,
  ...routeConstants
};

class Home extends Component {

  componentDidMount() {
    const {
      getLocations
    } = this.props;
    getLocations();
  }

  render() {
    const {
      locations,
      getLocations,
      addingBlock,
      toggleAddBlock,
      blocks,
      getUnitsFromLocation,
      addBlock,
      fetchData,
      fetchLocationData,
      addTableBlockRow,
      fetchSumValueData,
    } = this.props;

    return (
      <div className="content">
        <Link to={`${c.PORTAL_ROOT}/addlocation`} id="AddlocationDash" className="blockk add-block">+ ADD LOCATION</Link>
        <div className="text-block">
          <h1>FAVORITE LOCATIONS<span className="inline-button"> add location + </span></h1>
          <h2> you may save or remove your own personally defined locations for easier access. </h2>
        </div>
        <DashboardLocations
          locations={locations}
          getLocations={getLocations}
        />
        { addingBlock
          ? <AddBlock
              toggleAddBlock={toggleAddBlock}
              locations={locations}
              getUnitsFromLocation={getUnitsFromLocation}
              addBlock={addBlock}
            />
          : <div
              className="blockk add-block"
              onClick={() => toggleAddBlock()}
            >+ ADD BLOCK</div>
        }
        <div className="text-block">
            <h1>
              blocks
              <span
                className="inline-button"
                onClick={() => toggleAddBlock()}>
                add block +
              </span>
            </h1>
            <h2> These are your own personally defined blocks, you may add and remove as you like to customize your dashboard </h2>
        </div>
        <div className="block-wrap">

          {blocks.map((block) => {

            const loc = locations.find((loc) => loc.id === block.locationId);

            const blockProps = {
              ...block,
              name: loc && loc.name ? loc.name : 'TITLE',
              city: loc && loc.city ? loc.city : 'ENERGY PRODUCED'
            };

            switch(block.blockType) {
              case c.PHONE:
                return (
                  <IlluPhoneBlock
                    key={block.blockId}
                    { ...blockProps }
                    fetchSumValueData={fetchSumValueData}
                  />
                );
              case c.TABLE:
                return (
                  <TableBlock
                    key={block.blockId}
                    { ...blockProps }
                    addTableBlockRow={addTableBlockRow}
                    fetchSumValueData={fetchSumValueData}
                  />
              );
              case c.SCOOTER:
                return (
                  <IlluScooterBlock
                    key={block.blockId}
                    { ...blockProps }
                    fetchSumValueData={fetchSumValueData}
                  />
                );
              case c.LINE:
                return (
                  <LineBlock
                    key={block.blockId}
                    { ...blockProps }
                    fetchData={fetchData}
                    fetchLocationData={fetchLocationData}
                    locationId={loc ? loc.id : null}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  blocks:           PropTypes.array.isRequired,
  locations:        PropTypes.array.isRequired,
  getLocations:     PropTypes.func.isRequired,
  addingBlock:      PropTypes.bool.isRequired,
  toggleAddBlock:   PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addingBlock: state.blocksReducer.addingBlock,
    blocks: state.blocksReducer.blocks,
    locations: state.locationsReducer.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);