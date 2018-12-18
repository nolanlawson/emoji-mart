import React from 'react';


export default class Anchors extends React.PureComponent {
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

    return React.createElement(
      'div',
      { className: 'emoji-mart-anchors' },
      categories.map((category, i) => {
        var { id, name, anchor } = category,
            isSelected = name == selected;

        if (anchor === false) {
          return null;
        }

        return React.createElement(
          'span',
          {
            key: id,
            title: i18n.categories[id],
            'data-index': i,
            onClick: this.handleClick,
            className: `emoji-mart-anchor ${isSelected ? 'emoji-mart-anchor-selected' : ''}`,
            style: { color: isSelected ? color : null }
          },
          React.createElement(
            'div',
            { className: 'emoji-mart-anchor-icon' },
            icons.categories[id]()
          ),
          React.createElement('span', {
            className: 'emoji-mart-anchor-bar',
            style: { backgroundColor: color }
          })
        );
      })
    );
  }
}

Anchors.defaultProps = {
  categories: [],
  onAnchorClick: () => {},
  icons: {}
};