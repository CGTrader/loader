import axios from 'axios'

function yeet(uid, platform, action, token) {
  const payload = { embed: { content_group: platform, action } }
  const url = `https://arsenal.cgtrader.com/api/v1/product-viewers/${uid}/track`
  const headers = { 'Authorization': token, 'Access-Control-Allow-Origin': '*' }

  axios.post(url, payload, { headers: headers })
    .catch((e) => console.error(e))
}

export default yeet
