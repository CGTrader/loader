const win = typeof window !== 'undefined' ? window : global
const doc = typeof document !== 'undefined' ? document : { createElement: () => ({}) }
const nav = win.navigator
const UA = typeof nav !== 'undefined' ? nav.userAgent : ''
const platform = typeof nav !== 'undefined' ? nav.platform : ''
const maxTouchPoints = typeof nav !== 'undefined' ? nav.maxTouchPoints : ''

// Viewer repo
export const URL = 'https://viewer.cgtarsenal.com/'

// iOS checks
export const IS_IOS = (/iPad|iPhone|iPod/.test(UA) && !win.MSStream) ||
  (platform === 'MacIntel' && maxTouchPoints > 1);

export function IS_AR_QUICKLOOK_CANDIDATE() {
  const tempEl = doc.createElement('a')

  return tempEl.relList && tempEl.relList.supports && tempEl.relList.supports('ar')
}

// Android checks
export const IS_ANDROID = /android/i.test(UA)
