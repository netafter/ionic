
const nativeRaf= window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame
const nativeCancelRaf = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame

export const raf = nativeRaf || function(callback) {
  return window.setTimeout(callback, 16.6667)
}
export const rafCancel = nativeRaf ? nativeCancelRaf : function(id) {
  return window.cancelTimeout(id)
}
export function rafPromise() {
  return new Promise(resolve => raf(resolve))
}


// We only need to test for webkit in our supported browsers. Webkit is the only browser still
// using prefixes.
// Code adapted from angular-animate.js
export let css = {}
if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
  css.prefix = 'webkit'
  css.transition = 'webkitTransition'
  css.transform = 'webkitTransform'
  css.transitionEnd = 'webkitTransitionEnd transitionend'
} else {
  css.prefix = ''
  css.transform = 'transform'
  css.transition = 'transition'
  css.transitionEnd = 'transitionend'
}

export function transitionEndPromise(el:Element) {
  return new Promise(resolve => {
    css.transitionEnd.split(' ').forEach(eventName => {
      el.addEventListener(eventName, onTransitionEnd)
    })
    function onTransitionEnd(ev) {
      // Don't allow bubbled transitionend events
      if (ev.target !== el) {
        return
      }
      css.transitionEnd.split(' ').forEach(eventName => {
        el.removeEventListener(css.transitionEnd, onTransitionEnd)
      })
      resolve(ev)
    }
  })
}

export function ready() {
  return new Promise(resolve => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(resolve)

    } else {

      function completed() {
        resolve()
        document.removeEventListener('DOMContentLoaded', completed, false)
        window.removeEventListener('load', completed, false)
      }

      document.addEventListener('DOMContentLoaded', completed, false)
      window.addEventListener('load', completed, false)
    }
  })
}

export function windowLoad() {
  return new Promise(resolve => {
    if (document.readyState === 'complete') {
      setTimeout(resolve)

    } else {

      function completed() {
        resolve()
        window.removeEventListener('load', completed, false)
      }

      window.addEventListener('load', completed, false)
    }
  })
}