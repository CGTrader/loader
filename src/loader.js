import Embed from './components/embed'
import { URL } from './components/utils'
import ARWrapper from './components/arwrapper'
import QRGenerator from './components/qrgenerator'

(function() {
  const arsenal = window.arsenal || {}
  const {
    uid = null,
    user = null,
    target = null,
    viewer = null,
    gltf = null,
    usdz = null,
  } = arsenal
  const domTarget = document.querySelector(target)

  // Check if required viewer props are defined
  if (!uid && !user && !viewer && !target) {
    return console.error('Required params missing')
  }

  function pathBuilder(item) {
    return `${URL}${user}/${uid}/${item}`
  }

  function embedIframe() {
    const iframe = new Embed(pathBuilder('viewer'))

    // Append iframe to target placeholder
    return domTarget.appendChild(iframe)
  }

  switch (viewer) {
    case 'QR':
      return QRGenerator(pathBuilder('viewer'), pathBuilder(gltf), pathBuilder(usdz), pathBuilder('landing'), domTarget);
    case 'AR':
      return ARWrapper(pathBuilder('viewer'), pathBuilder(gltf), pathBuilder(usdz), domTarget);
    default:
      return embedIframe();
  }

})()
