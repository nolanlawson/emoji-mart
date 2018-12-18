'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nimbleEmoji = require('./emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotFound extends _react2.default.PureComponent {
  render() {
    const { data, emojiProps, i18n, notFound, notFoundEmoji } = this.props;

    const component = notFound && notFound() || _react2.default.createElement(
      'div',
      { className: 'emoji-mart-no-results' },
      (0, _nimbleEmoji2.default)(_extends({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })),
      _react2.default.createElement(
        'div',
        { className: 'emoji-mart-no-results-label' },
        i18n.notfound
      )
    );

    return component;
  }
}

exports.default = NotFound;