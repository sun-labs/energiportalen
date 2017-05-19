import React, { Component } from 'react';
import { API_URL } from '../../Splash/assets/APIRoutes.js';

class TableBlockRow extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      ...this.props
    });
    this.APIEndpoint = `${API_URL}/`;
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