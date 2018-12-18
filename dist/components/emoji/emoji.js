'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _all = require('../../../data/all.json');

var _all2 = _interopRequireDefault(_all);

var _nimbleEmoji = require('./nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _sharedDefaultProps = require('../../utils/shared-default-props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Emoji = props => {
  for (let k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return (0, _nimbleEmoji2.default)(_extends({}, props));
};

Emoji.defaultProps = _extends({}, _sharedDefaultProps.EmojiDefaultProps, { data: _all2.default });

exports.default = Emoji;