import React, { Component } from 'react';
import Select from 'react-select';
import '../styles/react-select.css';
import * as blockConstants from '../../constants/blockConstants';

const c = {
  ...blockConstants
};

class ContentEdit extends Component {

  constructor() {
    super();
    this.state = {
      location: {},
      unit: {},
      key: {},
      from: '',
      to: '',
      interval: {},
      type: {},
    };

    this.mapNameAndIdToLabelAndValue = this.mapNameAndIdToLabelAndValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.locations.length < 1) {
      const { 
        dispatch, 
        actions 
      } = this.props;
      dispatch(actions.getLocations());
    }
  }

  handleChange(e = {}) {
    const { actions, dispatch } = this.props;

    switch(e.type) {
      case c.LOCATION:
        this.setState({
          location: {
            name: e.label,
            id: e.value
          }
        }, () => {
          dispatch(actions.getUnitsFromLocation(this.state.location));
        })
        break;
      case c.UNIT:
        this.setState({
          unit: {
            name: e.label,
            id: e.value,
            locationId: this.state.location.id
          }
        }, () => {
          dispatch(actions.getKeysFromUnit(this.state.unit));
        })
        break;
      case c.KEY:
        this.setState({
          key: {
            name: e.label,
            id: e.value,
            unitId: this.state.unit.id
          }
        })
        break;
      case c.INTERVAL:
        this.setState({
          interval: {
            label: e.label,
            value: e.value
          }
        })
        break;
      case c.DATE_FROM:
        this.setState({
          from: e.target.value
        })
        break;
      case c.DATE_TO:
        const _from = new Date(this.state.from);
        const _to = new Date(e.target.value);
        if (_to - _from > 0) {
          this.setState({
            to: e.target.value
          })
        } else {
          // TODO
          // display error
        }
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
        const { from, to, interval, unit, key, type } = this.state;
        dispatch(
          actions.addBlock({
            from,
            to,
            interval: interval.value,
            unitId: unit.id,
            keyId: key.id,
            blockType: type.value
          }));
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
      actions, 
      dispatch,
      locations = []
    } = this.props;

    const {
      location,
      type,
      interval,
      unit,
      key,
      from,
      to,
    } = this.state;

    const {
      mapNameAndIdToLabelAndValue,
      handleChange
    } = this;

    const units = (location = {}) => {
      const loc = locations.find((l) => l.id === location.id);
      return loc ? ( loc.units ) : [];
    }

    const keys = (unit = {}) => {
      const loc = locations.find((l) => l.id === unit.locationId);
      const uni = loc ? loc.units.find((u) => u.id === unit.id) : {};
      return uni.keys ? uni.keys : [];
    }

    return (
      <div className="blockk-add">
        <Select
          name={c.LOCATION}
          value={location.id}
          options={mapNameAndIdToLabelAndValue(locations)}
          placeholder="CHOOSE c.LOCATION"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: c.LOCATION })} />
        <Select
          disabled={!location.id}
          name={c.UNIT}
          value={unit.id}
          options={mapNameAndIdToLabelAndValue(units(location))}
          placeholder="CHOOSE c.UNIT"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: c.UNIT })} />
        <Select
          disabled={!unit.id}
          name={c.KEY}
          value={key.id}
          options={mapNameAndIdToLabelAndValue(keys(unit))}
          placeholder="CHOOSE c.KEY"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: c.KEY })} />
        <Select
          disabled={!key.id}
          name={c.INTERVAL}
          value={interval.value}
          options={c.intervalOptions}
          placeholder="c.INTERVAL"
          clearable={true}
          className="choose-time-add"
          onChange={(e) => handleChange({ ...e, type: c.INTERVAL })} />
        <input
          disabled={!interval.value}
          name={c.DATE_FROM}
          type="date"
          value={from}
          placeholder="DATE FROM"
          onChange={(e) => handleChange({ ...e, type: c.DATE_FROM })} />
        <input
          disabled={!from}
          name={c.DATE_TO}
          type="date"
          value={to}
          placeholder="DATE TO"
          onChange={(e) => handleChange({ ...e, type: c.DATE_TO })} />
        <Select
          disabled={!to}
          name={c.BLOCK_TYPE}
          value={type}
          options={c.typeOptions}
          placeholder="CHOOSE BLOCK TYPE"
          clearable={true}
          className="choose-block-add"
          onChange={(e) => handleChange({ ...e, type: c.BLOCK_TYPE })} />
        <div className="button-wrapper">
          <button
            onClick={() => dispatch(actions.toggleAddBlock())}
            className="cancel-block-add"
          >CANCEL
        </button>
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
export default ContentEdit;