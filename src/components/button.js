import threeDee from '../images/three-dimensions.svg'

export default function Button(onClick) {
  // Get formatted link
  const button = document.createElement('div')

  button.id = 'arsenal-button'
  button.onclick = onClick
  button.setAttribute('class', 'arsenal-button__icon')
  button.innerHTML = threeDee + `<span class="arsenal-button__text">View in my room</span>`

  return button
}
