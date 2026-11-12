import { filterChips } from '../components/filter-chips.js'
import { lojaCard } from '../components/loja-card.js'
import { applyZoom, mapPanel } from '../components/map-panel.js'
import { CITY_FILTERS } from '../data/navigation.js'
import { lojaById } from '../data/lojas.js'
import { storeStatus } from '../domain/hours.js'
import { filteredStores } from '../domain/query.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function lojasPage() {
  return `<section class="wrap page-hero">
    <h1>Nossas lojas</h1>
    <div class="accent"></div>
    <p class="sub">17 unidades · Cuiabá e Várzea Grande · dados demonstrativos</p>
    <div class="finder finder-gap">
      <div class="loja-tools">
        <input class="search search-block" id="qLoja" type="search" placeholder="Buscar por bairro ou cidade" value="${esc(state.q)}" aria-label="Buscar por bairro ou cidade">
        <div class="chips" id="cityChips">
          ${filterChips(CITY_FILTERS, 'cidade', state.cidade)}
          <button class="chip" type="button" id="abertoBtn" data-act="aberto" aria-pressed="${state.aberto ? 'true' : 'false'}">Aberto agora</button>
        </div>
        <p class="note" id="lojaCount"></p>
      </div>
      <div class="map-panel">${mapPanel({ compact: false })}</div>
      <div id="lojaList"></div>
    </div>
  </section>`
}

function syncPin(visibleIds) {
  document.querySelectorAll('.pin').forEach((pin) => {
    pin.classList.toggle('on', Number(pin.dataset.id) === state.pin)
  })
  document.querySelectorAll('.loja').forEach((card) => {
    card.classList.toggle('is-on', Number(card.dataset.id) === state.pin)
  })
  const pop = document.getElementById('mapPop')
  const loja = state.pin && lojaById(state.pin)
  if (!pop) return
  if (!loja || (visibleIds && !visibleIds[state.pin])) {
    pop.hidden = true
    return
  }
  const status = storeStatus(loja)
  pop.hidden = false
  pop.style.left = `${loja.x}%`
  pop.style.top = `${loja.y}%`
  pop.classList.toggle('flip', loja.x > 62)
  pop.innerHTML = `<b>${esc(loja.nome)}</b>
    <p>${esc(status.txt)}<br>${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
    <button class="btn btn-r" type="button" data-act="detalhe" data-id="${loja.id}">Detalhes</button>`
}

export function mountLojas() {
  const box = document.getElementById('lojaList')
  if (!box) return
  if (!state.pin) state.pin = 1
  const list = filteredStores()
  const count = document.getElementById('lojaCount')
  if (count) count.textContent = `${list.length}${list.length === 1 ? ' unidade' : ' unidades'}`
  box.innerHTML = list.map(lojaCard).join('') || `<p class="empty">${
    state.aberto
      ? 'Nenhuma unidade aberta agora com esses filtros. Os horários são exemplos.'
      : 'Nenhuma unidade encontrada. Tente outro bairro ou cidade.'
  }</p>`
  const ids = {}
  list.forEach((loja) => { ids[loja.id] = true })
  document.querySelectorAll('.pin').forEach((pin) => {
    pin.classList.toggle('dim', !ids[pin.dataset.id])
  })
  document.querySelectorAll('[data-cidade]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.cidade === state.cidade))
  })
  const openNow = document.getElementById('abertoBtn')
  if (openNow) openNow.setAttribute('aria-pressed', state.aberto ? 'true' : 'false')
  if (state.pin && !ids[state.pin]) {
    const pop = document.getElementById('mapPop')
    if (pop) pop.hidden = true
    document.querySelectorAll('.pin').forEach((pin) => pin.classList.remove('on'))
  } else {
    syncPin(ids)
  }
  applyZoom()
}
