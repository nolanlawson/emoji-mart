var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';


import frequently from '../utils/frequently';
import { getData } from '../utils';
import NimbleEmoji from './emoji/nimble-emoji';
import NotFound from './not-found';

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.setContainerRef = this.setContainerRef.bind(this);
    this.setLabelRef = this.setLabelRef.bind(this);
  }

  componentDidMount() {
    this.parent = this.container.parentNode;

    this.margin = 0;
    this.minMargin = 0;

    this.memoizeSize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    var {
      name,
      perLine,
      native,
      hasStickyPosition,
      emojis,
      emojiProps
    } = this.props,
        { skin, size, set } = emojiProps,
        {
      perLine: nextPerLine,
      native: nextNative,
      hasStickyPosition: nextHasStickyPosition,
      emojis: nextEmojis,
      emojiProps: nextEmojiProps
    } = nextProps,
        { skin: nextSkin, size: nextSize, set: nextSet } = nextEmojiProps,
        shouldUpdate = false;

    if (name == 'Recent' && perLine != nextPerLine) {
      shouldUpdate = true;
    }

    if (name == 'Search') {
      shouldUpdate = !(emojis == nextEmojis);
    }

    if (skin != nextSkin || size != nextSize || native != nextNative || set != nextSet || hasStickyPosition != nextHasStickyPosition) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  memoizeSize() {
    var { top, height } = this.container.getBoundingClientRect();
    var { top: parentTop } = this.parent.getBoundingClientRect();
    var { height: labelHeight } = this.label.getBoundingClientRect();

    this.top = top - parentTop + this.parent.scrollTop;

    if (height == 0) {
      this.maxMargin = 0;
    } else {
      this.maxMargin = height - labelHeight;
    }
  }

  handleScroll(scrollTop) {
    var margin = scrollTop - this.top;
    margin = margin < this.minMargin ? this.minMargin : margin;
    margin = margin > this.maxMargin ? this.maxMargin : margin;

    if (margin == this.margin) return;

    if (!this.props.hasStickyPosition) {
      this.label.style.top = `${margin}px`;
    }

    this.margin = margin;
    return true;
  }

  getEmojis() {
    var { name, emojis, recent, perLine } = this.props;

    if (name == 'Recent') {
      let { custom } = this.props;
      let frequentlyUsed = recent || frequently.get(perLine);

      if (frequentlyUsed.length) {
        emojis = frequentlyUsed.map(id => {
          const emoji = custom.filter(e => e.id === id)[0];
          if (emoji) {
            return emoji;
          }

          return id;
        }).filter(id => !!getData(id, null, null, this.data));
      }

      if (emojis.length === 0 && frequentlyUsed.length > 0) {
        return null;
      }
    }

    if (emojis) {
      emojis = emojis.slice(0);
    }

    return emojis;
  }

  updateDisplay(display) {
    var emojis = this.getEmojis();

    if (!emojis) {
      return;
    }

    this.container.style.display = display;
  }

  setContainerRef(c) {
    this.container = c;
  }

  setLabelRef(c) {
    this.label = c;
  }

  render() {
    var {
      id,
      name,
      hasStickyPosition,
      emojiProps,
      i18n,
      notFound,
      notFoundEmoji
    } = this.props,
        emojis = this.getEmojis(),
        labelStyles = {},
        labelSpanStyles = {},
        containerStyles = {};

    if (!emojis) {
      containerStyles = {
        display: 'none'
      };
    }

    if (!hasStickyPosition) {
      labelStyles = {
        height: 28
      };

      labelSpanStyles = {
        position: 'absolute'
      };
    }

    return React.createElement(
      'div',
      {
        ref: this.setContainerRef,
        className: 'emoji-mart-category',
        style: containerStyles
      },
      React.createElement(
        'div',
        {
          style: labelStyles,
          'data-name': name,
          className: 'emoji-mart-category-label'
        },
        React.createElement(
          'span',
          { style: labelSpanStyles, ref: this.setLabelRef },
          i18n.categories[id]
        )
      ),
      emojis && emojis.map(emoji => NimbleEmoji(_extends({ emoji: emoji, data: this.data }, emojiProps))),
      emojis && !emojis.length && React.createElement(NotFound, {
        i18n: i18n,
        notFound: notFound,
        notFoundEmoji: notFoundEmoji,
        data: this.data,
        emojiProps: emojiProps
      })
    );
  }
}

Category.defaultProps = {
  emojis: [],
  hasStickyPosition: true
};