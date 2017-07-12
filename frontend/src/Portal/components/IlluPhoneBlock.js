import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IlluBlock from './IlluBlock';

class IlluPhoneBlock extends Component {
  constructor() {
    super();

    this.calcCharged = this.calcCharged.bind(this);
  }

  componentWillMount() {
    const { props } = this;
    props.fetchSumValueData(props);
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
      props,
      calcCharged
    } = this;

    return(
    <IlluBlock className="block-phone" title={ props.title } subtitle={ props.subtitle } timeSpan={ props.timeSpan }>
        <p className="value-illu">{ calcCharged(props.value) }</p>
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