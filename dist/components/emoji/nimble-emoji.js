'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../../polyfills/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../utils');

var _data = require('../../utils/data');

var _sharedProps = require('../../utils/shared-props');

var _sharedDefaultProps = require('../../utils/shared-default-props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _getData = props => {
  var { emoji, skin, set, data } = props;
  return (0, _utils.getData)(emoji, skin, set, data);
};

const _getPosition = props => {
  var { sheet_x, sheet_y } = _getData(props),
      multiplyX = 100 / (props.sheetColumns - 1),
      multiplyY = 100 / (props.sheetRows - 1);

  return `${multiplyX * sheet_x}% ${multiplyY * sheet_y}%`;
};

const _getSanitizedData = props => {
  var { emoji, skin, set, data } = props;
  return (0, _utils.getSanitizedData)(emoji, skin, set, data);
};

const _handleClick = (e, props) => {
  if (!props.onClick) {
    return;
  }
  var { onClick } = props,
      emoji = _getSanitizedData(props);

  onClick(emoji, e);
};

const _handleOver = (e, props) => {
  if (!props.onOver) {
    return;
  }
  var { onOver } = props,
      emoji = _getSanitizedData(props);

  onOver(emoji, e);
};

const _handleLeave = (e, props) => {
  if (!props.onLeave) {
    return;
  }
  var { onLeave } = props,
      emoji = _getSanitizedData(props);

  onLeave(emoji, e);
};

const _isNumeric = value => {
  return !isNaN(value - parseFloat(value));
};

const _convertStyleToCSS = style => {
  let div = document.createElement('div');

  for (let key in style) {
    let value = style[key];

    if (_isNumeric(value)) {
      value += 'px';
    }

    div.style[key] = value;
  }

  return div.getAttribute('style');
};

const NimbleEmoji = props => {
  if (props.data.compressed) {
    (0, _data.uncompress)(props.data);
  }

  for (let k in NimbleEmoji.defaultProps) {
    if (props[k] == undefined && NimbleEmoji.defaultProps[k] != undefined) {
      props[k] = NimbleEmoji.defaultProps[k];
    }
  }

  let data = _getData(props);
  if (!data) {
    if (props.fallback) {
      return props.fallback(null, props);
    } else {
      return null;
    }
  }

  let { unified, custom, short_names, imageUrl } = data,
      style = {},
      children = props.children,
      className = 'emoji-mart-emoji',
      title = null;

  if (!unified && !custom) {
    if (props.fallback) {
      return props.fallback(data, props);
    } else {
      return null;
    }
  }

  if (props.tooltip) {
    title = short_names[0];
  }

  if (props.native && unified) {
    className += ' emoji-mart-emoji-native';
    style = { fontSize: props.size };
    children = (0, _utils.unifiedToNative)(unified);

    if (props.forceSize) {
      style.display = 'inline-block';
      style.width = props.size;
      style.height = props.size;
      style.wordBreak = 'keep-all';
    }
  } else if (custom) {
    className += ' emoji-mart-emoji-custom';
    style = {
      width: props.size,
      height: props.size,
      display: 'inline-block'
    };
    if (data.spriteUrl) {
      style = (0, _extends3.default)({}, style, {
        backgroundImage: `url(${data.spriteUrl})`,
        backgroundSize: `${100 * props.sheetColumns}% ${100 * props.sheetRows}%`,
        backgroundPosition: _getPosition(props)
      });
    } else {
      style = (0, _extends3.default)({}, style, {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'contain'
      });
    }
  } else {
    let setHasEmoji = data[`has_img_${props.set}`] == undefined || data[`has_img_${props.set}`];

    if (!setHasEmoji) {
      if (props.fallback) {
        return props.fallback(data, props);
      } else {
        return null;
      }
    } else {
      style = {
        width: props.size,
        height: props.size,
        display: 'inline-block',
        backgroundImage: `url(${props.backgroundImageFn(props.set, props.sheetSize)})`,
        backgroundSize: `${100 * props.sheetColumns}% ${100 * props.sheetRows}%`,
        backgroundPosition: _getPosition(props)
      };
    }
  }

  if (props.html) {
    style = _convertStyleToCSS(style);
    return `<span style='${style}' ${title ? `title='${title}'` : ''} class='${className}'>${children || ''}</span>`;
  } else {
    return _react2.default.createElement(
      'span',
      {
        key: props.emoji.id || props.emoji,
        onClick: e => _handleClick(e, props),
        onMouseEnter: e => _handleOver(e, props),
        onMouseLeave: e => _handleLeave(e, props),
        title: title,
        className: className
      },
      _react2.default.createElement(
        'span',
        { style: style },
        children
      )
    );
  }
};

NimbleEmoji.propTypes /* remove-proptypes */ = (0, _extends3.default)({}, _sharedProps.EmojiPropTypes, {
  data: _propTypes2.default.object.isRequired
});
NimbleEmoji.defaultProps = _sharedDefaultProps.EmojiDefaultProps;

exports.default = NimbleEmoji;