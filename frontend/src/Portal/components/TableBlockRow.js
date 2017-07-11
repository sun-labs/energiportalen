import React, { Component } from 'react';

class TableBlockRow extends Component {
  componentWillMount() {
    const { fetchRowData, id } = this.props;
    fetchRowData(id);
  }

  render() {

    const {
      span,
      title,
      value,
      si
    } = this.props;

    return (
      <tr>
        <td>
          <div className="time-wrap">
            <p className="value">{ span }</p>
          </div>
          <div className="description-wrap">
            <p className="title">{ title }</p>
          </div>
          <div className="data-wrap">
            <p className="value">{ typeof value === 'number' ? value : 'loading..' }</p>
            <p className="unit">{ si }</p>
          </div>
        </td>
      </tr>
  );
  }
}

export default TableBlockRow;