import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import TableBlockRow from './TableBlockRow';

class TableBlock extends Component {
  constructor() {
    super();

    this.fetchRowData = this.fetchRowData.bind(this);
  }

  fetchRowData(rowId) {
    const {
      fetchSumValueData,
      interval,
      unitId,
      keyId,
      blockId,
      blockType,
      rows
    } = this.props;

    const timeSpan = rows.find(row => row.id === rowId).timeSpan;

    fetchSumValueData({
      timeSpan,
      interval,
      unitId,
      keyId,
      blockId,
      blockType,
      rowId
    })
  }

  componentWillMount() {
    const {
      rows,
      addTableBlockRow,
      blockId
    } = this.props;
    if (rows.length < 1) {
      addTableBlockRow(blockId, '7d');
      addTableBlockRow(blockId, '30d');
      addTableBlockRow(blockId, '365d');
    }
  }

  render() {
    const {
      rows,
      blockId,
      removeBlock,
      blockType,
      editing,
      fetchLocationData,
      name,
      city
    } = this.props;

    return (
      <Block
        className="blockk-table"
        removeBlock={removeBlock}
        blockType={blockType}
        editing={editing}
        blockId={blockId}
        fetchLocationData={fetchLocationData}
        name={name}
        city={city}
      >
        <table className="content-table">
          <tbody>
            {
              rows.map((elem, index) => {
                const rowProps = {
                  ...elem,
                  fetchRowData: this.fetchRowData,
                }
                return (<TableBlockRow key={ elem.id } { ...rowProps } />);
              })
            }
            {/* <tr>
              <td onClick={ () => addTableBlockRow(blockId) } className="add-information">+ add information</td>
            </tr> */}
          </tbody>
        </table>
      </Block>
    );
  }
}

TableBlock.propTypes = {
  fetchSumValueData:      PropTypes.func.isRequired,
  addTableBlockRow:       PropTypes.func.isRequired,
  name:                  PropTypes.string.isRequired,
  city:               PropTypes.string.isRequired,
  rows:                   PropTypes.array.isRequired,
  editing:                PropTypes.bool.isRequired,
  unitId:                 PropTypes.number.isRequired,
  keyId:                  PropTypes.number.isRequired,
  blockId:                PropTypes.number.isRequired,
  blockType:              PropTypes.string.isRequired,
  interval:               PropTypes.string.isRequired,
};

export default TableBlock;