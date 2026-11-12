import { LOJAS } from '../data/lojas.js'
import { HOME_CATS, SETORES } from '../data/site.js'
import { CAMPANHAS, SAZONAIS } from '../data/ofertas.js'
import { homeOffers } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { state } from '../state/store.js'
import { paintQty, productCard } from '../components/product-card.js'
import { storeRow } from '../components/store-card.js'

function chips() {
  return HOME_CATS.map((cat) => {
    const pressed = state.homeCat === cat ? 'true' : 'false'
    return `<button type="button" class="chip" data-act="home-cat" data-cat="${esc(cat)}" aria-pressed="${pressed}">${esc(cat)}</button>`
  }).join('')
}

export function mountInicio() {
  const grid = document.getElementById('homeOffers')
  if (!grid) return
  const list = homeOffers()
  grid.innerHTML = list.length
    ? list.map(productCard).join('')
    : '<p class="vazio">Nenhuma oferta de exemplo neste setor.</p>'
  document.querySelectorAll('[data-act="home-cat"]').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.cat === state.homeCat ? 'true' : 'false')
  })
  paintQty()
}

export function renderInicio() {
  const cidades = new Set(LOJAS.map((loja) => loja.cidade)).size
  const ofertao = CAMPANHAS.find((item) => item.id === 'ofertao')
  const fecha = CAMPANHAS.find((item) => item.id === 'fecha')
  return `<section class="hero">
      <div class="hero-copy">
        <p class="olho">Campanha (exemplo)</p>
        <h1>A economia que chega à sua mesa.</h1>
        <p class="lead">Ofertas toda semana nas 17 lojas da Rede Serve Mais em Cuiabá e Várzea Grande.</p>
        <p class="acoes">
          <a class="btn btn-red" href="#ofertas">Ver ofertas</a>
          <a class="btn btn-ghost" href="#lojas">Encontrar uma unidade</a>
        </p>
      </div>
      <div class="foto foto-hero">
        <p class="badge-off"><span>Ofertão da semana</span><strong>até 30% OFF</strong><small>exemplo</small></p>
        <p>Fotografia profissional — família fazendo compras no corredor de hortifruti (a produzir)</p>
      </div>
    </section>
    <section class="stats" aria-label="A rede em números">
      <p><strong>${LOJAS.length}</strong><span>unidades</span></p>
      <p><strong>${cidades}</strong><span>cidades</span></p>
      <p><strong>${SETORES.length}</strong><span>setores</span></p>
    </section>
    <section class="home-ofertas">
      <div class="sec-head">
        <div>
          <h2>Ofertas em destaque</h2>
          <p>Selecionadas para a semana · valores ilustrativos</p>
        </div>
        <a class="btn btn-ghost" href="#ofertas">Ver todas as promoções</a>
      </div>
      <div class="chips" role="group" aria-label="Setores em destaque">${chips()}</div>
      <div class="produtos" id="homeOffers"></div>
    </section>
    <section>
      <h2>Campanhas da rede</h2>
      <div class="campanhas">
        <button class="campanha campanha-red" type="button" data-act="campanha" data-campanha="ofertao">
          <span>${esc(ofertao.nome)}</span>
          <strong>Toda semana, preço de verdade.</strong>
          <em>Conferir</em>
        </button>
        <button class="campanha campanha-yellow" type="button" data-act="campanha" data-campanha="fecha">
          <span>${esc(fecha.nome)}</span>
          <strong>Fecha Mês com economia.</strong>
          <em>Conferir</em>
        </button>
      </div>
      <div class="faixa-dupla">
        <div>
          <h3>Campanhas sazonais</h3>
          <p>Páscoa, Natal e Festa Junina são exemplos. O período ainda será definido.</p>
          <div class="sazonais">
            ${SAZONAIS.map((item) => `<button type="button" class="chip" data-act="campanha" data-campanha="${item.id}">${esc(item.nome)}</button>`).join('')}
          </div>
        </div>
        <button class="acao-especial" type="button" data-act="campanha" data-campanha="especiais">
          <span>Ações especiais</span>
          <strong>Dias de desconto e parcerias da rede</strong>
          <em>Conferir</em>
        </button>
      </div>
    </section>
    <section>
      <h2>Compre por setor</h2>
      <p class="nota">Ícones e recortes fotográficos a definir na produção.</p>
      <div class="setores">
        ${SETORES.map((setor) => {
          const tinta = setor.cor === '#FBB90E' ? '#1F1A17' : '#fff'
          return `<a class="setor" href="#ofertas/${slug(setor.id)}">
            <span style="background:${setor.cor};color:${tinta}">${esc(setor.letra)}</span>
            ${esc(setor.nome)}
          </a>`
        }).join('')}
      </div>
    </section>
    <section>
      <div class="sec-head">
        <div>
          <h2>Nossas lojas</h2>
          <p>${LOJAS.length} unidades em Cuiabá e Várzea Grande</p>
        </div>
        <a class="btn btn-red" href="#lojas">Ver todas as unidades</a>
      </div>
      <div class="lojas-home">
        <div class="foto mapa-fake"><p>Mapa interativo (exemplo). A integração com o serviço de mapas entra na produção.</p></div>
        <div class="loja-lista">${LOJAS.slice(0, 4).map(storeRow).join('')}</div>
      </div>
    </section>`
}
