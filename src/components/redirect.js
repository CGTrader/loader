import {
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './utils'
import link from './link'
import yeet from './yeet'

export default function redirect(uid, token, landingPath, gltfUrl, usdzUrl, trackAction, callback) {
  const tempLink = link(landingPath, gltfUrl, usdzUrl)

  if (IS_AR_QUICKLOOK_CANDIDATE()) {
      const image = new Image()

      tempLink.appendChild(image)

      yeet(uid, 'arkit', trackAction, token)

      return tempLink.click()
  }

  if (IS_ANDROID) {
      yeet(uid, 'arcore', trackAction, token)

      return tempLink.click()
  }

  yeet(uid, 'desktop', trackAction, token)

  return callback()
}
