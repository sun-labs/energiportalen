import React, { Component } from 'react';
import '../styles/AddBlock.css';

import Select from 'react-select';
import '../styles/react-select.css';
import Block from './Block';

class IlluBlock extends Component {
  constructor() {
    super();

    this.state = {
      location: '',
      type: '',
      timespan: '',
      content: ''
    }
  }

  render() {
    const {
      value = 534.3,
    } = this.props;

    const {
      location,
      type,
      timespan,
      content
    } = this.state;

    const blockInfo = {
      value,
      type: 'ADD',
      title: 'ADD BLOCK'
    }

    const locationOptions = [
      { value: 'Akademiska Sjukhuset', label: 'Akademiska Sjukhuset' },
      { value: 'Origo', label: 'Origo' }
    ];

    const typeOptions = [
      { value: 'Line Chart', label: 'Line Chart' },
      { value: 'Table Chart', label: 'Table Chart' },
      { value: 'Smartphone charges', label: 'Smartphone charges' },
      { value: 'Scooter thingy', label: 'Scooter thingy' }
    ];

    const timespanOptions = [
      { value: '1h', label: '1h' },
      { value: '24h', label: '24h' },
      { value: '7d', label: '7d' },
      { value: '365d', label: '365d' }
    ];

    const contentOptions = [
      { value: 'kWh', label: 'kWh' },
      { value: 'temperature', label: 'temperature' },
      { value: 'humidity', label: 'humidity' },
      { value: 'radiation', label: 'radiation' }
    ];

    return(
    <Block className="blockk-add" {...blockInfo}>
      <Select
        name="form-field-name"
        value={location}
        options={locationOptions}
        placeholder="CHOOSE LOCATION"
        clearable={true}
        className="chooseLoc-add"
        onChange={(e) =>
          { e 
            ? this.setState({ location: e.value }) 
            : this.setState({ location: '', timespan: '', content: '', type: '' })}
        }/>
      <Select
        name="form-field-name"
        value={timespan}
        options={timespanOptions}
        placeholder="TIME SPAN"
        clearable={true}
        disabled={ location.length < 1 }
        className="chooseTime-add"
        onChange={(e) =>
          { e 
            ? this.setState({ timespan: e.value }) 
            : this.setState({ timespan: '', content: '', type: '' })}
        }/>
      <Select
        name="form-field-name"
        value={content}
        options={contentOptions}
        placeholder="CHOOSE CONTENT"
        clearable={true}
        disabled={ timespan.length < 1 }
        className="chooseContent-add"
        onChange={(e) =>
          { e 
            ? this.setState({ content: e.value }) 
            : this.setState({ content: '', type: '' })}
        }/>
      <Select
        name="form-field-name"
        value={type}
        options={typeOptions}
        placeholder="CHOOSE BLOCK TYPE"
        clearable={true}
        disabled={ content.length < 1 }
        className="chooseBlock-add"
        onChange={(e) =>
          { e 
            ? this.setState({ type: e.value }) 
            : this.setState({ type: '' })}
        }/>
      <button
        disabled={ type.length < 1 }>
        SAVE BLOCK
      </button>
    </Block>
    );
  }
}

export default IlluBlock;