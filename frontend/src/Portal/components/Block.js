import React, { Component } from 'react';
import ContentEdit from './ContentEdit';
import * as blockConstants from '../../constants/blockConstants';
import PropTypes from 'prop-types';
import '../styles/Block.css';
import cross from '../../imgs/cross.svg';

const c = {
  ...blockConstants
};

const Header = (props) => {
  const {
    blockType = c.DEFAULT,
    timeSpan = c.DAY,
    name = 'NAME',
    city = 'CITY',
    removeHandle
  } = props;

  const placeHolderSubTitle = 'ENERGY PRODUCED';

  switch(blockType) {
    case c.ILLUSTRATION:
    case c.LINE:
    case c.TABLE:
      return (
        <header>
          <div className="time-wrap">
            <p className="value">{ timeSpan }</p>
          </div>
          <div className="description-wrap">
            <p className="name">{ name }, { city }</p>
            <p className="city">{ placeHolderSubTitle }</p>
          </div>
          <div className="tool-wrap">
            <img className="img-cross" alt="" src={ cross } onClick={ removeHandle }/>
          </div>
        </header>
      );
    default:
    return;
  }
}

const Footer = (props) => {
  const {
    blockType,
    fetchLocationData,
    interval,
    keyId,
    name,
    locationId,
    timeSpan,
    value
  } = props;

  switch(blockType) {
    case c.ADD:
      return (
        <div>
        </div>
      );
    case c.ILLUSTRATION:
    case c.LINE:
    case c.TABLE:
      return (
        <footer>
          <ul>
            {/* <li><button
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  name,
                  blockType,
                  locationId,
                  timeSpan: c.intervalOptions.find(x => x.value === c.DAY).label
              })
                }}>DAILY</button></li> */}
            <li><button
              className={timeSpan === c.WEEK ? 'active-button' : ''}
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  name,
                  blockType,
                  locationId,
                  timeSpan: c.WEEK
              })
                }}>WEEKLY</button></li>
            <li><button
              className={timeSpan === c.MONTH ? 'active-button' : ''}
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  name,
                  blockType,
                  locationId,
                  timeSpan: c.MONTH
              })
                }}>MONTHLY</button></li>
            <li><button
              className={timeSpan === c.YEAR ? 'active-button' : ''}
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  name,
                  blockType,
                  locationId,
                  timeSpan: c.YEAR
              })
                }}>YEARLY</button></li>
           { value && typeof value === 'number' ?
              <li>
                <div className="sum-production">
                  ENERGY PRODUCED: { value ? value.toFixed(0) : null } kWh
                </div>
              </li> : null }
          </ul>
        </footer>
      );
    default:
    return;
  }
}

class Content extends Component {

  render() {

    const {
      blockType,
      children,
      editing,
      locations,
      getUnitsFromLocation,
      addBlock
    } = this.props;
    let content = children;

    if(editing) {
      switch(blockType) {
        case c.ILLUSTRATION:
        case c.LINE:
        case c.TABLE:
          content = (
            <ContentEdit
              locations={locations}
              getUnitsFromLocation={getUnitsFromLocation}
              addBlock={addBlock}
            />
          );
        break;
        default:
          break;
      }
    }

    return (
      <div className="content">
        { content }
      </div>
    );
  }
}

class Block extends Component {

  constructor() {
    super();
    this.state = {
      editing: false,
    }
    this.shouldRender = this.shouldRender.bind(this);
    this.getCSSClass = this.getCSSClass.bind(this);
  }

  shouldRender(blockType, contentType) {
    switch(blockType) {
      case c.ADD:
        return false;
      case c.ILLUSTRATION:
      case c.LINE:
      case c.TABLE:
        return true;
      default:
        return false;
    }
  }

  getCSSClass(blockType) {
    const {
      className
    } = this.props;

    switch(blockType) {
      case c.LINE:
        return "blockk-line";
      case c.TABLE:
        return "blockk-table";
      default: // illustration blocks
        return className;
    }
  }

  render() {

    const {
      removeBlock,
      children,
      blockType,
      editing,
      blockId = null,
      timeSpan,
      name,
      city,
      fetchLocationData,
      interval,
      keyId,
      locationId,
      value
    } = this.props;

    return (
      <div className={`blockk ${this.getCSSClass(blockType)}`}>
        { this.shouldRender(blockType, c.HEADER) ?
          <Header
            removeHandle={() => removeBlock(blockId)}
            blockType={blockType}
            timeSpan={timeSpan}
            name={name}
            city={city}
            /> : '' }

        <Content editing={ editing }>
          { children ? children : null }
        </Content>

        { this.shouldRender(blockType, c.FOOTER) ?
          <Footer
            blockType={blockType}
            fetchLocationData={fetchLocationData}
            interval={interval}
            timeSpan={timeSpan}
            keyId={keyId}
            name={name}
            locationId={locationId}
            value={value}
          /> :
          '' }
      </div>
    );
  }
}

Block.propTypes = {
  name:            PropTypes.string.isRequired,
  children:         PropTypes.oneOfType([
                      PropTypes.object,
                      PropTypes.array,
                    ]),
  editing:          PropTypes.bool.isRequired,
  className:        PropTypes.string.isRequired,

  blockType:        PropTypes.string,
  city:         PropTypes.string,
  blockId:          PropTypes.number,
  removeHandle:       PropTypes.func, // TODO maybe should be required?
  timeSpan:         PropTypes.string,
};

export default Block;