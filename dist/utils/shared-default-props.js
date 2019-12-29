"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiDefaultProps = exports.PickerDefaultProps = void 0;
var EmojiDefaultProps = {
  skin: 1,
  set: 'apple',
  sheetSize: 64,
  sheetColumns: 52,
  sheetRows: 52,
  "native": false,
  forceSize: false,
  tooltip: false,
  backgroundImageFn: function backgroundImageFn(set, sheetSize) {
    return "https://unpkg.com/emoji-datasource-".concat(set, "@").concat("4.0.4", "/img/").concat(set, "/sheets-256/").concat(sheetSize, ".png");
  }
};
exports.EmojiDefaultProps = EmojiDefaultProps;
var PickerDefaultProps = {
  onClick: function onClick() {},
  onSelect: function onSelect() {},
  onSkinChange: function onSkinChange() {},
  emojiSize: 24,
  perLine: 9,
  i18n: {},
  style: {},
  title: 'Emoji Mart™',
  emoji: 'department_store',
  color: '#ae65c5',
  set: EmojiDefaultProps.set,
  skin: null,
  defaultSkin: EmojiDefaultProps.skin,
  "native": EmojiDefaultProps["native"],
  sheetSize: EmojiDefaultProps.sheetSize,
  backgroundImageFn: EmojiDefaultProps.backgroundImageFn,
  emojisToShowFilter: null,
  showPreview: true,
  showSkinTones: true,
  darkMode: !!(typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches),
  emojiTooltip: EmojiDefaultProps.tooltip,
  autoFocus: false,
  custom: [],
  skinEmoji: '',
  notFound: function notFound() {},
  notFoundEmoji: 'sleuth_or_spy',
  icons: {}
};
exports.PickerDefaultProps = PickerDefaultProps;