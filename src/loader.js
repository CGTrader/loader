import Embed from './components/embed'
import {
  URL,
  IS_IOS,
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './components/utils'
import {
  IOS_WRAPPER,
  ANDROID_WRAPPER,
  DESKTOP_WRAPPER,
} from './components/wrapper'

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

  function embedQR() {
    // Will be done later
    return false
  }

  function embedAR() {
    switch (true) {
      case (IS_IOS && IS_AR_QUICKLOOK_CANDIDATE()):
        return IOS_WRAPPER(pathBuilder(usdz), domTarget);
      case IS_ANDROID:
        return ANDROID_WRAPPER(pathBuilder(gltf), domTarget, pathBuilder('viewer'));
      default:
        return DESKTOP_WRAPPER(pathBuilder('viewer'), domTarget);
    }
  }

  switch (viewer) {
    case 'QR':
      return embedQR();
    case 'AR':
      return embedAR();
    default:
      return embedIframe();
  }

})()
