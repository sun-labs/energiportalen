import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IlluBlock from './IlluBlock';

class IlluPhoneBlock extends Component {
  constructor() {
    super();

    this.calcCharged = this.calcCharged.bind(this);
  }

  componentWillMount() {
    const {
      fetchSumValueData,
      from,
      to,
      interval,
      unitId,
      keyId,
      blockId,
      blockType,
      rowId
    } = this.props;
    fetchSumValueData({ from, to, interval, unitId, keyId, blockId, blockType, rowId });
  }

  /**
   * @param {Int} energy in kWh
   */
  calcCharged(energy) {
    const {
      BAT_SIZE_MAH = 3000,
      CHARGER_CUR_V = 5
    } = {};
    const kWh = BAT_SIZE_MAH * CHARGER_CUR_V / 1000000;
    const charges = energy / kWh;
    return Math.floor(charges);
  }

  render() {

    const {
      value,
      title,
      subtitle,
      timeSpan,
      blockType,
      editing,
      blockId,
    } = this.props;

    return(
    <IlluBlock
      className="block-phone"
      title={title}
      subtitle={subtitle}
      timeSpan={timeSpan}
      blockType={blockType}
      editing={editing}
      blockId={blockId}
    >
        <p className="value-illu">{ this.calcCharged(value) }</p>
        <figure className="charge"></figure>
        <figure className="phone"></figure>
        <figure className="cable"></figure>
    </IlluBlock>
    );
  }
}

IlluPhoneBlock.propTypes = {
  value:                      PropTypes.number.isRequired,
  title:                      PropTypes.string.isRequired,
  subtitle:                   PropTypes.string.isRequired,
  timeSpan:                   PropTypes.string.isRequired
};

export default IlluPhoneBlock;