import link from './link'

export default function QRGenerator(viewerUrl, gltfUrl, usdzUrl, landingUrl, target) {
  const QRCode = require('qrcode-svg')
  const qrcode = new QRCode({
    content: landingUrl,
    join: true,
    container: "svg-viewbox",
    xmlDeclaration: false
  }).svg()

  // Get formatted link
  const tempLink = link(viewerUrl, gltfUrl, usdzUrl)

  const img = new Image()
  img.src = 'data:image/svg+xml;base64,' + window.btoa(qrcode)

  tempLink.appendChild(img)

  return target.appendChild(tempLink)
}
