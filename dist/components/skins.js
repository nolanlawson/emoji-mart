'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nimbleEmoji = require('./emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Skins extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  handleClick(e) {
    var skin = parseInt(e.currentTarget.getAttribute('data-skin'));
    var { onChange } = this.props;

    if (!this.state.opened) {
      this.setState({ opened: true });
    } else {
      this.setState({ opened: false });
      if (skin != this.props.skin) {
        onChange(skin);
      }
    }
  }

  render() {
    return null;
  }
}

exports.default = Skins;


Skins.defaultProps = {
  onChange: () => {}
};