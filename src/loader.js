import Embed from './components/embed'
import { URL } from './components/utils'
import QRGenerator from './components/qrgenerator'
import ARWrapper from './components/arwrapper'
import GalleryButton from './components/gallerybutton'
import Metadata from './components/metadata'

(function() {
  const arsenal = window.arsenal || {}

  function createViewer(viewerParams) {
    const {
      uid = null,
      user = null,
      target = null,
      viewer = null,
      gltf = null,
      usdz = null,
      preview = null,
      name = null,
      token = null,
    } = viewerParams
    const domTarget = document.querySelector(target)

    // Check if required viewer props are defined
    if (!uid && !user && !viewer && !target) {
      return console.error('Required params missing for', uid)
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

    Metadata(previewPath, gltfPath, usdzPath, name, domTarget)

    switch (viewer) {
      case 'QR':
        return QRGenerator(viewerPath, gltfPath, usdzPath, landingPath, domTarget);
      case 'AR':
        return ARWrapper(viewerPath, gltfPath, usdzPath, domTarget);
      case 'Button':
        return GalleryButton(landingPath, gltfPath, usdzPath, domTarget, uid, token);
      default:
        return embedIframe();
    }
  }

  if (Array.isArray(arsenal)) {
    arsenal.map((viewer) => createViewer(viewer))
  } else {
    createViewer(arsenal)
  }
})()
