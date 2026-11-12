import { productCard } from '../components/product-card.js'
import { ticker } from '../components/ticker.js'
import { NOTICIAS } from '../data/noticias.js'
import { OFERTAS } from '../data/ofertas.js'
import { LOJAS } from '../data/lojas.js'
import { CAMPANHAS, SETORES, TICKER } from '../data/site.js'
import { storeStatus } from '../domain/hours.js'
import { discount, esc, money, slug } from '../lib/format.js'
import { nearestStore, state } from '../state/store.js'
import { adjustPrice } from '../domain/price.js'

function homeOffers() {
  return [...OFERTAS].sort((a, b) => discount(b) - discount(a)).slice(0, 4).map(productCard).join('')
}

function spotlight() {
  const focus = nearestStore()
  return [...LOJAS].sort((a, b) => {
    if (a.id === focus.id) return -1
    if (b.id === focus.id) return 1
    const da = (a.lat - focus.lat) ** 2 + (a.lng - focus.lng) ** 2
    const db = (b.lat - focus.lat) ** 2 + (b.lng - focus.lng) ** 2
    return da - db
  }).slice(0, 3)
}

function storeRow(loja) {
  const status = storeStatus(loja)
  return `<article class="loja-row">
    <span class="num">${String(loja.id).padStart(2, '0')}</span>
    <div>
      <h3>${esc(loja.nome)} (exemplo)</h3>
      <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
      <p class="${status.on ? 'aberto' : 'fechado'}">${esc(status.txt)}</p>
    </div>
    <button class="btn btn-line" type="button" data-act="rota" data-id="${loja.id}">Como chegar</button>
  </article>`
}

export function renderInicio() {
  const hero = OFERTAS.find((item) => item.id === 2)
  const off = Math.max(...OFERTAS.map(discount))
  const news = ['Campanhas', 'Felitá', 'Lojas'].map((cat) => NOTICIAS.find((item) => item.cat === cat))
  const loja = nearestStore()
  const status = storeStatus(loja)
  return `<section class="hero">
    <div class="hero-copy">
      <h1>Hoje tem <em>oferta.</em></h1>
      <p class="lead">Ofertas toda semana nas 17 lojas da Rede Serve Mais, em Cuiabá e Várzea Grande.</p>
      <form class="busca" id="buscaHome" role="search">
        <label class="sr" for="qHome">Busque um produto ou comece sua lista</label>
        <input id="qHome" name="q" type="search" placeholder="Busque um produto ou comece sua lista..." value="${esc(state.busca)}">
        <button class="btn btn-red" type="submit">Buscar</button>
      </form>
      <div class="atalhos">
        <button class="btn btn-yellow" type="button" data-act="campanha" data-campanha="ofertao">Ofertão da semana</button>
        <button class="btn btn-line" type="button" data-act="campanha" data-campanha="fecha">Fecha Mês</button>
        <button class="btn btn-line" type="button" data-act="geo">Perto de mim</button>
      </div>
    </div>
    <div class="hero-foto">
      <p>Fotografia: família no corredor de hortifruti, cesta cheia, sorrindo (a produzir)</p>
      <b class="burst">Até ${off}% OFF <small>(exemplo)</small></b>
      <div class="etiqueta">
        <span>Leve 3</span>
        <strong>${money(adjustPrice(hero.preco, state.unidade))}</strong>
        <small>${money(adjustPrice(hero.de, state.unidade))}</small>
      </div>
    </div>
  </section>
  ${ticker(TICKER)}
  <section class="bloco">
    <div class="sec-head">
      <div>
        <h2>Na gôndola esta semana</h2>
        <p>Selecionadas para a semana. Valores ilustrativos.</p>
      </div>
      <a class="btn btn-line" href="#ofertas">Ver todas as promoções</a>
    </div>
    <div class="grade grade-4">${homeOffers()}</div>
  </section>
  <section class="bloco">
    <h2>Ande pelos corredores</h2>
    <div class="corredores">
      ${SETORES.map((setor, index) => `<a class="placa-corredor" href="#ofertas/${slug(setor.nome)}" style="--placa:${setor.cor};--tinta:${setor.tinta}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${esc(setor.nome)}</strong>
        <em>Entrar &gt;</em>
      </a>`).join('')}
    </div>
  </section>
  <section class="bloco">
    <h2>Campanhas da rede</h2>
    <div class="campanhas">
      <button class="camp camp-red" type="button" data-act="campanha" data-campanha="ofertao">
        <span>Ofertão</span><strong>da semana</strong><em>Toda semana</em><b>Conferir</b>
      </button>
      <button class="camp camp-dark" type="button" data-act="campanha" data-campanha="fecha">
        <span>Fecha</span><strong>mês</strong><em>Economia no fim do mês</em><b>Conferir</b>
      </button>
    </div>
    <div class="camp-row">
      <button class="camp-link camp-sazonal" type="button" data-act="campanha" data-campanha="sazonais">
        <span>Campanhas sazonais</span>
        <strong>Páscoa, Natal, Festa Junina (exemplos)</strong>
        <b>Conferir</b>
      </button>
      <button class="camp-link camp-especial" type="button" data-act="acoes">
        <span class="faixa-mini" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <span>Ações especiais</span>
        <strong>Dias de desconto e parcerias da rede</strong>
        <b>Conferir</b>
      </button>
    </div>
  </section>
  <section class="bloco lista-home">
    <div>
      <h2>Monte sua lista.</h2>
      <p class="lead">Compare e leve no WhatsApp.</p>
      <p>Adicione produtos das ofertas, veja o total estimado da sua compra e envie a lista para você ou para a família. A lista fica salva neste aparelho.</p>
      <ol class="passos">
        <li><b>1</b><span>Adicione</span></li>
        <li><b>2</b><span>Compare</span></li>
        <li><b>3</b><span>Envie</span></li>
      </ol>
      <a class="btn btn-red" href="#ofertas">Começar minha lista</a>
    </div>
    <div class="cupom" data-receipt></div>
  </section>
  <section class="bloco loja-home">
    <div class="sec-head">
      <h2>Loja mais perto de você</h2>
      <button class="btn btn-yellow" type="button" data-act="geo">Usar minha localização</button>
    </div>
    <div class="loja-home-grid">
      <div class="mapa mapa-home">
        <p>Mapa ilustrativo da unidade de exemplo.</p>
        <strong class="${status.on ? 'aberto' : 'fechado'}">${esc(loja.nome)} (exemplo)</strong>
        <span>${esc(status.txt)}</span>
      </div>
      <div class="loja-lista">${spotlight().map(storeRow).join('')}</div>
    </div>
  </section>
  <section class="bloco felita-teaser">
    <p class="kicker">Marca exclusiva</p>
    <h2>Conheça a casa Felitá.</h2>
    <p>Cada cômodo, uma história.</p>
    <a class="btn btn-red" href="#felita">Entrar na casa</a>
  </section>
  <section class="bloco">
    <div class="sec-head">
      <h2>Jornal Serve Mais</h2>
      <a class="btn btn-line" href="#noticias">Ver todas as notícias</a>
    </div>
    <div class="grade grade-3">
      ${news.map((item) => `<a class="news-card" href="#noticias/materia/${item.slug}">
        <span class="foto-news">Imagem da notícia (a fornecer)</span>
        <b>${esc(item.cat)}</b>
        <h3>${esc(item.titulo)}</h3>
        <time>${esc(item.data)}</time>
      </a>`).join('')}
    </div>
  </section>`
}

export function mountInicio() {}
