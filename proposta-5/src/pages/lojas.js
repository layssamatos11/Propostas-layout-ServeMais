import { LOJAS, lojaById } from '../data/lojas.js'
import { CIDADES } from '../data/site.js'
import { filteredStores } from '../domain/query.js'
import { formatPhone, horario, storeStatus } from '../domain/hours.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

const SERVICOS = ['Padaria', 'Açougue']

function pressed(on) {
  return on ? 'true' : 'false'
}

export function renderLojas() {
  return `<header class="page-head">
    <h1>Nossas lojas <span>17 unidades</span></h1>
    <div class="loja-tools">
      <label class="busca-side">Bairro, rua ou cidade
        <input id="qLoja" type="search" value="${esc(state.q)}" placeholder="Ex.: Centro, CPA, Mapim">
      </label>
      <button class="btn btn-yellow" type="button" data-act="geo">Usar minha localização</button>
    </div>
    <div class="chips">
      ${CIDADES.map((cidade) => `<button class="chip" type="button" data-act="cidade" data-cidade="${esc(cidade)}" aria-pressed="${pressed(state.cidade === cidade)}">${esc(cidade)}</button>`).join('')}
      <button class="chip" type="button" data-act="aberto" aria-pressed="${pressed(state.aberto)}">Aberto agora</button>
      ${SERVICOS.map((servico) => `<button class="chip" type="button" data-act="servico" data-servico="${esc(servico)}" aria-pressed="${pressed(state.servico === servico)}">${esc(servico)}</button>`).join('')}
    </div>
  </header>
  <div class="lojas-layout">
    <div>
      <p id="lojaCount"></p>
      <div id="lojaLista" class="loja-lista"></div>
    </div>
    <aside class="loja-painel">
      <div class="mapa" id="mapa">
        <div class="mapa-inner" id="mapaInner">
          <p>Mapa ilustrativo. Os pinos usam endereços de exemplo.</p>
          <div id="pins"></div>
        </div>
        <div class="zoom">
          <button type="button" data-act="zoom" data-z="1" aria-label="Aproximar">+</button>
          <button type="button" data-act="zoom" data-z="-1" aria-label="Afastar">−</button>
        </div>
      </div>
      <div id="callout"></div>
    </aside>
  </div>
  <section class="bloco">
    <h2 id="gradeTitulo">Todas as unidades</h2>
    <div class="grade-lojas" id="lojaGrade"></div>
  </section>`
}

function card(loja, selected) {
  const status = storeStatus(loja)
  return `<article class="loja-card${selected ? ' on' : ''}" data-act="pin" data-id="${loja.id}">
    <span class="num">${String(loja.id).padStart(2, '0')}</span>
    <div>
      <h2>${esc(loja.nome)} (exemplo)</h2>
      <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
      <p class="${status.on ? 'aberto' : 'fechado'}">${esc(status.txt)}</p>
    </div>
  </article>`
}

function callout(loja) {
  if (!loja) return '<p>Nenhuma unidade neste filtro.</p>'
  const status = storeStatus(loja)
  return `<h2>${esc(loja.nome)} (exemplo)</h2>
    <p class="${status.on ? 'aberto' : 'fechado'}">${esc(status.txt)}</p>
    <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
    <p>${esc(horario(loja))}</p>
    <div class="btn-row">
      <button class="btn btn-red" type="button" data-act="rota" data-id="${loja.id}">Como chegar</button>
      <button class="btn btn-line" type="button" data-act="ligar" data-digits="${loja.tel}" data-label="${formatPhone(loja.tel)}">Ligar ${formatPhone(loja.tel)}</button>
      <button class="btn btn-line" type="button" data-act="zap">WhatsApp</button>
    </div>
    <p>${loja.servicos.map(esc).join(' · ')} (exemplos)</p>`
}

export function mountLojas() {
  const lista = document.getElementById('lojaLista')
  if (!lista) return
  const lojas = filteredStores(state, LOJAS)
  if (state.pin && !lojas.some((loja) => loja.id === state.pin) && lojas[0]) state.pin = lojas[0].id
  if (!state.pin && lojas[0]) state.pin = lojas[0].id
  const escolhida = lojaById(state.pin)
  lista.innerHTML = lojas.length
    ? lojas.map((loja) => card(loja, loja.id === state.pin)).join('')
    : '<p class="vazio">Nenhuma unidade de exemplo neste filtro.</p>'
  document.getElementById('lojaCount').textContent = `${lojas.length} ${lojas.length === 1 ? 'unidade' : 'unidades'}`
  document.getElementById('callout').innerHTML = callout(lojas.length ? escolhida : null)
  document.getElementById('pins').innerHTML = LOJAS.map((loja) => {
    const visivel = lojas.some((item) => item.id === loja.id)
    return `<button class="pin${loja.id === state.pin ? ' on' : ''}${visivel ? '' : ' dim'}" type="button" data-act="pin" data-id="${loja.id}" style="left:${loja.x}%;top:${loja.y}%" aria-label="${esc(loja.nome)}">${loja.id}</button>`
  }).join('')
  document.getElementById('mapaInner').style.transform = `scale(${state.zoom})`
  document.getElementById('lojaGrade').innerHTML = lojas.map((loja) => `<button type="button" data-act="pin" data-id="${loja.id}" class="${loja.id === state.pin ? 'on' : ''}">
    <b>${String(loja.id).padStart(2, '0')}</b>
    <span>${esc(loja.nome)} (exemplo)</span>
    <small>${esc(loja.cidade)}</small>
  </button>`).join('')
  document.getElementById('gradeTitulo').textContent = lojas.length === LOJAS.length
    ? 'Todas as 17 unidades'
    : `${lojas.length} ${lojas.length === 1 ? 'unidade' : 'unidades'} neste filtro`
  document.querySelectorAll('[data-cidade]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.cidade === state.cidade))
  })
  document.querySelector('[data-act="aberto"]')?.setAttribute('aria-pressed', String(state.aberto))
  document.querySelectorAll('[data-servico]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.servico === state.servico))
  })
}
