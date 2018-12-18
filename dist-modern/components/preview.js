var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';


import { getData } from '../utils';
import NimbleEmoji from './emoji/nimble-emoji';
import SkinsEmoji from './skins-emoji';
import SkinsDot from './skins-dot';

export default class Preview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.state = { emoji: null };
  }

  render() {
    var { emoji } = this.state,
        {
      emojiProps,
      skinsProps,
      showSkinTones,
      title,
      emoji: idleEmoji,
      i18n
    } = this.props;

    if (emoji) {
      var emojiData = getData(emoji, null, null, this.data),
          { emoticons = [] } = emojiData,
          knownEmoticons = [],
          listedEmoticons = [];

      emoticons.forEach(emoticon => {
        if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
          return;
        }

        knownEmoticons.push(emoticon.toLowerCase());
        listedEmoticons.push(emoticon);
      });

      return React.createElement(
        'div',
        { className: 'emoji-mart-preview' },
        React.createElement(
          'div',
          { className: 'emoji-mart-preview-emoji' },
          NimbleEmoji(_extends({
            key: emoji.id,
            emoji: emoji,
            data: this.data
          }, emojiProps))
        ),
        React.createElement(
          'div',
          { className: 'emoji-mart-preview-data' },
          React.createElement(
            'div',
            { className: 'emoji-mart-preview-name' },
            emoji.name
          ),
          React.createElement(
            'div',
            { className: 'emoji-mart-preview-shortnames' },
            emojiData.short_names.map(short_name => React.createElement(
              'span',
              { key: short_name, className: 'emoji-mart-preview-shortname' },
              ':',
              short_name,
              ':'
            ))
          ),
          React.createElement(
            'div',
            { className: 'emoji-mart-preview-emoticons' },
            listedEmoticons.map(emoticon => React.createElement(
              'span',
              { key: emoticon, className: 'emoji-mart-preview-emoticon' },
              emoticon
            ))
          )
        )
      );
    } else {
      return React.createElement(
        'div',
        { className: 'emoji-mart-preview' },
        React.createElement(
          'div',
          { className: 'emoji-mart-preview-emoji' },
          idleEmoji && idleEmoji.length && NimbleEmoji(_extends({ emoji: idleEmoji, data: this.data }, emojiProps))
        ),
        React.createElement(
          'div',
          { className: 'emoji-mart-preview-data' },
          React.createElement(
            'span',
            { className: 'emoji-mart-title-label' },
            title
          )
        ),
        showSkinTones && React.createElement(
          'div',
          {
            className: `emoji-mart-preview-skins${skinsProps.skinEmoji ? ' custom' : ''}`
          },
          skinsProps.skinEmoji ? React.createElement(SkinsEmoji, {
            skin: skinsProps.skin,
            emojiProps: emojiProps,
            data: this.data,
            skinEmoji: skinsProps.skinEmoji,
            i18n: i18n,
            onChange: skinsProps.onChange
          }) : React.createElement(SkinsDot, {
            skin: skinsProps.skin,
            i18n: i18n,
            onChange: skinsProps.onChange
          })
        )
      );
    }
  }
}

Preview.defaultProps = {
  showSkinTones: true,
  onChange: () => {}
};