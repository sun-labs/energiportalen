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
    timeSpan = -1,
    title = 'TITLE',
    subtitle = 'SUBTITLE',
    from,
    to,
    removeHandle
  } = props;

  switch(blockType) {
    case c.ILLUSTRATION:
    case c.LINE:
    case c.TABLE:
      return (
        <header>
          <div className="time-wrap">
            <p className="value" alt={`${from} - ${to}`}>{ timeSpan }</p>
          </div>
          <div className="description-wrap">
            <p className="title">{ title }</p>
            <p className="subtitle">{ subtitle }</p>
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
    title,
    locationId,
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
            <li><button
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  title,
                  blockType,
                  locationId,
                  timeSpan: c.intervalOptions.find(x => x.value === c.DAY).label
              })
                }}>DAILY</button></li>
            <li><button
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  title,
                  blockType,
                  locationId,
                  timeSpan: c.intervalOptions.find(x => x.value === c.WEEK).label
              })
                }}>WEEKLY</button></li>
            <li><button
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  title,
                  blockType,
                  locationId,
                  timeSpan: c.intervalOptions.find(x => x.value === c.MONTH).label
              })
                }}>MONTHLY</button></li>
            <li><button
              onClick={() => {
                fetchLocationData({
                  interval,
                  keyId,
                  title,
                  blockType,
                  locationId,
                  timeSpan: c.intervalOptions.find(x => x.value === c.YEAR).label
              })
                }}>YEARLY</button></li>
            <li><button id="export-data">export data</button></li>
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
      title,
      subtitle,
      from,
      to,
      fetchLocationData,
      interval,
      keyId,
      locationId
    } = this.props;

    return (
      <div className={`blockk ${this.getCSSClass(blockType)}`}>
        { this.shouldRender(blockType, c.HEADER) ?
          <Header
            removeHandle={() => removeBlock(blockId)}
            blockType={blockType}
            timeSpan={timeSpan}
            title={title}
            subtitle={subtitle}
            from={from}
            to={to}
            /> : '' }

        <Content editing={ editing }>
          { children ? children : null }
        </Content>

        { this.shouldRender(blockType, c.FOOTER) ?
          <Footer
            blockType={blockType}
            fetchLocationData={fetchLocationData}
            interval={interval}
            keyId={keyId}
            title={title}
            locationId={locationId}
          /> :
          '' }
      </div>
    );
  }
}

Block.propTypes = {
  title:            PropTypes.string.isRequired,
  children:         PropTypes.oneOfType([
                      PropTypes.object,
                      PropTypes.array,
                    ]),
  editing:          PropTypes.bool.isRequired,
  className:        PropTypes.string.isRequired,

  blockType:        PropTypes.string,
  subtitle:         PropTypes.string,
  blockId:          PropTypes.number,
  removeHandle:       PropTypes.func, // TODO maybe should be required?
  to:               PropTypes.string,
  from:             PropTypes.string,
  timeSpan:         PropTypes.string,
};

export default Block;