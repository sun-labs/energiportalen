import React, { Component } from 'react';

import IlluBlock from './IlluBlock';

class IlluPhoneBlock extends Component {
  constructor() {
    super();

    this.calcCharged = this.calcCharged.bind(this);
  }

  componentWillMount() {
    const { 
      fetchSumValueData,
      dispatch
    } = this.props;
    dispatch(fetchSumValueData(this.props));
  }

  /**
   * @param {Int} energy in Wh
   */
  calcCharged(energy) {
    const {
      BAT_SIZE_MAH = 3000,
      CHARGER_CUR_V = 5
    } = {};
    const Wh = BAT_SIZE_MAH * CHARGER_CUR_V / 1000;
    const charges = energy / Wh;
    return Math.floor(charges);
  }

  render() {

    const { 
      value = 100, 
      title, 
      subtitle, 
      timeSpan 
    } = this.props;

    const {
      calcCharged
    } = this;

    return(
    <IlluBlock className="block-phone" title={ title } subtitle={ subtitle } timeSpan={ timeSpan }>
        <p className="value-illu">{ calcCharged(value) }</p>
        <figure className="charge"></figure>
        <figure className="phone"></figure>
        <figure className="cable"></figure>
    </IlluBlock>
    );
  }
}

export default IlluPhoneBlock;