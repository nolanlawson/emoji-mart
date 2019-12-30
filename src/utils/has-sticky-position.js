// Test if the browser supports sticky positioning
// https://caniuse.com/#feat=css-sticky

let supports // cache so we only calculate once

export default function hasStickyPosition() {
  if (typeof supports !== 'boolean') {
    const stickyTestElement = document.createElement('div')

    const prefixes = ['', '-webkit-', '-ms-', '-moz-', '-o-']

    prefixes.forEach(
      (prefix) => (stickyTestElement.style.position = `${prefix}sticky`),
    )

    supports = !!stickyTestElement.style.position.length
  }
  return supports
}
