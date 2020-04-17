function Metadata(image, gltf, usdz, name) {
  const script = document.createElement('script')

  function returnValue(title, value) {
    return `"${title}": "${value}",`
  }

  const data = `{
    "@context": "http://schema.org/",
    "@type": "3DModel",
    ${image ? returnValue('image', image) : ''}
    ${name ? returnValue('name', name) : ''}
    "encoding": [
    {
      "@type":"MediaObject",
      "contentUrl": "${gltf}", "encodingFormat": "model/gltf-binary"
    }, {
      "@type":"MediaObject",
      "contentUrl": "${usdz}", "encodingFormat": "model/vnd.usdz+zip"
    } ]
  }`

  script.type = "application/ld+json"
  script.text = data.replace(/^\s*[\r\n]/gm, '') // Remove empty lines caused by missing params

  document.body.appendChild(script)
}

export default Metadata
