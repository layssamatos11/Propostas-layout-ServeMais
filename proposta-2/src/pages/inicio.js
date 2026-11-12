import { mapPanel } from '../components/map-panel.js'
import { productCard } from '../components/product-card.js'
import { ticker } from '../components/ticker.js'
import { NOTICIAS } from '../data/noticias.js'
import { OFERTAS } from '../data/ofertas.js'
import { SETORES } from '../data/setores.js'
import { discountRatio, maxDiscountPercent } from '../domain/pricing.js'
import { esc, slug } from '../lib/format.js'
import { spotlightStores } from '../state/store.js'
import { storeRow } from '../components/store-card.js'
import { storeStatus } from '../domain/hours.js'

export function inicioPage() {
  const offers = [...OFERTAS].sort((a, b) => discountRatio(b) - discountRatio(a)).slice(0, 4)
  const off = maxDiscountPercent(OFERTAS)
  const heroOffer = offers[0]
  const corridors = SETORES.map((setor, index) => {
    return `<a class="placa" href="#ofertas/${slug(setor.nome)}">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <strong>${esc(setor.nome)}</strong>
      <em>Entrar ></em>
    </a>`
  }).join('')
  const stores = spotlightStores()
  const news = NOTICIAS.slice(0, 3).map((item) => {
    return `<a class="news-card" href="#noticias/${item.slug}">
      <span class="news-foto">Imagem</span>
      <small>${esc(item.cat)}</small>
      <h3>${esc(item.titulo)}</h3>
      <time>${item.data}</time>
    </a>`
  }).join('')

  return `<section class="hero">
    <div class="wrap hero-grid">
      <div>
        <h1>Hoje tem <em>oferta.</em></h1>
        <p class="lead">Ofertas toda semana nas 17 lojas da Rede Serve Mais, em Cuiabá e Várzea Grande.</p>
        <form class="busca" id="buscaHome">
          <label class="sr-only" for="qHome">Buscar um produto</label>
          <input id="qHome" name="q" type="search" placeholder="Busque um produto ou comece sua lista..." autocomplete="off">
          <button class="btn btn-yellow" type="submit">Buscar</button>
        </form>
        <div class="atalhos">
          <a href="#ofertas/ofertao-da-semana">Ofertão da semana</a>
          <a href="#ofertas/fecha-mes">Fecha Mês</a>
          <button type="button" data-act="geo">Perto de mim</button>
        </div>
      </div>
      <div class="hero-palco">
        <div class="burst"><small>Até</small><strong>${off}%</strong><em>off (exemplo)</em></div>
        <div class="hero-foto"><span>Fotografia: família no corredor de hortifruti (a produzir)</span></div>
        <aside class="hero-ticket">
          <small>${esc(heroOffer.tag === 'PCT' ? 'Oferta' : heroOffer.tag)}</small>
          <strong>R$ ${heroOffer.preco.toFixed(2).replace('.', ',')}</strong>
          <span>${esc(heroOffer.nome)}</span>
        </aside>
        <p class="hero-stat"><b>17</b><span>lojas</span></p>
      </div>
    </div>
  </section>
  ${ticker()}
  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <h2>Na gôndola esta semana</h2>
          <p>Selecionadas para a semana. Valores ilustrativos.</p>
        </div>
        <a class="btn btn-line" href="#ofertas">Ver todas as promoções</a>
      </div>
      <div class="gondolas">${offers.map(productCard).join('')}</div>
    </div>
  </section>
  <section class="sec sec-sand">
    <div class="wrap">
      <h2>Ande pelos corredores</h2>
      <div class="trilhos">${corridors}</div>
    </div>
  </section>
  <section class="sec">
    <div class="wrap campanhas">
      <article class="camp camp-red">
        <p>Ofertão</p>
        <h2>da <em>semana</em></h2>
        <a class="btn btn-yellow" href="#ofertas/ofertao-da-semana">Conferir</a>
      </article>
      <article class="camp camp-yellow">
        <p>Fecha</p>
        <h2><em>mês</em></h2>
        <a class="btn btn-red" href="#ofertas/fecha-mes">Conferir</a>
      </article>
      <a class="camp-link camp-sazonal" href="#ofertas/sazonais"><strong>Campanhas sazonais</strong><span>Páscoa, Natal, Festa Junina (exemplos)</span><em>Conferir</em></a>
      <button class="camp-link camp-especial" type="button" data-act="acoes"><strong>Ações especiais</strong><span>Dias de desconto e parcerias da rede</span><em>Conferir</em></button>
    </div>
  </section>
  <section class="sec sec-sand">
    <div class="wrap lista-home">
      <div>
        <h2>Monte sua lista.</h2>
        <p class="display-em">Compare e leve no WhatsApp.</p>
        <p>Adicione produtos das ofertas, veja o total estimado da sua compra e envie a lista para você ou para a família.</p>
        <ol class="passos">
          <li><b>1</b><span>Adicione</span></li>
          <li><b>2</b><span>Compare</span></li>
          <li><b>3</b><span>Envie</span></li>
        </ol>
        <a class="btn btn-red" href="#ofertas">Começar minha lista</a>
      </div>
      <aside class="cupom" data-receipt></aside>
    </div>
  </section>
  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <h2>Loja mais perto de você</h2>
          <p>Três unidades em torno da loja escolhida. Dados demonstrativos.</p>
        </div>
        <button class="btn btn-line" type="button" data-act="geo">Usar minha localização</button>
      </div>
      <div class="perto">
        ${mapPanel()}
        <div>${stores.map((loja) => {
          const status = storeStatus(loja)
          return `<div class="perto-card">${storeRow(loja).replace('loja-row', 'loja-row perto-row')}<span class="status ${status.on ? 'on' : 'off'}">${status.on ? 'Aberto agora' : 'Fechado'}</span></div>`
        }).join('')}</div>
      </div>
    </div>
  </section>
  <section class="sec felita-teaser">
    <div class="wrap felita-teaser-grid">
      <div>
        <p class="kicker kicker-blue">Marca exclusiva</p>
        <h2>Conheça a casa <em>Felitá.</em></h2>
        <p>Cada cômodo, uma história.</p>
        <a class="btn btn-blue" href="#felita">Entrar na casa</a>
      </div>
      <div class="casa-silhueta" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
    </div>
  </section>
  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <h2>Jornal Serve Mais</h2>
        <a class="btn btn-line" href="#noticias">Ver todas as notícias</a>
      </div>
      <div class="news-row">${news}</div>
    </div>
  </section>`
}

export function mountInicio() {}
