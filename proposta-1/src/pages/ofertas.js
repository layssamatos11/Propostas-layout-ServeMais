import { filterChips } from '../components/filter-chips.js'
import { productCard } from '../components/product-card.js'
import { unitSelect } from '../components/loja-card.js'
import { FILTROS } from '../data/setores.js'
import { lojaById } from '../data/lojas.js'
import { filteredOffers, sortedOffers } from '../domain/query.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'
import { paintQty } from '../components/shopping-list.js'

function orderOptions() {
  const options = [
    ['desconto', 'Maior desconto'],
    ['menor', 'Menor preço'],
    ['maior', 'Maior preço'],
    ['nome', 'Nome'],
  ]
  return options.map(([value, label]) => {
    const selected = state.ordem === value ? ' selected' : ''
    return `<option value="${value}"${selected}>${label}</option>`
  }).join('')
}

export function ofertasPage() {
  return `<section class="wrap page-hero">
    <span class="blob" aria-hidden="true"></span>
    <h1>Ofertas</h1>
    <p class="sub lead-narrow">Confira as promoções da semana e das campanhas da rede. Valores meramente ilustrativos.</p>
    <div class="toolbar">
      <div class="chips" id="filtros">${filterChips(FILTROS, 'filtro', state.filtro)}</div>
    </div>
    <div class="toolbar">
      <input class="search" id="qOferta" type="search" placeholder="Buscar um produto" value="${esc(state.oq)}" aria-label="Buscar um produto">
      <label class="sr-only" for="ordem">Ordenar</label>
      <select id="ordem" aria-label="Ordenar ofertas">${orderOptions()}</select>
    </div>
    <p class="note" id="precoNota"></p>
    <div class="toolbar toolbar-tight">
      <label for="unidade" class="field-label">Selecione sua unidade para ver preços locais</label>
      ${unitSelect()}
      <span id="offerCount" class="note"></span>
    </div>
    <div class="grid" id="offerGrid"></div>
    <div class="banner" id="campBanner">
      <span class="orb"></span>
      <div class="txt">
        <span class="kicker banner-kicker">FECHA MÊS</span>
        <h2 class="banner-title">Campanha em destaque</h2>
        <p>Banner de campanha com período de validade, regras resumidas e botão de ação (exemplo).</p>
        <div class="banner-actions">
          <button class="btn banner-cta" type="button" data-act="regulamento" data-camp="Fecha Mês">Ver regulamento</button>
        </div>
      </div>
    </div>
    <div class="center">
      <button class="btn btn-line" type="button" id="loadMore" data-act="mais">Carregar mais ofertas</button>
    </div>
  </section>`
}

export function mountOfertas() {
  const grid = document.getElementById('offerGrid')
  if (!grid) return
  const all = sortedOffers(filteredOffers())
  const slice = all.slice(0, state.limite)
  grid.innerHTML = slice.map(productCard).join('')
    || '<div class="empty empty-span">Nenhuma oferta com esse filtro. Tente outra categoria ou limpe a busca.</div>'
  document.getElementById('offerCount').textContent = `${all.length}${all.length === 1 ? ' oferta' : ' ofertas'}`
  const more = document.getElementById('loadMore')
  if (more) more.hidden = state.limite >= all.length || all.length === 0
  document.querySelectorAll('[data-filtro]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filtro === state.filtro))
  })
  const note = document.getElementById('precoNota')
  if (note) {
    note.textContent = state.loja
      ? `Preços ilustrativos na ${lojaById(state.loja).nome} (${lojaById(state.loja).bairro}).`
      : 'Preços ilustrativos, iguais em todas as unidades até o cadastro oficial.'
  }
  paintQty()
}
