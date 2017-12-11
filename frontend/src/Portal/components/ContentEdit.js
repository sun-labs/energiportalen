import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import * as blockConstants from '../../constants/blockConstants';
import '../styles/react-select.css';

const c = {
  ...blockConstants
};

class ContentEdit extends Component {

  constructor() {
    super();
    this.state = {
      location: {},
      timeSpan: {},
      type: {},
    };

    this.mapNameAndIdToLabelAndValue = this.mapNameAndIdToLabelAndValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const {
      locations,
      getLocations
    } = this.props;
    if (locations.length < 1) {
      getLocations();
    }
  }

  handleChange(e = {}) {
    const {
      getUnitsFromLocation,
      addBlock
    } = this.props;

    switch(e.type) {
      case c.LOCATION:
        this.setState({
          location: {
            name: e.label,
            id: e.value
          },
          timeSpan: {},
          type: {}
        }, () => {
          getUnitsFromLocation(this.state.location);
        })
        break;
      case c.INTERVAL:
        this.setState({
          timeSpan: {
            label: e.label,
            value: e.value
          },
          type: {}
        })
        break;
      case c.BLOCK_TYPE:
        this.setState({
          type: {
            label: e.label,
            value: e.value
          }
        })
        break;
      case c.SAVE_BLOCK:
        const { timeSpan, type, location } = this.state;
        addBlock({
          timeSpan,
          blockType: type.value,
          location
        });
        break;
      default:
        break;
    }
  }

  mapNameAndIdToLabelAndValue(list = []) {
    return list.map((item) => ({ ...item, value: item.id, label: item.name }))
  }

  render() {
    const {
      locations
    } = this.props;

    const {
      location,
      type,
      timeSpan,
    } = this.state;


    return (
      <div className="blockk-add">
        <Select
          name={c.LOCATION}
          value={location.id}
          options={this.mapNameAndIdToLabelAndValue(locations)}
          placeholder="CHOOSE LOCATION"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => this.handleChange({ ...e, type: c.LOCATION })} />
        <Select
          disabled={!location.id}
          name={c.INTERVAL}
          value={timeSpan.value}
          options={c.intervalOptions}
          placeholder="TIME SPAN"
          clearable={true}
          className={`choose-time-add ${location.id ? null : 'disabled'}`}
          onChange={(e) => this.handleChange({ ...e, type: c.INTERVAL })} />
        <Select
          disabled={!timeSpan.value}
          name={c.BLOCK_TYPE}
          value={type}
          options={c.typeOptions}
          placeholder="CHOOSE BLOCK TYPE"
          clearable={true}
          className={`choose-block-add ${timeSpan.value ? null : 'disabled'}`}
          onChange={(e) => this.handleChange({ ...e, type: c.BLOCK_TYPE })} />
        <div className="button-wrapper">
          <button
            disabled={!type.value}
            onClick={(e) => this.handleChange({ ...e, type: c.SAVE_BLOCK })}
            className={`save-block-add ${type.value ? null : 'disabled'}`}>
          SAVE BLOCK
        </button>
        </div>
      </div>
    );
  }
}

ContentEdit.propTypes = {
  locations:              PropTypes.array.isRequired,
  getUnitsFromLocation:   PropTypes.func.isRequired,
  addBlock:               PropTypes.func.isRequired,
};

export default ContentEdit;