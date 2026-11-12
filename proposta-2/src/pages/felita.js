import { productCard } from '../components/product-card.js'
import { MOMENTOS, ROOMS, roomById } from '../data/felita.js'
import { offerById } from '../data/ofertas.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function felitaPage() {
  const room = roomById(state.room)
  const index = ROOMS.findIndex((item) => item.id === room.id)
  const rooms = ROOMS.map((item) => {
    const on = item.id === room.id ? ' is-on' : ''
    return `<button class="room${on}" type="button" data-act="room" data-room="${item.id}" aria-pressed="${item.id === room.id}">
      <span>${item.num}</span>
      <strong>${esc(item.nome)}</strong>
      <em>${esc(item.linha)}</em>
    </button>`
  }).join('')
  const moments = MOMENTOS.map((item) => {
    return `<button type="button" data-act="momento" data-momento="${item.id}" aria-pressed="${state.momento === item.id}">${esc(item.nome)}</button>`
  }).join('')
  const products = room.produtos.map((id) => offerById(id)).filter(Boolean)

  return `<section class="felita-hero">
    <div class="wrap felita-hero-grid">
      <div>
        <p class="felita-mark">Felitá</p>
        <h1>A casa <em>Felitá.</em></h1>
        <p>Em todos os momentos. Ser Felitá é escolher todos os dias levar a felicidade pra sua casa, em cada produto, em cada momento.</p>
        <div class="btn-row">
          <a class="btn btn-blue" href="#felita/${room.id}">Entrar na casa</a>
          <a class="btn btn-line btn-line-blue" href="#ofertas/felita">Ver ofertas Felitá</a>
        </div>
      </div>
      <p class="felita-note">A logomarca oficial da Felitá entra aqui, sem redesenho.</p>
    </div>
  </section>
  <section class="wrap felita-body">
    <div>
      <h2>Escolha um cômodo</h2>
      <p>Cada cômodo da casa conta uma história e mostra os produtos que fazem parte dela.</p>
      <div class="rooms" role="group" aria-label="Cômodos da casa">${rooms}</div>
    </div>
    <article class="room-panel" id="roomPanel">
      <p class="kicker kicker-blue">${index + 1} · ${esc(room.linha)}</p>
      <h2>${esc(room.nome)}</h2>
      <p>${esc(room.historia)}</p>
      <div class="gondolas gondolas-tight">${products.map(productCard).join('')}</div>
      <div class="room-nav">
        <a href="#ofertas/felita">Ver na oferta</a>
        <span>${index + 1} de ${ROOMS.length} cômodos</span>
        <a href="#felita/${ROOMS[(index + ROOMS.length - 1) % ROOMS.length].id}" aria-label="Cômodo anterior">‹</a>
        <a href="#felita/${ROOMS[(index + 1) % ROOMS.length].id}" aria-label="Próximo cômodo">›</a>
      </div>
    </article>
    <div class="dayline">
      <div>
        <h2>Um dia na casa Felitá</h2>
        <p>Arraste a linha do dia: a cor, a cena e o texto mudam com a hora.</p>
      </div>
      <label class="sr-only" for="diaRange">Linha do dia</label>
      <input id="diaRange" type="range" min="0" max="3" step="1" value="${MOMENTOS.findIndex((item) => item.id === state.momento)}">
      <div class="momentos">${moments}</div>
      <article class="cena cena-${state.momento}" id="cena">
        <p>${esc(MOMENTOS.find((item) => item.id === state.momento).nome)}</p>
        <h3>${esc(MOMENTOS.find((item) => item.id === state.momento).titulo)}</h3>
        <span>${esc(MOMENTOS.find((item) => item.id === state.momento).cena)}</span>
      </article>
    </div>
    <article class="porque">
      <h2>Por que escolher a Felitá?</h2>
      <p>Nós queremos estar presente nos momentos que mais importam: os momentos em família. Confiança, sabor e qualidade, sem complicação, do dia a dia às ocasiões especiais. Felitá é mais do que escolha, é parte da sua vida.</p>
      <div class="btn-row">
        <a class="btn btn-blue" href="#ofertas/felita">Veja a Felitá em oferta</a>
        <a class="btn btn-line btn-line-blue" href="#lojas">Veja nossas lojas</a>
      </div>
    </article>
    <ol class="como">
      <li><b>1</b> Toque no cômodo: ele se ilumina.</li>
      <li><b>2</b> O painel conta a história e mostra os produtos.</li>
      <li><b>3</b> A linha do dia muda cor e cena.</li>
      <li><b>4</b> Todo caminho termina em oferta ou loja.</li>
    </ol>
  </section>`
}

export function syncCena() {
  const cena = document.getElementById('cena')
  if (!cena) return
  const index = MOMENTOS.findIndex((item) => item.id === state.momento)
  const momento = MOMENTOS[index] || MOMENTOS[0]
  const range = document.getElementById('diaRange')
  if (range) range.value = String(MOMENTOS.indexOf(momento))
  cena.className = `cena cena-${momento.id}`
  cena.innerHTML = `<p>${esc(momento.nome)}</p><h3>${esc(momento.titulo)}</h3><span>${esc(momento.cena)}</span>`
  document.querySelectorAll('[data-momento]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.momento === momento.id))
  })
}

export function mountFelita() {}
