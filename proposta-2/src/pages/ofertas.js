import { productCard } from '../components/product-card.js'
import { ticker } from '../components/ticker.js'
import { storeOptions } from '../components/chrome.js'
import { CAMPANHAS, SETORES } from '../data/setores.js'
import { FAIXAS } from '../data/site.js'
import { filteredOffers } from '../domain/query.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'
import { paintCommerce } from '../components/receipt.js'

function pressed(active) {
  return active ? ' aria-pressed="true"' : ' aria-pressed="false"'
}

export function ofertasPage() {
  const corridors = SETORES.map((setor) => {
    const on = state.corredor === setor.nome
    return `<button type="button" data-act="corredor" data-corredor="${esc(setor.nome)}"${pressed(on)}>${esc(setor.nome)}</button>`
  }).join('')
  const camps = CAMPANHAS.map((camp) => {
    const on = state.campanha === camp
    return `<button type="button" data-act="campanha" data-campanha="${esc(camp)}"${pressed(on)}>${esc(camp)}</button>`
  }).join('')
  const bands = FAIXAS.map((faixa) => {
    const on = state.faixa === faixa.id
    return `<button type="button" data-act="faixa" data-faixa="${faixa.id}"${pressed(on)}>${faixa.label}</button>`
  }).join('')
  const felitaOn = state.marca === 'felita'
  return `<section class="wrap page-head">
    <h1>Ofertas da semana</h1>
    <div class="offer-tools">
      <label>Unidade <select id="unidade">${storeOptions(state.loja)}</select></label>
      <p>Válido de 00/00 a 00/00 (exemplo)</p>
    </div>
  </section>
  ${ticker('Ofertão da semana · Fecha mês · Ofertas sazonais · ')}
  <section class="wrap ofertas-layout">
    <aside class="filtros">
      <h2>Corredores</h2>
      <div class="filtro-list">
        <button type="button" data-act="limpar-filtros"${pressed(!state.corredor && !state.campanha && state.marca !== 'felita')}>Todas</button>
        ${corridors}
      </div>
      <h2>Campanha</h2>
      <div class="filtro-list">${camps}<button type="button" data-act="marca" data-marca="felita"${pressed(felitaOn)}>Felitá</button></div>
      <h2>Faixa de preço (exemplo)</h2>
      <div class="filtro-list">${bands}</div>
    </aside>
    <div>
      <div class="offer-search">
        <label class="sr-only" for="qOferta">Buscar um produto</label>
        <input id="qOferta" type="search" placeholder="Busque na gôndola" value="${esc(state.oq)}">
        <p id="offerCount"></p>
      </div>
      <div class="gondolas" id="offerGrid"></div>
      <p class="center"><button class="btn btn-line" type="button" id="loadMore" data-act="mais">Carregar mais ofertas</button></p>
      <article class="camp-banner">
        <div>
          <p>Fecha Mês</p>
          <h2>Campanha com data e regras</h2>
        </div>
        <button class="btn btn-red" type="button" data-act="regulamento">Ver regulamento</button>
      </article>
    </div>
    <aside class="cupom ofertas-cupom" data-receipt></aside>
  </section>`
}

export function mountOfertas() {
  const grid = document.getElementById('offerGrid')
  if (!grid) return
  const all = filteredOffers()
  const slice = all.slice(0, state.limite)
  grid.innerHTML = slice.map(productCard).join('') || '<p class="empty">Nenhuma oferta com esses filtros. Tente outro corredor ou limpe a busca.</p>'
  const count = document.getElementById('offerCount')
  if (count) count.textContent = `${all.length} ${all.length === 1 ? 'oferta' : 'ofertas'}`
  const more = document.getElementById('loadMore')
  if (more) more.hidden = state.limite >= all.length || !all.length
  paintCommerce()
}
