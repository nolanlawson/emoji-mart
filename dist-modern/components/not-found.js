var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';


import NimbleEmoji from './emoji/nimble-emoji';

export default class NotFound extends React.PureComponent {
  render() {
    const { data, emojiProps, i18n, notFound, notFoundEmoji } = this.props;

    const component = notFound && notFound() || React.createElement(
      'div',
      { className: 'emoji-mart-no-results' },
      NimbleEmoji(_extends({
        data: data
      }, emojiProps, {
        size: 38,
        emoji: notFoundEmoji,
        onOver: null,
        onLeave: null,
        onClick: null
      })),
      React.createElement(
        'div',
        { className: 'emoji-mart-no-results-label' },
        i18n.notfound
      )
    );

    return component;
  }
}