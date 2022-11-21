import Embed from './components/embed'
import { getViewerParams, urlBuilder, ARParam } from './components/utils'
import QRGenerator from './components/qrgenerator'
import ARWrapper from './components/arwrapper'
import GalleryButton from './components/gallerybutton'
import Metadata from './components/metadata'
import redirect from './components/redirect'

(function() {
  const arsenal = window.arsenal || {}
  const multipleViewers = Array.isArray(arsenal)
  const status = {
    metadataMissing: true
  }
  const currentURL = window.location || { search: '' }
  const currentURLSearch = currentURL.search
  const shouldRedirect = currentURLSearch.search(ARParam) > -1

  if (shouldRedirect) {
    const viewer = multipleViewers ? getViewerParams(currentURLSearch, arsenal, multipleViewers) : arsenal
    const {
      uid,
      token,
      gltf,
      usdz,
      user,
    } = viewer
    const gltfPath = urlBuilder(gltf, user, uid)
    const usdzPath = urlBuilder(usdz, user, uid)

    redirect(uid, token, null, gltfPath, usdzPath, 'redirect_qr_code', () => {})
  }

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

    if (document && (!domTarget || !viewer)) {
      return console.warn(`Viewer type: ${viewer} for product: ${name} did not find target: ${target}`)
    }

    // Check if required viewer props are defined
    if (!uid && !user && !viewer && !target) {
      return console.error('Required params missing for', uid)
    }

    // Build all the URL's
    const viewerPath = urlBuilder(viewer === '360HD' ? 'rotator' : 'viewer', user, uid)
    const previewPath = urlBuilder(preview, user, uid)
    const gltfPath = urlBuilder(gltf, user, uid)
    const usdzPath = urlBuilder(usdz, user, uid)
    const landingPath = urlBuilder('landing', user, uid)

    // Build iframe
    function embedIframe() {
      const iframe = new Embed(viewerPath)

      // Append iframe to target placeholder
      domTarget.appendChild(iframe)
    }

    if (status.metadataMissing) {
      Metadata(previewPath, gltfPath, usdzPath, name, domTarget)
      status.metadataMissing = false
    }

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
