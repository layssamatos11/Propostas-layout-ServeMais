import { productCard } from '../components/product-card.js'
import { MOMENTOS, ROOMS, momentoById, roomById } from '../data/felita.js'
import { offerById } from '../data/ofertas.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

function roomButtons() {
  return ROOMS.map((room) => `<button class="comodo${room.id === state.room ? ' on' : ''}" type="button" data-act="room" data-room="${room.id}" aria-pressed="${room.id === state.room}">
    <span>${room.num}</span>
    <strong>${esc(room.nome)}</strong>
    <em>${esc(room.linha)}</em>
  </button>`).join('')
}

export function cenaHtml() {
  const room = roomById(state.room)
  const index = ROOMS.findIndex((item) => item.id === room.id)
  const products = room.produtos.map((id) => offerById(id)).filter(Boolean)
  return `<p class="kicker">${esc(room.linha)}</p>
    <h2>${esc(room.nome)}</h2>
    <p>${esc(room.historia)}</p>
    <div class="grade grade-3">${products.map(productCard).join('')}</div>
    <div class="cena-nav">
      <a class="btn btn-line" href="#ofertas/felita">Ver na oferta</a>
      <span>${index + 1} de ${ROOMS.length} cômodos</span>
      <button class="btn btn-line" type="button" data-act="room-step" data-dir="-1" aria-label="Cômodo anterior">‹</button>
      <button class="btn btn-line" type="button" data-act="room-step" data-dir="1" aria-label="Próximo cômodo">›</button>
    </div>`
}

export function diaHtml() {
  const momento = momentoById(state.momento)
  const index = MOMENTOS.findIndex((item) => item.id === momento.id)
  const products = momento.itens.map((id) => offerById(id)).filter(Boolean)
  return `<div class="dia-cena" style="background:${momento.cor}" data-escuro="${momento.escuro ? '1' : '0'}">
    <p>${esc(momento.cena)}</p>
    <h3>${esc(momento.titulo)}</h3>
  </div>
  <div class="grade grade-2">${products.map(productCard).join('')}</div>
  <input id="diaRange" type="range" min="0" max="3" step="1" value="${index}" aria-label="Linha do dia">
  <div class="dia-nomes">
    ${MOMENTOS.map((item) => `<button type="button" data-act="momento" data-momento="${item.id}" aria-pressed="${item.id === momento.id}">${esc(item.nome)}</button>`).join('')}
  </div>`
}

export function renderFelita() {
  return `<header class="felita-hero">
    <p class="felita-logo">Logomarca oficial Felitá a aplicar</p>
    <h1>A casa <em>Felitá.</em></h1>
    <p class="lead">Em todos os momentos. Ser Felitá é escolher todos os dias levar a felicidade pra sua casa, em cada produto, em cada momento.</p>
    <div class="btn-row">
      <a class="btn btn-blue" href="#felita" data-act="scroll" data-alvo="casa">Entrar na casa</a>
      <a class="btn btn-line" href="#ofertas/felita">Ver ofertas Felitá</a>
    </div>
  </header>
  <section class="bloco" id="casa">
    <h2>Escolha um cômodo</h2>
    <p>Cada cômodo da casa conta uma história e mostra os produtos que fazem parte dela.</p>
    <div class="casa">
      <div class="comodos">${roomButtons()}</div>
      <div class="cena" id="cena">${cenaHtml()}</div>
    </div>
  </section>
  <section class="bloco">
    <h2>Um dia na casa Felitá</h2>
    <p>Arraste a linha do dia: a cor, a cena e os produtos mudam com a hora.</p>
    <div id="dia">${diaHtml()}</div>
  </section>
  <section class="bloco porque">
    <div>
      <h2>Por que escolher a Felitá?</h2>
      <p>Nós queremos estar presente nos momentos que mais importam: os momentos em família. Buscamos sempre a confiança, o sabor e a qualidade, sem complicação, do dia a dia às ocasiões especiais. Felitá é mais do que escolha, é parte da sua vida.</p>
    </div>
    <div class="btn-row">
      <a class="btn btn-blue" href="#ofertas/felita">Veja a Felitá em oferta</a>
      <a class="btn btn-line" href="#lojas">Veja nossas lojas</a>
    </div>
  </section>
  <section class="bloco">
    <h2>Como funciona</h2>
    <ol class="passos passos-4">
      <li><b>1</b><span>Toque no cômodo: ele se ilumina</span></li>
      <li><b>2</b><span>O painel conta a história e mostra os produtos</span></li>
      <li><b>3</b><span>A linha do dia muda cor e cena</span></li>
      <li><b>4</b><span>Todo caminho termina em oferta ou loja</span></li>
    </ol>
  </section>`
}

export function mountFelita() {}

export function syncCena() {
  const cena = document.getElementById('cena')
  const dia = document.getElementById('dia')
  if (cena) cena.innerHTML = cenaHtml()
  if (dia) dia.innerHTML = diaHtml()
}
