import { storeCard } from '../components/store-card.js'
import { CIDADES } from '../data/site.js'
import { filteredStores } from '../domain/query.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function lojasPage() {
  const chips = CIDADES.map((cidade) => {
    const on = state.cidade === cidade ? ' aria-pressed="true"' : ' aria-pressed="false"'
    return `<button type="button" data-act="cidade" data-cidade="${esc(cidade)}"${on}>${esc(cidade)}</button>`
  }).join('')
  return `<section class="wrap lojas-head">
    <p class="migalha"><a href="#inicio">Início</a> › Nossas lojas</p>
    <h1>Nossas lojas</h1>
    <p>17 unidades em Cuiabá e Várzea Grande. Escolha a mais perto de você e abra a rota no Google Maps.</p>
    <div class="chips">${chips}</div>
    <p id="lojaCount" class="nota"></p>
  </section>
  <section class="wrap lojas-layout">
    <div class="loja-grid" id="lojaGrid"></div>
    <aside class="mapa-placeholder">
      <p><strong>Mapa interativo com as 17 lojas.</strong></p>
      <p>Ativado com o Google Maps quando os endereços oficiais forem cadastrados.</p>
    </aside>
  </section>`
}

export function mountLojas() {
  const grid = document.getElementById('lojaGrid')
  if (!grid) return
  const stores = filteredStores()
  grid.innerHTML = stores.map(storeCard).join('') || '<p class="empty">Nenhuma unidade nesta cidade de exemplo.</p>'
  const count = document.getElementById('lojaCount')
  if (count) count.textContent = `${stores.length} ${stores.length === 1 ? 'unidade' : 'unidades'}`
  document.querySelectorAll('[data-cidade]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.cidade === state.cidade))
  })
}
