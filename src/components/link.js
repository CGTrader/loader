import {
  IS_IOS,
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './utils'

export default function link(viewerUrl, gltfUrl, usdzUrl) {
  const tempLink = document.createElement('a')

  if (IS_IOS && IS_AR_QUICKLOOK_CANDIDATE()) {
    tempLink.setAttribute('href', usdzUrl)
    tempLink.setAttribute('rel', 'ar')
  } else if (IS_ANDROID) {
    const viewerURL = new URL('intent://arvr.google.com/scene-viewer/1.0')
    viewerURL.search = `file=${gltfUrl}&mode=ar_preferred`

    const url = [
      viewerURL.toString(),
      '#Intent;',
      `scheme=https;`,
      'package=com.google.ar.core;',
      'action=android.intent.action.VIEW;',
      `S.browser_fallback_url=${encodeURIComponent(viewerUrl.toString())};`,
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
