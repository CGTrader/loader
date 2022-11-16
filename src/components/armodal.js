import closeIcon from '../images/close.svg'

export default function ARModal(landingUrl, close) {
  const QRCode = require('qrcode-svg')
  const qrcode = new QRCode({
    content: landingUrl,
    join: true,
    container: "svg-viewbox",
    xmlDeclaration: false
  }).svg()

  const modalContents = `
    <div class="arsenal-modal">
      <div class="arsenal-modal__title">SCAN QR CODE</div>
      <div class="arsenal-modal__text">
        Point your mobile device camera at the QR code below to see this product come to life in augmented reality!*
      </div>
      <div class="arsenal-modal__qr">
        ${qrcode}
      </div>
      <div class="arsenal-modal__text--small">
        *Augmented reality experience is currently supported on the following devices:<br>
        iPhone on iOS 12+<br>
        Android 8.0+ with ARCore 1.9+ support
      </div>
    </div>
  `

  const modal = document.createElement('div')
  const closeModalBtn = document.createElement('div')

  modal.classList.add('arsenal-modal-curtain')
  modal.innerHTML = modalContents

  // Add properties to close button
  closeModalBtn.classList.add('arsenal-modal__close')
  closeModalBtn.innerHTML = closeIcon
  closeModalBtn.addEventListener('click', (event) => close(event, true))

  // Add close button to modal
  modal.children[0]?.appendChild(closeModalBtn)

  return modal
}
