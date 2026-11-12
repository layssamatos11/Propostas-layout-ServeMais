import { productCard } from '../components/product-card.js'
import { ticker } from '../components/ticker.js'
import { LOJAS } from '../data/lojas.js'
import { CAMPANHAS, FAIXAS, SETORES } from '../data/site.js'
import { filteredOffers } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { nearestStore, state } from '../state/store.js'

function pressed(on) {
  return on ? 'true' : 'false'
}

export function renderOfertas() {
  const loja = nearestStore()
  const current = !(state.corredor || state.campanha || state.marca)
  return `<header class="page-head">
    <p class="kicker">Ofertas</p>
    <h1>Ofertas da semana</h1>
    <div class="offer-tools">
      <label>Unidade
        <select id="unidadeOferta">
          ${LOJAS.map((item) => `<option value="${item.id}"${item.id === state.unidade ? ' selected' : ''}>${esc(item.nome)} · ${esc(item.cidade)}</option>`).join('')}
        </select>
      </label>
      <p>Válido de 00/00 a 00/00 (exemplo)</p>
    </div>
  </header>
  ${ticker('Ofertão da semana * Fecha mês * Ofertas sazonais * ')}
  <div class="offers-layout">
    <aside class="filtros">
      <h2>Corredores</h2>
      <div class="chips">
        <a class="chip" href="#ofertas"${current ? ' aria-current="page"' : ''}>Todas</a>
        ${SETORES.map((setor) => `<a class="chip" href="#ofertas/${slug(setor.nome)}"${state.corredor === setor.nome ? ' aria-current="page"' : ''}>${esc(setor.nome)}</a>`).join('')}
      </div>
      <h2>Campanha</h2>
      <div class="chips">
        ${CAMPANHAS.map((item) => `<a class="chip" href="#ofertas/${slug(item.nome)}"${state.campanha === item.id ? ' aria-current="page"' : ''}>${esc(item.nome)}</a>`).join('')}
        <a class="chip" href="#ofertas/felita"${state.marca === 'felita' ? ' aria-current="page"' : ''}>Felitá</a>
      </div>
      <h2>Faixa de preço (exemplo)</h2>
      <div class="chips">
        ${FAIXAS.map((faixa) => `<button class="chip" type="button" data-act="faixa" data-faixa="${faixa.id}" aria-pressed="${pressed(state.faixa === faixa.id)}">${faixa.label}</button>`).join('')}
      </div>
      <label class="busca-side">Buscar
        <input id="qOferta" type="search" value="${esc(state.busca)}" placeholder="Nome do produto">
      </label>
    </aside>
    <div>
      <p id="offerCount"></p>
      <p class="nota" id="precoNota">Valores ilustrativos da ${esc(loja.nome)}.</p>
      <div class="grade grade-3" id="offerGrid"></div>
      <button class="btn btn-line more" type="button" id="offerMore" data-act="mais">Carregar mais ofertas</button>
      <aside class="fecha">
        <p>Fecha Mês</p>
        <h2>Campanha com data e regras</h2>
        <button class="btn btn-yellow" type="button" data-act="regulamento">Ver regulamento</button>
      </aside>
    </div>
    <aside class="lista-col">
      <h2>Minha lista</h2>
      <p data-list-count>0 itens</p>
      <div class="cupom" data-receipt></div>
    </aside>
  </div>`
}

export function mountOfertas() {
  const items = filteredOffers(state)
  const shown = items.slice(0, state.limite)
  const grid = document.getElementById('offerGrid')
  if (!grid) return
  grid.innerHTML = shown.length
    ? shown.map(productCard).join('')
    : '<p class="vazio">Nenhuma oferta de exemplo neste filtro.</p>'
  document.getElementById('offerCount').textContent = `${items.length} ${items.length === 1 ? 'oferta' : 'ofertas'} de exemplo`
  document.getElementById('precoNota').textContent = `Valores ilustrativos da ${nearestStore().nome}.`
  document.getElementById('offerMore').hidden = shown.length >= items.length
}
