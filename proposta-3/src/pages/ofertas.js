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
    ${campanhasBlock()}
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

export function campanhasBlock() {
  return `<div class="campanhas">
    <article class="campanha campanha-ofertao">
      <span>Ofertão da semana</span>
      <strong>Toda semana, preço de verdade.</strong>
      <button class="btn btn-yellow" type="button" data-act="campanha" data-campanha="ofertao">Conferir</button>
    </article>
    <article class="campanha campanha-fecha">
      <span>Fecha Mês</span>
      <strong>Economia para fechar o mês.</strong>
      <button class="btn btn-navy" type="button" data-act="campanha" data-campanha="fecha-mes">Conferir</button>
    </article>
    <article class="campanha campanha-sazonal">
      <span>Campanhas sazonais</span>
      <strong>Páscoa, Natal e Festa Junina.</strong>
      <p class="campanha-desc">Datas e períodos oficiais ainda serão definidos pela rede.</p>
      <button class="btn btn-yellow" type="button" data-act="campanha" data-campanha="sazonais">Conferir</button>
    </article>
    <article class="campanha campanha-especial">
      <span class="faixa-mini" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span>Ações especiais</span>
      <strong>Dias de desconto e parcerias da rede.</strong>
      <p class="campanha-desc">Calendário oficial publicado aqui quando a campanha for lançada.</p>
      <button class="btn btn-red" type="button" data-act="campanha" data-campanha="acoes">Conferir</button>
    </article>
  </div>`
}
