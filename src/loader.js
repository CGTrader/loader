import Embed from './components/embed'

(function() {
  const arsenal = window.arsenal || {}
  const {
    sku = null,
    target = null,
    path = 'https://arsenal-embeds.cgtrader.com/embed/',
  } = arsenal
  const domTarget = document.querySelector(target)
  const iframe = new Embed(path + sku)

  // Check if target exists
  if (!target) {
    console.error('Target not found')
  }

  // Append iframe to target placeholder
  return domTarget.appendChild(iframe)
})()
