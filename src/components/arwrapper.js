import link from './link'

export default function ARWrapper(viewerUrl, gltfUrl, usdzUrl, target) {
  // Get formatted link
  const tempLink = link(viewerUrl, gltfUrl, usdzUrl)

  // Find target parent
  const parent = target.parentNode

  // Replace target with wrapped target
  target.remove()

  // Wrap target component
  tempLink.appendChild(target)

  return parent.appendChild(tempLink)
}
