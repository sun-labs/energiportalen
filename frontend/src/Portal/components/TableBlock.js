import React, { Component } from 'react';

import Block from './Block';
import TableBlockRow from './TableBlockRow';

class TableBlock extends Component {

  componentWillMount() {
    const { 
      dispatch,
      blockId,
      blockActions
    } = this.props;
    dispatch(blockActions.addTableBlockRow(blockId));
  }

  render() {

    const {
      title = '',
      subtitle = '',
      rows = [],
      dispatch,
      blockId,
      editing,
      blockActions
    } = this.props;

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
              return (<TableBlockRow key={ index + this.props } { ...elem } />);
            })
          }
          <tr>
            <td onClick={ () => dispatch(blockActions.addTableBlockRow(blockId)) } className="add-information">+ add information</td>
          </tr>
        </tbody>
      </table>
    </Block>
  );
  }
}

export default TableBlock;