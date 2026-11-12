import { NOTICIAS, articleBySlug } from '../data/noticias.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

function card(item) {
  const ink = item.cor === '#F6E7A8' || item.cor === '#C6A15B' ? '#1A1A1A' : '#fff'
  return `<a class="news-card" href="#noticias/${item.slug}">
    <span class="news-foto" style="background:${item.cor};color:${ink}">Foto (a fornecer)</span>
    <small>${esc(item.data)} · ${esc(item.cat)}</small>
    <h3>${esc(item.titulo)}</h3>
    <p>${esc(item.linha)}</p>
  </a>`
}

function articlePage(item) {
  const body = item.corpo.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')
  return `<article class="wrap article">
    <p class="migalha"><a href="#noticias">Notícias</a> › ${esc(item.cat)}</p>
    <p class="selo">Demonstrativo</p>
    <h1>${esc(item.titulo)}</h1>
    <p class="linha-fina">${esc(item.linha)}</p>
    <p class="byline">${esc(item.data)} · ${esc(item.autor)}</p>
    <div class="article-foto" style="background:${item.cor}">Foto da notícia (a fornecer)</div>
    ${body}
  </article>`
}

export function noticiasPage() {
  if (state.artigo) {
    const item = articleBySlug(state.artigo)
    if (item) return articlePage(item)
  }
  const [first, ...rest] = NOTICIAS
  return `<section class="wrap news-head">
    <p class="pill pill-blue">Notícias</p>
    <h1>O que está acontecendo na Serve Mais.</h1>
    <a class="feature" href="#noticias/${first.slug}">
      <span class="feature-foto">Foto da notícia em destaque (a fornecer)</span>
      <span>
        <em class="selo">Demonstrativo</em>
        <h2>${esc(first.titulo)}</h2>
        <p>${esc(first.linha)}</p>
        <span class="btn btn-navy">Ler notícia</span>
      </span>
    </a>
    <div class="news-grid">${rest.map(card).join('')}</div>
  </section>`
}

export function mountNoticias() {}
