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
        <tbody>
          <tr>
            <td>
              <div className="time-wrap">
                <p className="value">24h</p>
              </div>
              <div className="description-wrap">
                <p className="title">Producerad energi</p>
              </div>
              <div className="data-wrap">
                <p className="value">500</p>
                <p className="unit">MWh</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className="add-information">+ add information</td>
          </tr>
        </tbody>
      </table>
    </Block>
  );
}

export default TableBlock;