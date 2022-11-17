import link from './link'
import {
  IS_IOS,
  IS_AR_QUICKLOOK_CANDIDATE,
  IS_ANDROID,
} from './utils'
import Button from './button'
import ARModal from './armodal'
import redirect from './redirect'

const styles = `
  #arsenal-button {
    background-color: #ffffff;
    border: 1px solid #636770;
    border-radius: 2px;
    display: flex;
    padding-right: 12px;
    min-width: fit-content;
    height: 34px;
    cursor: pointer;
  }
  
  #arsenal-button .arsenal-button__icon {
    width: 24px;
    align-self: center;
    margin-right: 4px;
    margin-left: 8px;
  }
  
  #arsenal-button .arsenal-button__text {
    font-size: 11px;
    text-transform: uppercase;
    align-self: center;
  }
  
  .arsenal-modal-curtain {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    opacity: 0;
    transition: opacity .4s ease;
    z-index: 2000;
    will-change: opacity;
  }
  
  .arsenal-modal-curtain.is-shown {
    opacity: 1;
  }
  
  .arsenal-modal {
    position: relative;
    display: flex;
    width: 90%;
    max-width: 480px;
    max-height: 100vh;
    padding: 32px;
    background: #ffffff;
    pointer-events: auto;
    z-index: 2001;
    flex-direction: column;
    text-align: center;
    overflow: auto;
  }
  
  .arsenal-modal__title {
    font-size: 24px;
    padding: 12px 0;
  }
  
  .arsenal-modal__text {
    padding: 4px 0;
    font-size: 14px;
    line-height: 22px;
  }
  
  .arsenal-modal__text--small {
    padding: 4px 0;
    font-size: 12px;
    line-height: 18px;
  }
  
  .arsenal-modal__qr {
    padding: 0 48px;
  }
  
  .arsenal-modal__close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
    z-index: 2002;
    cursor: pointer;
  }
`

export default function GalleryButton(landingPath, gltfUrl, usdzUrl, target, uid, token) {
  if (!target) {
    return
  }

  function onClick() {
    redirect(uid, token, landingPath, gltfUrl, usdzUrl, 'click_gallery_button', openModal)
  }

  const modal = ARModal(landingPath, closeModal)

  function openModal() {
    document.body.style.overflow = 'hidden'
    document.body?.appendChild(modal)
    setTimeout(() => modal.classList.add('is-shown'), 10)
  }

  function closeModal(e, bypass = false) {
    if (!(e.target === modal || bypass)) return

    document.body.style.overflow = null
    modal?.classList?.remove('is-shown')
    setTimeout(() => modal?.remove(), 410)
  }

  modal.addEventListener('click', (event) => closeModal(event))

  // Add styles to head
  const styleSheet = document.createElement('style')
  styleSheet.innerHTML = styles
  document.head.appendChild(styleSheet)

  const placeholder = Button(onClick)

  return target?.appendChild(placeholder)
}
