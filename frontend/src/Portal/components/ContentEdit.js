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
      interval: {},
      type: {},
    };

    this.mapNameAndIdToLabelAndValue = this.mapNameAndIdToLabelAndValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { props } = this;
    if (props.locations.length < 1) {
      props.getLocations();
    }
  }

  handleChange(e = {}) {
    const { props } = this;

    switch(e.type) {
      case c.LOCATION:
        this.setState({
          location: {
            name: e.label,
            id: e.value
          },
          interval: {},
          type: {}
        }, () => {
          props.getUnitsFromLocation(this.state.location);
        })
        break;
      case c.INTERVAL:
        this.setState({
          interval: {
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
        const { interval, type } = this.state;
        props.addBlock({
          interval: interval.value,
          blockType: type.value
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
      props,
      mapNameAndIdToLabelAndValue,
      handleChange
    } = this;

    const {
      location,
      type,
      interval,
    } = this.state;


    return (
      <div className="blockk-add">
        <Select
          name={c.LOCATION}
          value={location.id}
          options={mapNameAndIdToLabelAndValue(props.locations)}
          placeholder="CHOOSE LOCATION"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: c.LOCATION })} />
        <Select
          disabled={!location.id}
          name={c.INTERVAL}
          value={interval.value}
          options={c.intervalOptions}
          placeholder="INTERVAL"
          clearable={true}
          className="choose-time-add"
          onChange={(e) => handleChange({ ...e, type: c.INTERVAL })} />
        <Select
          disabled={!interval.value}
          name={c.BLOCK_TYPE}
          value={type}
          options={c.typeOptions}
          placeholder="CHOOSE BLOCK TYPE"
          clearable={true}
          className="choose-block-add"
          onChange={(e) => handleChange({ ...e, type: c.BLOCK_TYPE })} />
        <div className="button-wrapper">
          <button
            disabled={!type.value}
            onClick={(e) => handleChange({ ...e, type: c.SAVE_BLOCK })}
            className="save-block-add">
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