import React from 'react';
import Select from 'react-select';
import '../styles/react-select.css';
import {
  LOCATION,
  UNIT,
  KEY,
  INTERVAL,
  DATE_FROM,
  DATE_TO,
  BLOCK_TYPE,
  SAVE_BLOCK,
  typeOptions,
  intervalOptions
} from '../../constants/blockConstants';

class ContentEdit extends React.Component {

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
        blockActions 
      } = this.props;
      dispatch(blockActions.getLocations());
    }
  }

  handleChange(e = {}) {
    const { blockActions, dispatch } = this.props;

    switch(e.type) {
      case LOCATION:
        this.setState({
          location: {
            name: e.label,
            id: e.value
          }
        }, () => {
          dispatch(blockActions.getUnitsFromLocation(this.state.location));
        })
        break;
      case UNIT:
        this.setState({
          unit: {
            name: e.label,
            id: e.value,
            locationId: this.state.location.id
          }
        }, () => {
          dispatch(blockActions.getKeysFromUnit(this.state.unit));
        })
        break;
      case KEY:
        this.setState({
          key: {
            name: e.label,
            id: e.value,
            unitId: this.state.unit.id
          }
        })
        break;
      case INTERVAL:
        this.setState({
          interval: {
            label: e.label,
            value: e.value
          }
        })
        break;
      case DATE_FROM:
        this.setState({
          from: e.target.value
        })
        break;
      case DATE_TO:
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
      case BLOCK_TYPE:
        this.setState({
          type: {
            label: e.label,
            value: e.value
          }
        })
        break;
      case SAVE_BLOCK:
        const { from, to, interval, unit, key, type } = this.state;
        dispatch(
          blockActions.addBlock({
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
      blockActions, 
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
          name={LOCATION}
          value={location.id}
          options={mapNameAndIdToLabelAndValue(locations)}
          placeholder="CHOOSE LOCATION"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: LOCATION })} />
        <Select
          disabled={!location.id}
          name={UNIT}
          value={unit.id}
          options={mapNameAndIdToLabelAndValue(units(location))}
          placeholder="CHOOSE UNIT"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: UNIT })} />
        <Select
          disabled={!unit.id}
          name={KEY}
          value={key.id}
          options={mapNameAndIdToLabelAndValue(keys(unit))}
          placeholder="CHOOSE KEY"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => handleChange({ ...e, type: KEY })} />
        <Select
          disabled={!key.id}
          name={INTERVAL}
          value={interval.value}
          options={intervalOptions}
          placeholder="INTERVAL"
          clearable={true}
          className="choose-time-add"
          onChange={(e) => handleChange({ ...e, type: INTERVAL })} />
        <input
          disabled={!interval.value}
          name={DATE_FROM}
          type="date"
          value={from}
          placeholder="DATE FROM"
          onChange={(e) => handleChange({ ...e, type: DATE_FROM })} />
        <input
          disabled={!from}
          name={DATE_TO}
          type="date"
          value={to}
          placeholder="DATE TO"
          onChange={(e) => handleChange({ ...e, type: DATE_TO })} />
        <Select
          disabled={!to}
          name={BLOCK_TYPE}
          value={type}
          options={typeOptions}
          placeholder="CHOOSE BLOCK TYPE"
          clearable={true}
          className="choose-block-add"
          onChange={(e) => handleChange({ ...e, type: BLOCK_TYPE })} />
        <div className="button-wrapper">
          <button
            onClick={() => dispatch(blockActions.toggleAddBlock())}
            className="cancel-block-add"
          >CANCEL
        </button>
          <button
            disabled={!type.value}
            onClick={(e) => handleChange({ ...e, type: SAVE_BLOCK })}
            className="save-block-add">
          SAVE BLOCK
        </button>
        </div>
      </div>
    );
  }
}
export default ContentEdit;