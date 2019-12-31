import '../../vendor/raf-polyfill'

import React from 'react'
import PropTypes from 'prop-types'

import * as icons from '../../svgs'
import store from '../../utils/store'
import frequently from '../../utils/frequently'
import { deepMerge, measureScrollbar, getSanitizedData } from '../../utils'
import { uncompress } from '../../utils/data'
import { PickerPropTypes } from '../../utils/shared-props'

import Anchors from '../anchors'
import Category from '../category'
import Preview from '../preview'
import Search from '../search'
import { PickerDefaultProps } from '../../utils/shared-default-props'

const I18N = {
  search: 'Search',
  clear: 'Clear', // Accessible label on "clear" button
  notfound: 'No Emoji Found',
  skintext: 'Choose your default skin tone',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom',
  },
  categorieslabel: 'Emoji categories', // Accessible title for the list of categories
  skintones: {
    1: 'Default Skin Tone',
    2: 'Light Skin Tone',
    3: 'Medium-Light Skin Tone',
    4: 'Medium Skin Tone',
    5: 'Medium-Dark Skin Tone',
    6: 'Dark Skin Tone',
  },
}

export default class NimblePicker extends React.PureComponent {
  constructor(props) {
    super(props)

    this.CUSTOM = []

    this.RECENT_CATEGORY = { id: 'recent', name: 'Recent', emojis: null }
    this.SEARCH_CATEGORY = {
      id: 'search',
      name: 'Search',
      emojis: null,
      anchor: false,
    }

    if (props.data.compressed) {
      uncompress(props.data)
    }

    this.data = props.data
    this.i18n = deepMerge(I18N, props.i18n)
    this.icons = deepMerge(icons, props.icons)
    this.state = {
      skin: props.skin || store.get('skin') || props.defaultSkin,
    }

    this.categories = []
    let allCategories = [].concat(this.data.categories)

    if (props.custom.length > 0) {
      const customCategories = {}
      let customCategoriesCreated = 0

      props.custom.forEach((emoji) => {
        if (!customCategories[emoji.customCategory]) {
          customCategories[emoji.customCategory] = {
            id: emoji.customCategory
              ? `custom-${emoji.customCategory}`
              : 'custom',
            name: emoji.customCategory || 'Custom',
            emojis: [],
            anchor: customCategoriesCreated === 0,
          }

          customCategoriesCreated++
        }

        const category = customCategories[emoji.customCategory]

        const customEmoji = {
          ...emoji,
          // `<Category />` expects emoji to have an `id`.
          id: emoji.short_names[0],
          custom: true,
        }

        category.emojis.push(customEmoji)
        this.CUSTOM.push(customEmoji)
      })

      allCategories = allCategories.concat(
        Object.keys(customCategories).map((key) => customCategories[key]),
      )
    }

    this.hideRecent = true

    if (props.include != undefined) {
      allCategories.sort((a, b) => {
        if (props.include.indexOf(a.id) > props.include.indexOf(b.id)) {
          return 1
        }

        return -1
      })
    }

    for (
      let categoryIndex = 0;
      categoryIndex < allCategories.length;
      categoryIndex++
    ) {
      const category = allCategories[categoryIndex]
      let isIncluded =
        props.include && props.include.length
          ? props.include.indexOf(category.id) > -1
          : true
      let isExcluded =
        props.exclude && props.exclude.length
          ? props.exclude.indexOf(category.id) > -1
          : false
      if (!isIncluded || isExcluded) {
        continue
      }

      if (props.emojisToShowFilter) {
        let newEmojis = []

        const { emojis } = category
        for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
          const emoji = emojis[emojiIndex]
          if (props.emojisToShowFilter(this.data.emojis[emoji] || emoji)) {
            newEmojis.push(emoji)
          }
        }

        if (newEmojis.length) {
          let newCategory = {
            emojis: newEmojis,
            name: category.name,
            id: category.id,
          }

          this.categories.push(newCategory)
        }
      } else {
        this.categories.push(category)
      }
    }

    let includeRecent =
      props.include && props.include.length
        ? props.include.indexOf(this.RECENT_CATEGORY.id) > -1
        : true
    let excludeRecent =
      props.exclude && props.exclude.length
        ? props.exclude.indexOf(this.RECENT_CATEGORY.id) > -1
        : false
    if (includeRecent && !excludeRecent) {
      this.hideRecent = false
      this.categories.unshift(this.RECENT_CATEGORY)
    }

    if (this.categories[0]) {
      this.categories[0].first = true
    }

    this.categories.unshift(this.SEARCH_CATEGORY)

    this.setAnchorsRef = this.setAnchorsRef.bind(this)
    this.handleAnchorClick = this.handleAnchorClick.bind(this)
    this.setSearchRef = this.setSearchRef.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.setScrollRef = this.setScrollRef.bind(this)
    this.handleEmojiOver = this.handleEmojiOver.bind(this)
    this.handleEmojiLeave = this.handleEmojiLeave.bind(this)
    this.handleEmojiClick = this.handleEmojiClick.bind(this)
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this)
    this.setPreviewRef = this.setPreviewRef.bind(this)
    this.handleSkinChange = this.handleSkinChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleIntersection = this.handleIntersection.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.skin) {
      return {
        ...state,
        skin: props.skin,
      }
    } else if (props.defaultSkin && !store.get('skin')) {
      return {
        ...state,
        skin: props.defaultSkin,
      }
    }
    return state
  }

  componentDidUpdate() {
    this.handleScroll()
  }

  componentWillUnmount() {
    this.SEARCH_CATEGORY.emojis = null
    clearTimeout(this.leaveTimeout)
    console.log('unmount')
    if (this.topEdgeObserver) {
      this.topEdgeObserver.disconnect()
    }
    if (this.bottomEdgeObserver) {
      this.bottomEdgeObserver.disconnect()
    }
    if (this.scroll) {
      this.scroll.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleEmojiOver(emoji) {
    var { preview } = this
    if (!preview) {
      return
    }

    // Use Array.prototype.find() when it is more widely supported.
    const emojiData = this.CUSTOM.filter(
      (customEmoji) => customEmoji.id === emoji.id,
    )[0]
    for (let key in emojiData) {
      if (emojiData.hasOwnProperty(key)) {
        emoji[key] = emojiData[key]
      }
    }

    preview.setState({ emoji })
    clearTimeout(this.leaveTimeout)
  }

  handleEmojiLeave(emoji) {
    var { preview } = this
    if (!preview) {
      return
    }

    this.leaveTimeout = setTimeout(() => {
      preview.setState({ emoji: null })
    }, 16)
  }

  handleEmojiClick(emoji, e) {
    this.props.onClick(emoji, e)
    this.handleEmojiSelect(emoji)
  }

  handleEmojiSelect(emoji) {
    this.props.onSelect(emoji)
    if (!this.hideRecent && !this.props.recent) frequently.add(emoji)

    var component = this.categoryRefs['category-1']
    if (component) {
      window.requestAnimationFrame(() => {
        if (this.SEARCH_CATEGORY.emojis) {
          component.updateDisplay('none')
        }
      })
    }
  }

  handleScroll () {
    // delay so that the scroll handler explicitly happens after intersection observer handlers,
    // to avoid timing issues with clicking anchor links
    requestAnimationFrame(() => requestAnimationFrame(() => this.handleScrollDelayed()))
  }

  handleScrollDelayed() {
    console.log('handleScrollDelayed')
    if (this.SEARCH_CATEGORY.emojis) {
      this.updateActiveCategory(this.SEARCH_CATEGORY)
      return
    }

    const {scrollTop, clientHeight, scrollHeight} = this.scroll
    if (scrollTop === 0) {
      const activeCategory = this.categories[1]
      this.updateActiveCategory(activeCategory)
    } else if (scrollTop + clientHeight >= scrollHeight) {
      const activeCategory = this.categories[this.categories.length - 1]
      this.updateActiveCategory(activeCategory)
    }
  }

  handleIntersection(entries) {
    console.log('handleIntersection')

    const entry = entries.find((entry) => entry.isIntersecting)

    let activeCategory = null
    if (this.SEARCH_CATEGORY.emojis) {
      activeCategory = this.SEARCH_CATEGORY
    } else if (entry) {
      const categoryId = entry.target.dataset.categoryId
      activeCategory = this.categories.find(({ id }) => id === categoryId)
    }
    console.log('activeCategory', activeCategory && activeCategory.name)
    this.updateActiveCategory(activeCategory)
  }

  updateActiveCategory(activeCategory) {
    if (activeCategory) {
      const { anchors } = this
      const { name: categoryName } = activeCategory

      if (anchors.state.selected !== categoryName) {
        anchors.setState({ selected: categoryName })
      }
    }
  }

  handleSearch(emojis) {
    this.SEARCH_CATEGORY.emojis = emojis

    for (let i = 0, l = this.categories.length; i < l; i++) {
      let component = this.categoryRefs[`category-${i}`]

      if (component && component.props.name != 'Search') {
        let display = emojis ? 'none' : 'inherit'
        component.updateDisplay(display)
      }
    }

    this.forceUpdate()
    if (this.scroll) {
      this.scroll.scrollTop = 0
    }
  }

  handleAnchorClick(category, i) {
    const component = this.categoryRefs[`category-${i}`]
    const { scroll } = this
    const scrollToComponent = () => {
      if (component) {
        if (category.first) {
          scroll.scrollTop = 0
        } else {
          const container = component.getContainerRef()
          container.scrollIntoView()
          scroll.scrollTop += 1
        }
      }
    }

    if (this.SEARCH_CATEGORY.emojis) {
      this.handleSearch(null)
      this.search.clear()

      window.requestAnimationFrame(scrollToComponent)
    } else {
      scrollToComponent()
    }
  }

  handleSkinChange(skin) {
    var newState = { skin: skin },
      { onSkinChange } = this.props

    this.setState(newState)
    store.update(newState)

    onSkinChange(skin)
  }

  handleKeyDown(e) {
    let handled = false

    switch (e.keyCode) {
      case 13:
        let emoji

        if (
          this.SEARCH_CATEGORY.emojis &&
          this.SEARCH_CATEGORY.emojis.length &&
          (emoji = getSanitizedData(
            this.SEARCH_CATEGORY.emojis[0],
            this.state.skin,
            this.props.set,
            this.props.data,
          ))
        ) {
          this.handleEmojiSelect(emoji)
          handled = true
        }

        break
    }

    if (handled) {
      e.preventDefault()
    }
  }

  getCategories() {
    return this.categories
  }

  setAnchorsRef(c) {
    this.anchors = c
  }

  setSearchRef(c) {
    this.search = c
  }

  setPreviewRef(c) {
    this.preview = c
  }

  setScrollRef(c) {
    this.scroll = c
    if (this.scroll) {
      this.scroll.addEventListener('scroll', this.handleScroll)
    }
    this.createIntersectionObservers()
  }

  createIntersectionObservers () {
    console.log('createIntersectionObservers', this.scroll)
    if (this.scroll && typeof IntersectionObserver !== 'undefined') {
      if (this.topEdgeObserver) {
        this.topEdgeObserver.disconnect()
      }
      this.topEdgeObserver = new IntersectionObserver(
        this.handleIntersection,
        {
          root: this.scroll,
          rootMargin: '0px 0px -100% 0px', // only observe the top edge of the scroll element
        },
      )
      if (this.bottomEdgeObserver) {
        this.bottomEdgeObserver.disconnect()
      }
      this.bottomEdgeObserver = new IntersectionObserver(
        this.handleIntersection,
        {
          root: this.scroll,
          rootMargin: '-100% 0px 0px 0px' // only observe the bottom edge
        }
      )
      for (let i = 0, l = this.categories.length; i < l; i++) {
        const component = this.categoryRefs[`category-${i}`]
        const container = component.getContainerRef()
        this.topEdgeObserver.observe(container)
        this.bottomEdgeObserver.observe(container)
      }
    }
  }

  setCategoryRef(name, c) {
    if (!this.categoryRefs) {
      this.categoryRefs = {}
    }

    this.categoryRefs[name] = c
  }

  render() {
    var {
        perLine,
        emojiSize,
        set,
        sheetSize,
        sheetColumns,
        sheetRows,
        style,
        title,
        emoji,
        color,
        native,
        backgroundImageFn,
        emojisToShowFilter,
        showPreview,
        showSkinTones,
        emojiTooltip,
        include,
        exclude,
        recent,
        autoFocus,
        skinEmoji,
        notFound,
        notFoundEmoji,
        darkMode,
      } = this.props,
      { skin } = this.state,
      width = perLine * (emojiSize + 12) + 12 + 2 + measureScrollbar()

    return (
      <section
        style={{ width: width, ...style }}
        className={`emoji-mart ${darkMode ? 'emoji-mart-dark' : ''}`}
        aria-label={title}
        onKeyDown={this.handleKeyDown}
      >
        <div className="emoji-mart-bar">
          <Anchors
            ref={this.setAnchorsRef}
            data={this.data}
            i18n={this.i18n}
            color={color}
            categories={this.categories}
            onAnchorClick={this.handleAnchorClick}
            icons={this.icons}
          />
        </div>

        <Search
          ref={this.setSearchRef}
          onSearch={this.handleSearch}
          data={this.data}
          i18n={this.i18n}
          emojisToShowFilter={emojisToShowFilter}
          include={include}
          exclude={exclude}
          custom={this.CUSTOM}
          autoFocus={autoFocus}
        />

        <div ref={this.setScrollRef} className="emoji-mart-scroll">
          {this.getCategories().map((category, i) => {
            return (
              <Category
                ref={this.setCategoryRef.bind(this, `category-${i}`)}
                key={category.name}
                id={category.id}
                name={category.name}
                emojis={category.emojis}
                perLine={perLine}
                native={native}
                data={this.data}
                i18n={this.i18n}
                recent={
                  category.id == this.RECENT_CATEGORY.id ? recent : undefined
                }
                custom={
                  category.id == this.RECENT_CATEGORY.id
                    ? this.CUSTOM
                    : undefined
                }
                emojiProps={{
                  native: native,
                  skin: skin,
                  size: emojiSize,
                  set: set,
                  sheetSize: sheetSize,
                  sheetColumns: sheetColumns,
                  sheetRows: sheetRows,
                  forceSize: native,
                  tooltip: emojiTooltip,
                  backgroundImageFn: backgroundImageFn,
                  onOver: this.handleEmojiOver,
                  onLeave: this.handleEmojiLeave,
                  onClick: this.handleEmojiClick,
                }}
                notFound={notFound}
                notFoundEmoji={notFoundEmoji}
              />
            )
          })}
        </div>

        {(showPreview || showSkinTones) && (
          <div className="emoji-mart-bar">
            <Preview
              ref={this.setPreviewRef}
              data={this.data}
              title={title}
              emoji={emoji}
              showSkinTones={showSkinTones}
              showPreview={showPreview}
              emojiProps={{
                native: native,
                size: 38,
                skin: skin,
                set: set,
                sheetSize: sheetSize,
                sheetColumns: sheetColumns,
                sheetRows: sheetRows,
                backgroundImageFn: backgroundImageFn,
              }}
              skinsProps={{
                skin: skin,
                onChange: this.handleSkinChange,
                skinEmoji: skinEmoji,
              }}
              i18n={this.i18n}
            />
          </div>
        )}
      </section>
    )
  }
}

NimblePicker.propTypes /* remove-proptypes */ = {
  ...PickerPropTypes,
  data: PropTypes.object.isRequired,
}
NimblePicker.defaultProps = { ...PickerDefaultProps }
