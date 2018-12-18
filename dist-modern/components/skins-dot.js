import React from 'react';


import Skins from './skins';

export default class SkinsDot extends Skins {
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
      skinToneNodes.push(React.createElement(
        'span',
        {
          key: `skin-tone-${skinTone}`,
          className: `emoji-mart-skin-swatch${selected ? ' selected' : ''}`
        },
        React.createElement('span', {
          onClick: this.handleClick,
          'data-skin': skinTone,
          className: `emoji-mart-skin emoji-mart-skin-tone-${skinTone}`
        })
      ));
    }

    return React.createElement(
      'div',
      { className: `emoji-mart-skin-swatches${opened ? ' opened' : ''}` },
      skinToneNodes
    );
  }
}

SkinsDot.defaultProps = {
  onChange: () => {}
};