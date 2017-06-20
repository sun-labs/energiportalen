import React, { Component } from 'react';

import API from '../../API';

class TableBlockRow extends Component {

  constructor() {
    super();
    this.state = {
      ...this.props
    };
  }

  componentWillMount() {
    this.setState({
      ...this.props,
      value: 'loading..'
    }, () => {
      this.fetchSumValueData((data) => {
        this.setState({
          ...this.state,
          value: data.data[0].sum_val.toFixed(0)
        })
      });
    });
  }

  fetchSumValueData(cb) {
    API.getDataFromKey(this.state, (res) => {
      cb(res.data);
    });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="time-wrap">
            <p className="value">{ this.state.span }</p>
          </div>
          <div className="description-wrap">
            <p className="title">{ this.state.title }</p>
          </div>
          <div className="data-wrap">
            <p className="value">{ this.state.value }</p>
            <p className="unit">{ this.state.si }</p>
          </div>
        </td>
      </tr>
  );
  }
}

export default TableBlockRow;