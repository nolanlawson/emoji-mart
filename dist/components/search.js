'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgs = require('../svgs');

var _nimbleEmojiIndex = require('../utils/emoji-index/nimble-emoji-index');

var _nimbleEmojiIndex2 = _interopRequireDefault(_nimbleEmojiIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Search extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: _svgs.search.search,
      isSearching: false
    };

    this.data = props.data;
    this.emojiIndex = new _nimbleEmojiIndex2.default(this.data);
    this.setRef = this.setRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  search(value) {
    if (value == '') this.setState({
      icon: _svgs.search.search,
      isSearching: false
    });else this.setState({
      icon: _svgs.search.delete,
      isSearching: true
    });

    this.props.onSearch(this.emojiIndex.search(value, {
      emojisToShowFilter: this.props.emojisToShowFilter,
      maxResults: this.props.maxResults,
      include: this.props.include,
      exclude: this.props.exclude,
      custom: this.props.custom
    }));
  }

  clear() {
    if (this.input.value == '') return;
    this.input.value = '';
    this.search('');
  }

  handleChange() {
    this.search(this.input.value);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.clear();
    }
  }

  setRef(c) {
    this.input = c;
  }

  render() {
    var { i18n, autoFocus } = this.props;
    var { icon, isSearching } = this.state;

    return _react2.default.createElement(
      'div',
      { className: 'emoji-mart-search' },
      _react2.default.createElement('input', {
        ref: this.setRef,
        type: 'text',
        onChange: this.handleChange,
        placeholder: i18n.search,
        autoFocus: autoFocus
      }),
      _react2.default.createElement(
        'button',
        {
          className: 'emoji-mart-search-icon',
          onClick: this.clear,
          onKeyUp: this.handleKeyUp,
          disabled: !isSearching
        },
        icon()
      )
    );
  }
}

exports.default = Search;
Search.propTypes /* remove-proptypes */ = {
  onSearch: _propTypes2.default.func,
  maxResults: _propTypes2.default.number,
  emojisToShowFilter: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool
};

Search.defaultProps = {
  onSearch: () => {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};