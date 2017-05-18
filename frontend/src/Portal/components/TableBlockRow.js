import React, { Component } from 'react';
import { API_URL } from '../../Splash/assets/APIRoutes.js';
import axios from 'axios';

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
      value: '?'
    }, () => {
      this.fetchData((data) => {
        this.setState({
          ...this.state,
          value: data.data[0].sum_val.toFixed(0)
        })
      });
    });
  }

  fetchData(cb) {
    const token = localStorage.getItem('token');
    const PARAM_FROM = 'date[from]'; // this will send a javascript object to backend like: date { from: data }
    const PARAM_TO = 'date[to]';
    const PARAM_INT = 'interval';
    const {
      from,
      to,
      interval
    } = this.state;
    const PARAMETERS = `${PARAM_FROM}=${from}&${PARAM_TO}=${to}&${PARAM_INT}=${interval}`;
    axios.get(`${API_URL}/units/${this.state.unitId}/${this.state.keyId}?${PARAMETERS}`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
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