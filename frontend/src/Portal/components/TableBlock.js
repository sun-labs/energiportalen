import React, { Component } from 'react';

import Block from './Block';
import TableBlockRow from './TableBlockRow';

class TableBlock extends Component {

  constructor() {
    super();
    this.state = {
      facility: {
        name: 'Akademiska Sjukhuset',
        location: 'Uppsala'
      },
      rows: [] 
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.addRow();
  }

  addRow() {
    let rows = this.state.rows;
    rows.push({
      unitId: 4,
      keyId: 87,
      value: 400,
      si: 'MWh',
      span: '365d',
      from: Date(),
      to: Date(),
      title: 'Pungpin'
    });
    this.setState({
      ...this.state.facility,
      ...rows
    });
  }

  render() {

    const {
      title = this.state.facility.name,
      subtitle = this.state.facility.location
    } = this.props;

    const blockInfo = {
      title,
      subtitle,
      type: 'TABLE'
    }
  
    return (
    <Block className="blockk-table" { ...blockInfo }>
      <table className="content-table">
        <tbody>
          { 
            this.state.rows.map((elem, index) => {
              return (<TableBlockRow key={ index } {...elem} />);
            })
          }
          <tr>
            <td onClick={ this.handleClick } className="add-information">+ add information</td>
          </tr>
        </tbody>
      </table>
    </Block>
  );
  }
}

export default TableBlock;