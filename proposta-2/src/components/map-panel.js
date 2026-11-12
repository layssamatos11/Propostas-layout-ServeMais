import { LOJAS } from '../data/lojas.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function mapPanel() {
  const pins = LOJAS.map((loja) => {
    const on = state.pin === loja.id ? ' on' : ''
    return `<button class="pin${on}" type="button" style="left:${loja.x}%;top:${loja.y}%" data-act="pin" data-id="${loja.id}" aria-label="${esc(loja.nome)}, ${esc(loja.bairro)}"></button>`
  }).join('')
  return `<div class="mapa" role="img" aria-label="Mapa ilustrativo de Cuiabá e Várzea Grande">
    <span class="mapa-cidade cba">Cuiabá</span>
    <span class="mapa-cidade vg">Várzea Grande</span>
    <span class="rio"></span>
    ${pins}
    <p>Mapa ilustrativo. O Google Maps entra com os endereços oficiais.</p>
  </div>`
}
