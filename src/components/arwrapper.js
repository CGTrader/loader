import link from './link'
import {
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './utils'

const placeholderAR = 'https://viewer.cgtarsenal.com/js/images/view-in-ar.png'
const placeholder3D = 'https://viewer.cgtarsenal.com/js/images/view-in-3d.png'

function placeholderSrc() {
  if (IS_AR_QUICKLOOK_CANDIDATE() || IS_ANDROID) {
    return placeholderAR
  }

  return placeholder3D
}

export default function ARWrapper(viewerUrl, gltfUrl, usdzUrl, target) {
  if (!target) {
    return
  }

  // Get formatted link
  const tempLink = link(viewerUrl, gltfUrl, usdzUrl)

  // Find target parent
  const parent = target.parentNode

  // Replace target with wrapped target
  target.remove()

  // Check if target is not empty
  if (target.nodeName !== "IMG" && target.innerHTML === '') {
    const placeholder = document.createElement('img')

    placeholder.setAttribute('src', placeholderSrc())
    placeholder.setAttribute('alt', 'View in 3D')

    // Wrap target component
    tempLink.appendChild(placeholder)
  } else {
    // Wrap target component
    tempLink.appendChild(target)

    // On iOS for a link to work, first element of the link needs to be an <img>
    if (target.nodeName !== "IMG" && IS_AR_QUICKLOOK_CANDIDATE()) {
      const hiddenImg = document.createElement('img')
      hiddenImg.style = 'display: none'
      tempLink.prepend(hiddenImg)
    }
  }

  return parent.appendChild(tempLink)
}
