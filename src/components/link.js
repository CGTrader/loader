import {
  IS_IOS,
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './utils'

export default function link(viewerUrl, gltfUrl, usdzUrl, isFromARWrapper = false) {
  const tempLink = document.createElement('a')
  // const url = isFromARWrapper ? viewerUrl : usdzUrl

  if (IS_IOS && IS_AR_QUICKLOOK_CANDIDATE()) {
    tempLink.setAttribute('href', usdzUrl)
    tempLink.setAttribute('rel', 'ar')
  } else if (IS_ANDROID) {
    const androidViewer = new URL('intent://arvr.google.com/scene-viewer/1.0')
    androidViewer.search = `file=${gltfUrl}&mode=ar_preferred`

    const url = [
      androidViewer.toString(),
      '#Intent;',
      `scheme=https;`,
      'package=com.google.ar.core;',
      'action=android.intent.action.VIEW;',
      `S.browser_fallback_url=${encodeURIComponent(androidViewer.toString())};`,
      'end;',
    ].join('')

    tempLink.setAttribute('rel', 'ar')
    tempLink.setAttribute('href', url)
  } else {
    tempLink.setAttribute('href', viewerUrl)
    tempLink.setAttribute('target', '_blank')
  }

  return tempLink
}
