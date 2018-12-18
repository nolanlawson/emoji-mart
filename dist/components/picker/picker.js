'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _all = require('../../../data/all.json');

var _all2 = _interopRequireDefault(_all);

var _nimblePicker = require('./nimble-picker');

var _nimblePicker2 = _interopRequireDefault(_nimblePicker);

var _sharedDefaultProps = require('../../utils/shared-default-props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Picker extends _react2.default.PureComponent {
  render() {
    return _react2.default.createElement(_nimblePicker2.default, _extends({}, this.props, this.state));
  }
}

exports.default = Picker;

Picker.defaultProps = _extends({}, _sharedDefaultProps.PickerDefaultProps, { data: _all2.default });