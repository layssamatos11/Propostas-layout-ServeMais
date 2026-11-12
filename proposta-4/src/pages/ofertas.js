import { FILTROS, campanhaById } from '../data/ofertas.js'
import { LOJAS, lojaById } from '../data/lojas.js'
import { sortedOffers } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { state } from '../state/store.js'
import { productCard } from '../components/product-card.js'

function chips() {
  return FILTROS.map((item) => {
    const pressed = state.filtro === item.id ? 'true' : 'false'
    return `<button type="button" class="chip" data-act="cat" data-cat="${esc(item.id)}" aria-pressed="${pressed}">${esc(item.nome)}</button>`
  }).join('')
}

export function mountOfertas() {
  const grid = document.getElementById('offerGrid')
  if (!grid) return
  const all = sortedOffers()
  const slice = all.slice(0, state.visiveis)
  grid.innerHTML = slice.length
    ? slice.map(productCard).join('')
    : '<p class="vazio">Nenhuma oferta de exemplo neste filtro.</p>'
  const more = document.getElementById('offerMore')
  if (more) more.hidden = slice.length >= all.length
  const count = document.getElementById('offerCount')
  if (count) count.textContent = `${all.length} ${all.length === 1 ? 'oferta' : 'ofertas'} de exemplo`
  const loja = lojaById(state.unidade)
  const nota = document.getElementById('precoNota')
  if (nota) {
    nota.textContent = loja
      ? `Valores ilustrativos, ajustados como exemplo para ${loja.nome}.`
      : 'Valores ilustrativos da rede. Escolha uma unidade para ver o exemplo de preço local.'
  }
  document.querySelectorAll('[data-act="cat"]').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.cat === state.filtro ? 'true' : 'false')
  })
}

export function renderOfertas() {
  const unidades = LOJAS.map((loja) => {
    const selected = state.unidade === loja.id ? ' selected' : ''
    return `<option value="${loja.id}"${selected}>${esc(loja.nome)} · ${esc(loja.cidade)}</option>`
  }).join('')
  return `<header class="page-head">
      <p class="olho">Ofertas</p>
      <h1>Confira as promoções da semana e das campanhas da rede.</h1>
      <p class="lead">Valores meramente ilustrativos. A validade de cada item ainda será definida.</p>
    </header>
    <div class="chips" role="group" aria-label="Filtrar ofertas">${chips()}</div>
    <div class="oferta-tools">
      <label>Sua unidade
        <select id="unidadeSelect">
          <option value="0"${state.unidade === 0 ? ' selected' : ''}>Preço da rede (exemplo)</option>
          ${unidades}
        </select>
      </label>
      <label>Ordenar
        <select id="ordemSelect">
          <option value="desconto"${state.ordem === 'desconto' ? ' selected' : ''}>Maior desconto</option>
          <option value="nome"${state.ordem === 'nome' ? ' selected' : ''}>Nome</option>
        </select>
      </label>
      <p id="offerCount" aria-live="polite"></p>
    </div>
    <p class="nota" id="precoNota"></p>
    <div class="produtos" id="offerGrid"></div>
    <p class="centro"><button class="btn btn-ghost" type="button" id="offerMore" data-act="mais">Carregar mais ofertas</button></p>
    <section class="fecha-banner">
      <p class="olho">Fecha Mês</p>
      <h2>Campanha em destaque</h2>
      <p>Banner de campanha com período de validade, regras resumidas e botão de ação (exemplo).</p>
      <button class="btn btn-yellow" type="button" data-act="campanha" data-campanha="fecha">Ver regulamento</button>
    </section>`
}

export { campanhaById, slug }
