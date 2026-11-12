import { filterChips } from '../components/filter-chips.js'
import { lojaCard } from '../components/loja-card.js'
import { applyZoom, mapPanel } from '../components/map-panel.js'
import { productCard } from '../components/product-card.js'
import { HOME_FILTERS } from '../data/navigation.js'
import { LOJAS } from '../data/lojas.js'
import { OFERTAS } from '../data/ofertas.js'
import { SETORES } from '../data/setores.js'
import { maxDiscountPercent, matchesFilter } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { icon } from '../lib/icons.js'
import { state } from '../state/store.js'
import { paintQty } from '../components/shopping-list.js'

export function inicioPage() {
  const off = maxDiscountPercent()
  const sectors = SETORES.map((setor) => {
    return `<a class="sector" href="#ofertas/${slug(setor.nome)}"><i style="background:${setor.cor};color:${setor.tinta}">${icon(setor.icon, setor.tinta)}</i>${esc(setor.nome)}</a>`
  }).join('')

  return `<section class="hero">
    <div class="wrap hero-grid">
      <div>
        <span class="kicker">CAMPANHA (EXEMPLO)</span>
        <h1>A economia que chega à sua mesa.</h1>
        <p class="lead">Ofertas toda semana nas 17 lojas da Rede Serve Mais em Cuiabá e Várzea Grande.</p>
        <div class="hero-actions">
          <a class="btn btn-y" href="#ofertas">Ver ofertas</a>
          <a class="btn btn-w" href="#lojas">Encontrar uma unidade</a>
        </div>
        <div class="stats">
          <div><b>17</b><span>unidades</span></div>
          <div><b>2</b><span>cidades</span></div>
          <div><b>7</b><span>setores</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <span class="orb orb-y"></span>
        <span class="orb orb-r"></span>
        <div class="shot"><span>Foto da campanha (a produzir)</span></div>
        <div class="deal">
          <small>OFERTÃO DA SEMANA</small>
          <strong>até ${off}% OFF</strong>
          <em>valor ilustrativo</em>
        </div>
      </div>
    </div>
  </section>
  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <h2>Ofertas em destaque</h2>
          <div class="accent"></div>
          <p class="sub">Selecionadas para a semana · valores ilustrativos</p>
        </div>
        <a class="btn btn-line" href="#ofertas">Ver todas as promoções</a>
      </div>
      <div class="chips" id="homeChips">${filterChips(HOME_FILTERS, 'home', state.homeCat)}</div>
      <div class="grid mt-16" id="homeGrid"></div>
    </div>
  </section>
  <section class="sec sec-tight">
    <div class="wrap">
      <h2>Campanhas da rede</h2>
      <div class="accent"></div>
      <div class="camp-grid">
        <article class="camp camp-red">
          <span class="orb"></span>
          <span class="tag">OFERTÃO DA SEMANA</span>
          <h3>Toda semana, preço de verdade.</h3>
          <a class="btn btn-y" href="#ofertas/ofertao-da-semana">Conferir</a>
        </article>
        <article class="camp camp-yellow">
          <span class="orb"></span>
          <span class="tag">FECHA MÊS</span>
          <h3>Fecha Mês com economia.</h3>
          <a class="btn btn-r" href="#ofertas/fecha-mes">Conferir</a>
        </article>
      </div>
      <div class="mini-camps">
        <a class="mini mini-season" href="#ofertas/sazonais">
          <b>Campanhas sazonais</b>
          <span>Páscoa, Natal e Festa Junina (exemplos).</span>
        </a>
        <button class="mini mini-special" type="button" data-act="acoes">
          <b>Ações especiais</b>
          <span>Dias de desconto e parcerias da rede.</span>
        </button>
      </div>
    </div>
  </section>
  <section class="sec sec-tight">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <h2>Compre por setor</h2>
          <div class="accent"></div>
        </div>
        <a class="btn btn-line" href="#setores">Ver setores</a>
      </div>
      <div class="sectors">${sectors}</div>
      <p class="note">Ícones provisórios. As fotos de cada setor entram na produção.</p>
    </div>
  </section>
  <section class="sec sec-tight">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <h2>Nossas lojas</h2>
          <div class="accent"></div>
          <p class="sub">17 unidades em Cuiabá e Várzea Grande</p>
        </div>
        <a class="btn btn-line" href="#lojas">Ver todas</a>
      </div>
      <div class="lojas-layout">
        <div id="homeLojas"></div>
        <div class="map-panel">${mapPanel({ compact: true })}</div>
      </div>
    </div>
  </section>`
}

export function mountInicio() {
  const list = OFERTAS.filter((product) => matchesFilter(product, state.homeCat)).slice(0, 4)
  const grid = document.getElementById('homeGrid')
  if (!grid) return
  grid.innerHTML = list.map(productCard).join('') || '<p class="empty">Nenhuma oferta nesta categoria.</p>'
  document.querySelectorAll('[data-home]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.home === state.homeCat))
  })
  const stores = document.getElementById('homeLojas')
  if (stores) stores.innerHTML = LOJAS.slice(0, 4).map(lojaCard).join('')
  paintQty()
  applyZoom()
}
