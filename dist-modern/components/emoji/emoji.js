var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';

import data from '../../../data/all.json';
import NimbleEmoji from './nimble-emoji';

import { EmojiDefaultProps } from '../../utils/shared-default-props';

const Emoji = props => {
  for (let k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return NimbleEmoji(_extends({}, props));
};

Emoji.defaultProps = _extends({}, EmojiDefaultProps, { data });

export default Emoji;