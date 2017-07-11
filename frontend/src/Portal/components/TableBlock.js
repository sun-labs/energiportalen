import React, { Component } from 'react';

import Block from './Block';
import TableBlockRow from './TableBlockRow';

class TableBlock extends Component {
  constructor() {
    super();

    this.fetchRowData = this.fetchRowData.bind(this);
  }

  fetchRowData(rowId) {
    const { props } = this;

    props.fetchSumValueData({
      from: props.from,
      to: props.to,
      interval: props.interval,
      unitId: props.unitId,
      keyId: props.keyId,
      blockId: props.blockId,
      blockType: props.blockType,
      rowId: props.rowId
    })
  }

  componentWillMount() {
    const { props } = this;
    if (props.rows.length < 1) props.addTableBlockRow(props.blockId);
  }

  render() {
    const {
      props,
      fetchRowData
    } = this;

    const {
      title = '',
      subtitle = '',
      rows = [],
      blockId,
      editing,
    } = props;

    const blockInfo = {
      title,
      subtitle,
      type: 'TABLE',
      editing,
      blockId,
      ...props
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
              return (<TableBlockRow key={ index + props } { ...rowProps } />);
            })
          }
          <tr>
            <td onClick={ () => props.addTableBlockRow(blockId) } className="add-information">+ add information</td>
          </tr>
        </tbody>
      </table>
    </Block>
  );
  }
}

export default TableBlock;