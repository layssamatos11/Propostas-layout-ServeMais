import { CIDADES } from '../data/site.js'
import { lojaById } from '../data/lojas.js'
import { filteredStores } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { storeStatus } from '../domain/hours.js'
import { state } from '../state/store.js'
import { storeCard } from '../components/store-card.js'

export function mountLojas() {
  const lista = document.getElementById('lojaLista')
  if (!lista) return
  const lojas = filteredStores()
  if (lojas.length && !lojas.some((loja) => loja.id === state.lojaId)) state.lojaId = lojas[0].id
  lista.innerHTML = lojas.length
    ? lojas.map((loja) => storeCard(loja, loja.id === state.lojaId)).join('')
    : '<p class="vazio">Nenhuma unidade com esse filtro. Tente outro bairro ou cidade.</p>'
  const count = document.getElementById('lojaCount')
  if (count) {
    const n = lojas.length
    count.textContent = `${n} ${n === 1 ? 'unidade' : 'unidades'}`
  }
  document.querySelectorAll('[data-act="cidade"]').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.cidade === state.cidade ? 'true' : 'false')
  })
  const aberto = document.querySelector('[data-act="aberto"]')
  if (aberto) aberto.setAttribute('aria-pressed', state.aberto ? 'true' : 'false')
  const pins = document.getElementById('pins')
  if (pins) {
    pins.style.transform = `scale(${state.zoom})`
    pins.innerHTML = lojas.map((loja) => {
      const on = loja.id === state.lojaId ? ' on' : ''
      return `<button class="pin${on}" type="button" style="left:${loja.x}%;top:${loja.y}%" data-act="loja" data-id="${loja.id}" aria-label="${esc(loja.nome)}"></button>`
    }).join('')
  }
  const callout = document.getElementById('callout')
  if (callout) {
    const loja = lojaById(state.lojaId)
    const visivel = loja && lojas.some((item) => item.id === loja.id)
    if (!visivel) {
      callout.innerHTML = '<p>Nenhuma unidade selecionada neste filtro.</p>'
    } else {
      const status = storeStatus(loja)
      callout.innerHTML = `<p class="olho">${esc(status.txt)}</p><strong>${esc(loja.nome)} (exemplo)</strong><p>${esc(loja.bairro)} · ${esc(loja.cidade)}</p>`
    }
  }
}

export function renderLojas() {
  const chips = CIDADES.map((cidade) => {
    const pressed = state.cidade === cidade ? 'true' : 'false'
    return `<button type="button" class="chip" data-act="cidade" data-cidade="${esc(cidade)}" aria-pressed="${pressed}">${esc(cidade)}</button>`
  }).join('')
  return `<header class="page-head">
      <p class="migalha"><a href="#inicio">Início</a> › Nossas lojas</p>
      <h1>Nossas lojas</h1>
      <p class="lead">17 unidades · Cuiabá e Várzea Grande · dados demonstrativos</p>
    </header>
    <div class="lojas-tools">
      <label class="busca">Buscar por bairro ou cidade
        <input id="buscaLoja" type="search" value="${esc(state.busca)}" placeholder="Ex.: Centro, CPA, Mapim">
      </label>
      <div class="chips" role="group" aria-label="Filtrar unidades">
        ${chips}
        <button type="button" class="chip" data-act="aberto" aria-pressed="${state.aberto ? 'true' : 'false'}">Aberto agora</button>
      </div>
      <p id="lojaCount" aria-live="polite"></p>
    </div>
    <div class="lojas-layout">
      <div class="loja-lista" id="lojaLista"></div>
      <aside class="mapa">
        <p class="mapa-nota">Mapa interativo — integração com serviço de mapas na produção. Os pinos usam endereços de exemplo.</p>
        <div class="pins" id="pins"></div>
        <div class="zoom">
          <button type="button" data-act="zoom" data-zoom="in" aria-label="Aproximar">+</button>
          <button type="button" data-act="zoom" data-zoom="out" aria-label="Afastar">−</button>
        </div>
        <div class="callout" id="callout"></div>
      </aside>
    </div>`
}

export { slug }
