import link from './link'

export default function QRGenerator(viewerUrl, gltfUrl, usdzUrl, landingUrl, target) {
  const QRCode = require('qrcode-svg');
  const qrcode = new QRCode({
    content: landingUrl,
    join: true,
    container: "svg-viewbox" //Useful but not required
  }).svg()

  // Get formatted link
  const tempLink = link(viewerUrl, gltfUrl, usdzUrl)

  tempLink.innerHTML = qrcode

  return target.appendChild(tempLink)
}
