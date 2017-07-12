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
    const { props } = this;

    props.fetchSumValueData({
      from: props.from,
      to: props.to,
      interval: props.interval,
      unitId: props.unitId,
      keyId: props.keyId,
      blockId: props.blockId,
      blockType: props.blockType,
      rowId: rowId
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

    const blockInfo = {
      title: props.title,
      subtitle: prop.title,
      type: 'TABLE',
      editing: props.editing,
      blockId: props.blockId,
      ...props
    }

    return (
      <Block className="blockk-table" { ...blockInfo }>
        <table className="content-table">
          <tbody>
            {
              props.rows.map((elem, index) => {
                const rowProps = {
                  ...elem,
                  fetchRowData,
                }
                return (<TableBlockRow key={ elem.id } { ...rowProps } />);
              })
            }
            <tr>
              <td onClick={ () => props.addTableBlockRow(props.blockId) } className="add-information">+ add information</td>
            </tr>
          </tbody>
        </table>
      </Block>
    );
  }
}

TableBlock.propTypes = {
  fetchSumValueData: PropTypes.func.isRequired,
  addTableBlockRow: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  editing: PropTypes.bool.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  unitId: PropTypes.number.isRequired,
  keyId: PropTypes.number.isRequired,
  blockId: PropTypes.number.isRequired,
  blockType: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
};

export default TableBlock;