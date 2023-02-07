const win = typeof window !== 'undefined' ? window : global
const doc = typeof document !== 'undefined' ? document : { createElement: () => ({}) }
const nav = win.navigator
const UA = typeof nav !== 'undefined' ? nav.userAgent : ''
const platform = typeof nav !== 'undefined' ? nav.platform : ''
const maxTouchPoints = typeof nav !== 'undefined' ? nav.maxTouchPoints : ''

// Constants
export const URL = 'https://viewer.cgtarsenal.com/'
export const ARParam = 'cgtAR'

// iOS checks
export const IS_IOS = (/iPad|iPhone|iPod/.test(UA) && !win.MSStream) || (platform === 'MacIntel' && maxTouchPoints > 1)
export const IS_WKWEBVIEW = Boolean(window.webkit && window.webkit.messageHandlers)

// If running in iOS Safari proper, and not within a WKWebView component instance, check for ARQL feature support.
// Otherwise, if running in a WKWebView instance, check for known ARQL compatible iOS browsers, including:
// Chrome (CriOS), Edge (EdgiOS), Firefox (FxiOS), Google App (GSA), DuckDuckGo (DuckDuckGo).
// All other iOS browsers / apps will fail by default.
// source: https://github.com/google/model-viewer/pull/3784
export function IS_AR_QUICKLOOK_CANDIDATE() {
  if (IS_IOS) {
    if (!IS_WKWEBVIEW) {
      const tempAnchor = doc.createElement('a')
      return Boolean(tempAnchor.relList && tempAnchor.relList.supports && tempAnchor.relList.supports('ar'))
    } else {
      return Boolean(/CriOS\/|EdgiOS\/|FxiOS\/|GSA\/|DuckDuckGo\//.test(UA))
    }
  } else {
    return false;
  }
}

// Android checks
export const IS_ANDROID = /android/i.test(UA)

// Build URL
export function urlBuilder(item, user, uid) {
  return !!item ? `${URL}${user}/${uid}/${item}` : undefined
}

// Viewer params
export function getViewerParams(query, arsenal, multipleViewers) {
  const params = query.substr(1).split('&')
  let ID = null

  for (let i = 0; i < params.length; i++) {
    const newParam = params[i].split('=')

    if (newParam[0] === ARParam) {
      ID = newParam[1]
    }
  }

  if (!ID) return false

  if (multipleViewers) {
    const currentViewer = arsenal.filter((viewer) => viewer.uid === ID)
    return currentViewer[0]
  }
}
