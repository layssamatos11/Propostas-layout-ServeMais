import { productCard } from '../components/product-card.js'
import { CAMPANHAS } from '../data/ofertas.js'
import { CATS } from '../data/site.js'
import { filteredOffers } from '../domain/query.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

function pressed(on) {
  return on ? ' aria-pressed="true"' : ' aria-pressed="false"'
}

export function ofertasPage() {
  const chips = CATS.map((cat) => {
    const on = state.cat === cat
    return `<button type="button" data-act="cat" data-cat="${esc(cat)}"${pressed(on)}>${esc(cat)}</button>`
  }).join('')
  const camps = CAMPANHAS.map((camp) => {
    return `<button class="campanha campanha-${camp.id}" type="button" data-act="campanha" data-campanha="${camp.id}">
      <strong>${esc(camp.nome)}</strong>
      <span>Banner e validade da campanha [a fornecer]</span>
    </button>`
  }).join('')
  return `<section class="hero-ofertas">
    <div class="wrap">
      <p class="pill pill-red">Ofertas da semana</p>
      <h1>Economia que cabe no carrinho.</h1>
      <p>Cada oferta mostra preço, foto e validade. Sem pegadinha.</p>
      <div class="chips">${chips}</div>
    </div>
  </section>
  <section class="wrap vitrine">
    <div class="produtos" id="offerGrid"></div>
    <h2>Campanhas</h2>
    <div class="campanhas">${camps}</div>
  </section>`
}

export function mountOfertas() {
  const grid = document.getElementById('offerGrid')
  if (!grid) return
  const items = filteredOffers()
  grid.innerHTML = items.map(productCard).join('') || '<p class="empty">Nenhuma oferta nesta prateleira de exemplo.</p>'
  document.querySelectorAll('[data-cat]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.cat === state.cat))
  })
}

export function campanhaById(id) {
  return CAMPANHAS.find((item) => item.id === id)
}
