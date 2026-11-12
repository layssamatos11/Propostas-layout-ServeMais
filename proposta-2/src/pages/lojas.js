import { mapPanel } from '../components/map-panel.js'
import { storeDetail, storeRow } from '../components/store-card.js'
import { LOJAS, lojaById } from '../data/lojas.js'
import { filteredStores } from '../domain/query.js'
import { esc } from '../lib/format.js'
import { nearestStore, state } from '../state/store.js'

const CIDADES = ['Todas', 'Cuiabá', 'Várzea Grande']

function chip(label, attr, value, current) {
  const on = current === value ? ' aria-pressed="true"' : ' aria-pressed="false"'
  return `<button type="button" data-act="${attr}" data-${attr}="${esc(value)}"${on}>${esc(label)}</button>`
}

export function lojasPage() {
  const cities = CIDADES.map((cidade) => chip(cidade, 'cidade', cidade, state.cidade)).join('')
  const services = ['Padaria', 'Açougue'].map((item) => chip(item, 'servico', item, state.servico)).join('')
  return `<section class="wrap page-head">
    <h1>Nossas lojas <em>17 unidades</em></h1>
    <div class="loja-tools">
      <label class="sr-only" for="qLoja">Buscar loja</label>
      <input id="qLoja" type="search" placeholder="Bairro, rua ou cidade" value="${esc(state.q)}">
      <button class="btn btn-line" type="button" data-act="geo">Usar minha localização</button>
    </div>
    <div class="chips">
      ${cities}
      <button type="button" id="abertoBtn" data-act="aberto" aria-pressed="${state.aberto ? 'true' : 'false'}">Aberto agora</button>
      ${services}
    </div>
    <p id="lojaCount" class="note"></p>
  </section>
  <section class="wrap lojas-layout">
    <div id="lojaList"></div>
    <div class="lojas-side">
      ${mapPanel()}
      <div id="lojaDetail"></div>
    </div>
  </section>
  <section class="wrap todas-lojas">
    <h2>Todas as 17 unidades</h2>
    <div class="loja-grid" id="lojaGrid"></div>
  </section>`
}

export function mountLojas() {
  const list = document.getElementById('lojaList')
  if (!list) return
  if (!state.pin || !lojaById(state.pin)) state.pin = nearestStore().id
  const stores = filteredStores()
  const count = document.getElementById('lojaCount')
  if (count) {
    count.textContent = stores.length
      ? `${stores.length} ${stores.length === 1 ? 'unidade' : 'unidades'}`
      : ''
  }
  list.innerHTML = stores.map(storeRow).join('') || '<p class="empty">Nenhuma unidade com esses filtros. Os horários e serviços são exemplos.</p>'
  const selected = stores.find((loja) => loja.id === state.pin)
  const detail = document.getElementById('lojaDetail')
  if (detail) {
    detail.innerHTML = selected
      ? storeDetail(selected)
      : '<p class="empty">A unidade escolhida não entra neste filtro. Toque em uma loja da lista.</p>'
  }
  const grid = document.getElementById('lojaGrid')
  if (grid) {
    grid.innerHTML = LOJAS.map((loja) => {
      return `<a href="#lojas/${loja.id}"><b>${String(loja.id).padStart(2, '0')}</b><strong>${esc(loja.nome)} (exemplo)</strong><span>${esc(loja.cidade)}</span></a>`
    }).join('')
  }
  document.querySelectorAll('[data-cidade]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.cidade === state.cidade))
  })
  document.querySelectorAll('[data-servico]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.servico === state.servico))
  })
  const openNow = document.getElementById('abertoBtn')
  if (openNow) openNow.setAttribute('aria-pressed', state.aberto ? 'true' : 'false')
  document.querySelectorAll('.pin').forEach((pin) => {
    const visible = stores.some((loja) => loja.id === Number(pin.dataset.id))
    pin.classList.toggle('dim', !visible)
    pin.classList.toggle('on', Number(pin.dataset.id) === state.pin)
  })
}
