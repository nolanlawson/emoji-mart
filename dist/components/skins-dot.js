'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _skins = require('./skins');

var _skins2 = _interopRequireDefault(_skins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SkinsDot extends _skins2.default {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { skin, i18n } = this.props;
    const { opened } = this.state;
    const skinToneNodes = [];

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin;
      skinToneNodes.push(_react2.default.createElement(
        'span',
        {
          key: `skin-tone-${skinTone}`,
          className: `emoji-mart-skin-swatch${selected ? ' selected' : ''}`
        },
        _react2.default.createElement('span', {
          onClick: this.handleClick,
          'data-skin': skinTone,
          className: `emoji-mart-skin emoji-mart-skin-tone-${skinTone}`
        })
      ));
    }

    return _react2.default.createElement(
      'div',
      { className: `emoji-mart-skin-swatches${opened ? ' opened' : ''}` },
      skinToneNodes
    );
  }
}

exports.default = SkinsDot;


SkinsDot.defaultProps = {
  onChange: () => {}
};