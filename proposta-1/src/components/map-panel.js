import { LOJAS } from '../data/lojas.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

function pins() {
  return LOJAS.map((loja) => {
    return `<button class="pin" type="button" style="left:${loja.x}%;top:${loja.y}%" data-act="pin" data-id="${loja.id}" aria-label="${esc(loja.nome)}, ${esc(loja.bairro)}"></button>`
  }).join('')
}

export function mapPanel({ compact = false } = {}) {
  return `<div class="map${compact ? ' compact' : ''}">
    <div class="map-canvas" id="mapCanvas">
      <span class="region cba">Cuiabá</span>
      <span class="region vg">Várzea Grande</span>
      <span class="river"></span>
      ${pins()}
      <div class="map-pop" id="mapPop" hidden></div>
    </div>
    <div class="zoom">
      <button type="button" data-act="zoom" data-dir="1" aria-label="Aproximar mapa">+</button>
      <button type="button" data-act="zoom" data-dir="-1" aria-label="Afastar mapa">−</button>
    </div>
    <p class="map-note">Mapa ilustrativo. O Google Maps entra quando os endereços oficiais forem cadastrados.</p>
  </div>`
}

export function applyZoom() {
  const canvas = document.getElementById('mapCanvas')
  if (canvas) canvas.style.transform = `scale(${state.zoom})`
}
