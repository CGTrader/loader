function Embed(source) {
  const iframe = document.createElement('iframe')

  iframe.src = source
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.style.border = '0'
  iframe.style.backgroundColor = '#ffffff'
  iframe.allowFullscreen = 'allowfullscreen'

  return iframe
}

export default Embed
