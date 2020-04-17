import Embed from './components/embed'
import { URL } from './components/utils'
import ARWrapper from './components/arwrapper'
import QRGenerator from './components/qrgenerator'
import Metadata from './components/metadata'

(function() {
  const arsenal = window.arsenal || {}
  const {
    uid = null,
    user = null,
    target = null,
    viewer = null,
    gltf = null,
    usdz = null,
    preview = null,
    name = null,
  } = arsenal
  const domTarget = document.querySelector(target)

  // Check if required viewer props are defined
  if (!uid && !user && !viewer && !target) {
    return console.error('Required params missing')
  }

  function urlBuilder(item) {
    return !!item ? `${URL}${user}/${uid}/${item}` : undefined
  }

  // Build all the URL's
  const viewerPath = urlBuilder('viewer')
  const previewPath = urlBuilder(preview)
  const gltfPath = urlBuilder(gltf)
  const usdzPath = urlBuilder(usdz)
  const landingPath = urlBuilder('landing')

  // Build iframe
  function embedIframe() {
    const iframe = new Embed(viewerPath)

    // Append iframe to target placeholder
    domTarget.appendChild(iframe)
  }

  Metadata(previewPath, gltfPath, usdzPath, name)

  switch (viewer) {
    case 'QR':
      return QRGenerator(viewerPath, gltfPath, usdzPath, landingPath, domTarget);
    case 'AR':
      return ARWrapper(viewerPath, gltfPath, usdzPath, domTarget);
    default:
      return embedIframe();
  }

})()
