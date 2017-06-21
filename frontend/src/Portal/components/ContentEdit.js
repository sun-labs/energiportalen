import React from 'react';
import Select from 'react-select';
import '../styles/react-select.css';

import API from '../../API';

class ContentEdit extends React.Component {

  constructor() {
    super();
    this.state = {
      location: '',
      locationId: -1,
      type: '',
      interval: '',
      content: '',
      from: undefined,
      to: undefined,
      locationOptions: [],
      unitOptions: [],
      keyOptions: []
    };
  }

  componentWillMount() {
    // const { getBlock } = this.props;
    // if(getBlock) {
    //   const {
    //     from,
    //     to,
    //     interval,
    //     unitId,
    //     keyId,
    //     title
    //   } = getBlock();

      // this.setState({
      //   from,
      //   to,
      //   unitId,
      //   keyId,
      //   interval,
      //   location: title,
      //   locationId: title
      // })

      // console.log('props', this.props);
      const { 
        dispatch, 
        blockActions 
      } = this.props;
      dispatch(blockActions.getLocations());
    }

  handleLocationChange(e) {
    if(e) {
      this.setState({
        location : {
          label: e.label,
          value: e.value
        }
      }, () => {

        const { blockActions, dispatch } = this.props;

        dispatch(blockActions.getUnitsFromLocation(this.state.location));

      });
    } else {
      this.setState({ unitId: '', interval: '', content: '', type: '' })
    }
  }

  handleUnitChange(e) {
    if(e) {
      this.setState({
        unitId: e.value,
        unit: e.label
      }, () => {

        API.getKeysFromUnit(this.state.unitId, (res) => {
          console.log(res.data);
        this.setState({
          keyOptions: res.data.map((key, index) => {
            return {
              value: key.id,
              label: key.name
            }
          })
        })
      });

      });
    } else {
      this.setState({ keyId: '', interval: '', content: '', type: '' })
    }
  }

  handleSave(e) {
    console.log(this.state);
    // const {
    //   from,
    //   to,
    //   interval,
    //   unitId,
    //   keyId
    // } = this.state;
    // this.props.updateBlock({
    //   from,
    //   to,
    //   interval,
    //   unitId,
    //   keyId
    // });


    console.log('time to save');
  }

  render() {

    // console.log(this.props);

    const { 
      blockActions, 
      dispatch,
      locationOptions = []
    } = this.props;

    // console.log('props', this.props);

    const {
      location,
      // locationId,
      type,
      interval,
      // content,
      unitId,
      keyId,
      from,
      to
    } = this.state;

    const typeOptions = [
      { value: 'Line Chart', label: 'Line Chart' },
      { value: 'Table Chart', label: 'Table Chart' },
      { value: 'Smartphone charges', label: 'Smartphone charges' },
      { value: 'Scooter thingy', label: 'Scooter thingy' }
    ];

    const intervalOptions = [
      { value: 'raw', label: '5 sec' },
      { value: 'hour', label: '1h' },
      { value: 'day', label: '24h' },
      { value: 'month', label: '7d' },
      { value: 'year', label: '365d' }
    ];

    return (
      <div className="blockk-add">
        <Select
          name="form-field-name"
          value={location.value}
          options={locationOptions}
          placeholder="CHOOSE LOCATION"
          clearable={true}
          className="choose-loc-add"
          onChange={ this.handleLocationChange.bind(this) } />
        <Select
          name="unitId"
          value={unitId}
          options={this.state.unitOptions}
          placeholder="CHOOSE UNIT"
          clearable={true}
          className="choose-loc-add"
          onChange={ this.handleUnitChange.bind(this) } />
        <Select
          name="keyId"
          value={keyId}
          options={this.state.keyOptions}
          placeholder="CHOOSE KEY"
          clearable={true}
          className="choose-loc-add"
          onChange={(e) => {
            e
              ? this.setState({ keyId: e.value })
              : this.setState({ keyId: '', interval: '', content: '', type: '' })
          }
          } />
        <Select
          name="form-field-name"
          value={interval}
          options={intervalOptions}
          placeholder="INTERVAL"
          clearable={true}
          className="choose-time-add"
          onChange={(e) => {
            e
              ? this.setState({ interval: e.value })
              : this.setState({ interval: '', content: '', type: '' })
          }
          } />
        <input
          name="from"
          type="text"
          value={from}
          placeholder="DATE FROM"
          onChange={(e) => {
            this.setState({ from: e.target.value })
          }
          } />
        <input
          name="to"
          type="text"
          value={to}
          placeholder="DATE TO"
          onChange={(e) => {
            this.setState({ to: e.target.value })
          }
          } />
        <Select
          name="form-field-name"
          value={type}
          options={typeOptions}
          placeholder="CHOOSE BLOCK TYPE"
          clearable={true}
          className="choose-block-add"
          onChange={(e) => {
            e
              ? this.setState({ type: e.value })
              : this.setState({ type: '' })
          }
          } />
        <div className="button-wrapper">
          <button
            onClick={() => dispatch(blockActions.addNewBlock())}
            className="cancel-block-add"
          >CANCEL
        </button>
          <button
            onClick={ this.handleSave.bind(this) }
            className="save-block-add">
            SAVE BLOCK
        </button>
        </div>
      </div>
    );
  }

}

export default ContentEdit;