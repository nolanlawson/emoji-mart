var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';

import data from '../../../data/all.json';
import NimblePicker from './nimble-picker';

import { PickerDefaultProps } from '../../utils/shared-default-props';

export default class Picker extends React.PureComponent {
  render() {
    return React.createElement(NimblePicker, _extends({}, this.props, this.state));
  }
}

Picker.defaultProps = _extends({}, PickerDefaultProps, { data });