// basic debounce function to execute something after a certain number of milliseconds

export default function debounce (func, delayInMs) {
  let timeout
  return () => {
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      timeout = null
      func()
    }, delayInMs)
  }
}
