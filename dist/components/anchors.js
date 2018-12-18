'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Anchors extends _react2.default.PureComponent {
  constructor(props) {
    super(props);

    let defaultCategory = props.categories.filter(category => category.first)[0];

    this.state = {
      selected: defaultCategory.name
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var index = e.currentTarget.getAttribute('data-index');
    var { categories, onAnchorClick } = this.props;

    onAnchorClick(categories[index], index);
  }

  render() {
    var { categories, color, i18n, icons } = this.props,
        { selected } = this.state;

    return _react2.default.createElement(
      'div',
      { className: 'emoji-mart-anchors' },
      categories.map((category, i) => {
        var { id, name, anchor } = category,
            isSelected = name == selected;

        if (anchor === false) {
          return null;
        }

        return _react2.default.createElement(
          'span',
          {
            key: id,
            title: i18n.categories[id],
            'data-index': i,
            onClick: this.handleClick,
            className: `emoji-mart-anchor ${isSelected ? 'emoji-mart-anchor-selected' : ''}`,
            style: { color: isSelected ? color : null }
          },
          _react2.default.createElement(
            'div',
            { className: 'emoji-mart-anchor-icon' },
            icons.categories[id]()
          ),
          _react2.default.createElement('span', {
            className: 'emoji-mart-anchor-bar',
            style: { backgroundColor: color }
          })
        );
      })
    );
  }
}

exports.default = Anchors;


Anchors.defaultProps = {
  categories: [],
  onAnchorClick: () => {},
  icons: {}
};