import { NOTICIAS, articleBySlug } from '../data/noticias.js'
import { NEWS_CATS } from '../data/site.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

const PAGE_SIZE = 6

function card(item) {
  return `<a class="news-card" href="#noticias/${item.slug}">
    <span class="news-foto">Imagem da notícia</span>
    <small>${esc(item.cat)}</small>
    <h3>${esc(item.titulo)}</h3>
    <p>${esc(item.linha)}</p>
    <time>${item.data}</time>
  </a>`
}

function articlePage(item) {
  const body = item.corpo.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')
  return `<article class="wrap article">
    <a class="back" href="#noticias">← Jornal Serve Mais</a>
    <p class="kicker">${esc(item.cat)}</p>
    <h1>${esc(item.titulo)}</h1>
    <p class="linha-fina">${esc(item.linha)}</p>
    <p class="byline">Por ${esc(item.autor)} · ${item.data} · ${item.leitura} de leitura</p>
    <div class="article-foto">Foto de capa (a produzir)</div>
    ${body}
    <p class="note">Texto demonstrativo. A matéria oficial será publicada pela rede.</p>
  </article>`
}

export function noticiasPage() {
  if (state.artigo) {
    const item = articleBySlug(state.artigo)
    if (item) return articlePage(item)
  }
  const cats = NEWS_CATS.map((cat) => {
    const on = state.newsCat === cat ? ' aria-pressed="true"' : ' aria-pressed="false"'
    return `<button type="button" data-act="news-cat" data-cat="${esc(cat)}"${on}>${esc(cat)}</button>`
  }).join('')
  const popular = [...NOTICIAS].sort((a, b) => b.lidas - a.lidas).slice(0, 5).map((item, index) => {
    return `<a href="#noticias/${item.slug}"><b>${index + 1}</b><span>${esc(item.titulo)}</span><time>${item.data}</time></a>`
  }).join('')
  return `<section class="wrap jornal">
    <header class="masthead">
      <h1>Jornal Serve Mais</h1>
      <p>Edição demonstrativa · Cuiabá e Várzea Grande · 00 de mês de 0000</p>
    </header>
    <div class="chips">${cats}</div>
    <div class="jornal-grid">
      <div>
        <div id="newsFeature"></div>
        <div class="news-row" id="newsGrid"></div>
        <div class="pager" id="newsPager"></div>
      </div>
      <aside>
        <h2>Mais lidas</h2>
        <div class="mais-lidas">${popular}</div>
      </aside>
    </div>
    <form class="news-form" id="newsForm" novalidate>
      <h2>Receba nossas promoções</h2>
      <p>Ao clicar em Enviar, confirmo que li e aceito a <button type="button" data-act="politica" data-qual="privacidade">política de privacidade</button> e os termos de uso.</p>
      <div class="news-fields">
        <label>Seu e-mail<input name="email" type="email" autocomplete="email" required></label>
        <label>Seu WhatsApp<input name="whats" inputmode="tel" autocomplete="tel"></label>
        <button class="btn btn-red" type="submit">Enviar</button>
      </div>
      <p id="newsOk" role="status"></p>
    </form>
  </section>`
}

export function mountNoticias() {
  const feature = document.getElementById('newsFeature')
  const grid = document.getElementById('newsGrid')
  if (!feature || !grid) return
  const items = NOTICIAS.filter((item) => state.newsCat === 'Todas' || item.cat === state.newsCat)
  const [first, ...rest] = items
  feature.innerHTML = first ? `<a class="feature" href="#noticias/${first.slug}">
      <span class="feature-foto">Foto de capa da matéria principal</span>
      <div>
        <small>Destaque · ${esc(first.cat)}</small>
        <h2>${esc(first.titulo)}</h2>
        <p>${esc(first.linha)}</p>
        <p class="byline">Por ${esc(first.autor)} · ${first.data} · ${first.leitura} de leitura</p>
      </div>
    </a>` : '<p class="empty">Nenhuma matéria nesta editoria.</p>'
  const pages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE))
  if (state.newsPage > pages) state.newsPage = 1
  const slice = rest.slice((state.newsPage - 1) * PAGE_SIZE, state.newsPage * PAGE_SIZE)
  grid.innerHTML = slice.map(card).join('')
  const pager = document.getElementById('newsPager')
  pager.innerHTML = pages < 2 ? '' : Array.from({ length: pages }, (_, index) => {
    const page = index + 1
    const on = page === state.newsPage ? ' aria-current="page"' : ''
    return `<button type="button" data-act="news-page" data-page="${page}"${on}>${page}</button>`
  }).join('')
  document.querySelectorAll('[data-cat]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.cat === state.newsCat))
  })
}
