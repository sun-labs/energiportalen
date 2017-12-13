import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableBlockRow extends Component {
  componentWillMount() {
    const { fetchRowData, id } = this.props;
    fetchRowData(id);
  }

  render() {

    const {
      timeSpan,
      name,
      value,
      si
    } = this.props;

    return (
      <tr>
        <td>
          <div className="time-wrap">
            <p className="value">{ timeSpan }</p>
          </div>
          <div className="description-wrap">
            <p className="name">{ name }</p>
          </div>
          <div className="data-wrap">
            <p className="value">{ value > 0 ? value : 'loading..' }</p>
            <p className="unit">{ si }</p>
          </div>
        </td>
      </tr>
  );
  }
}

TableBlockRow.propTypes = {
  fetchRowData:             PropTypes.func.isRequired,
  id:                       PropTypes.number.isRequired,
  timeSpan:                     PropTypes.string.isRequired,
  name:                    PropTypes.string.isRequired,
  value:                    PropTypes.number.isRequired,
  si:                       PropTypes.string.isRequired,
};

export default TableBlockRow;