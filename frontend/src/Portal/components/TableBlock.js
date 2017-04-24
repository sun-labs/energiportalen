import React from 'react';

import Block from './Block';

const TableBlock = (props) => {

  const {
    title = 'Akademiska Sjukhuset',
    subtitle = 'Uppsala'
  } = props;

  const blockInfo = {
    title,
    subtitle
  }

  return (
    <Block className="blockk-table" { ...blockInfo }>
      <table className="content-table">
        <tr>
          <td>Row 1</td>
        </tr>
        <tr>
          <td>Row 2</td>
        </tr>
        <tr>
          <td className="add-information">+ add information</td>
        </tr>
      </table>  
    </Block>
  );
}

export default TableBlock;