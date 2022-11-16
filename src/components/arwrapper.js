import link from './link'
import {
  IS_IOS,
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './utils'

const placeholderAR = 'https://viewer.cgtarsenal.com/js/images/view-in-ar.png'
const placeholder3D = 'https://viewer.cgtarsenal.com/js/images/view-in-3d.png'

function placeholderSrc() {
  if ((IS_IOS && IS_AR_QUICKLOOK_CANDIDATE()) || IS_ANDROID) {
    return placeholderAR
  }

  return placeholder3D
}

export default function ARWrapper(viewerUrl, gltfUrl, usdzUrl, target) {
  if (!target) {
    return
  }

  // Get formatted link
  const tempLink = link(viewerUrl, gltfUrl, usdzUrl, true)

  // Find target parent
  const parent = target?.parentNode

  // Replace target with wrapped target
  target?.remove()

  // Check if target is not empty
  if (target && target.nodeName !== "IMG" && target.innerHTML === '') {
    const placeholder = document.createElement('img')

    placeholder.setAttribute('src', placeholderSrc())
    placeholder.setAttribute('alt', 'View in 3D')

    // Wrap target component
    tempLink?.appendChild(placeholder)
  } else {
    // Wrap target component
    tempLink?.appendChild(target)
  }

  tempLink.setAttribute('alt', 'View in 3D')

  return parent?.appendChild(tempLink)
}
