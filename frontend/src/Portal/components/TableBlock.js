import React, { Component } from 'react';

import Block from './Block';
import TableBlockRow from './TableBlockRow';

class TableBlock extends Component {
  constructor() {
    super();

    this.fetchRowData = this.fetchRowData.bind(this);
  }

  fetchRowData(rowId) {
    const {
      actions,      
      dispatch,
      from,
      to,
      interval,
      unitId,
      keyId,
      blockId,
      blockType,
    } = this.props;

    dispatch(
      actions.fetchSumValueData({
        from,
        to,
        interval,
        unitId,
        keyId,
        blockId,
        blockType,
        rowId
      })
    )
  }

  componentWillMount() {
    const { 
      dispatch,
      blockId,
      actions
    } = this.props;
    dispatch(actions.addTableBlockRow(blockId));
  }

  render() {

    const {
      title = '',
      subtitle = '',
      rows = [],
      dispatch,
      blockId,
      editing,
      actions
    } = this.props;

    const {
      fetchRowData
    } = this;

    const blockInfo = {
      title,
      subtitle,
      type: 'TABLE',
      editing,
      dispatch,
      blockId
    }
  
    return (
    <Block className="blockk-table" { ...blockInfo }>
      <table className="content-table">
        <tbody>
          { 
            rows.map((elem, index) => {
              const rowProps = {
                ...elem,
                fetchRowData
              }
              return (<TableBlockRow key={ index + this.props } { ...rowProps } />);
            })
          }
          <tr>
            <td onClick={ () => dispatch(actions.addTableBlockRow(blockId)) } className="add-information">+ add information</td>
          </tr>
        </tbody>
      </table>
    </Block>
  );
  }
}

export default TableBlock;