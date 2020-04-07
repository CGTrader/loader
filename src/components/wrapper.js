function wrapComponent(target, tempLink) {
  // Find target parent
  const parent = target.parentNode

  // Wrap target component
  tempLink.appendChild(target)

  // Replace target with wrapped target
  target.remove()

  return parent.appendChild(tempLink)
}

export function IOS_WRAPPER(href, target) {
  const tempLink = document.createElement('a')
  tempLink.setAttribute('href', href)
  tempLink.setAttribute('rel', 'ar')

  wrapComponent(target, tempLink)
}

export function ANDROID_WRAPPER(href, target, fallback) {
  const tempLink = document.createElement('a')
  tempLink.setAttribute('rel', 'ar')

  const viewerURL = new URL('intent://arvr.google.com/scene-viewer/1.0')
  viewerURL.search = `file=${href}?mode=ar_only`

  const url = [
    viewerURL.toString(),
    '#Intent;',
    `scheme=https;`,
    'package=com.google.ar.core;',
    'action=android.intent.action.VIEW;',
    `S.browser_fallback_url=${encodeURIComponent(fallback.toString())};`,
    'end;',
  ].join('')


  tempLink.setAttribute('href', url)

  wrapComponent(target, tempLink)
}

export function DESKTOP_WRAPPER(href, target) {
  const tempLink = document.createElement('a')
  tempLink.setAttribute('href', href)
  tempLink.setAttribute('target', '_blank')

  wrapComponent(target, tempLink)
}
