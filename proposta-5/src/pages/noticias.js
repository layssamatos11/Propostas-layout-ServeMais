import { articleBySlug, NOTICIAS } from '../data/noticias.js'
import { NEWS_CATS } from '../data/site.js'
import { newsSplit } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { state } from '../state/store.js'

function card(item) {
  return `<a class="news-card" href="#noticias/materia/${item.slug}">
    <span class="foto-news">Imagem da notícia (a fornecer)</span>
    <b>${esc(item.cat)}</b>
    <h3>${esc(item.titulo)}</h3>
    <p>${esc(item.linha)}</p>
    <time>${esc(item.data)}</time>
  </a>`
}

function listHtml() {
  const { feature, cards, pages, pagina } = newsSplit(state)
  const populares = [...NOTICIAS].sort((a, b) => b.lidas - a.lidas).slice(0, 5)
  const cats = NEWS_CATS.map((cat) => `<a class="chip" href="#noticias/${slug(cat)}/1"${state.noticiaCat === cat ? ' aria-current="page"' : ''}>${esc(cat)}</a>`).join('')
  const pager = Array.from({ length: pages }, (_, index) => {
    const n = index + 1
    return `<button type="button" data-act="npage" data-page="${n}"${n === pagina ? ' aria-current="page"' : ''}>${n}</button>`
  }).join('')
  return `<header class="jornal-head">
    <p class="kicker">Jornal Serve Mais</p>
    <p>Edição demonstrativa · Cuiabá e Várzea Grande · 00 de mês de 0000</p>
    <div class="chips">${cats}</div>
  </header>
  <div class="jornal">
    ${feature ? `<a class="feature" href="#noticias/materia/${feature.slug}">
      <span class="foto-news foto-capa">Foto de capa da matéria principal (a fornecer)</span>
      <b>Destaque · ${esc(feature.cat)}</b>
      <h1>${esc(feature.titulo)}</h1>
      <p>${esc(feature.linha)}</p>
      <p>Por ${esc(feature.autor)} · ${esc(feature.data)} · ${esc(feature.leitura)} de leitura</p>
    </a>` : '<p class="vazio">Nenhuma matéria nesta editoria.</p>'}
    <aside>
      <h2>Mais lidas</h2>
      <ol>
        ${populares.map((item) => `<li><a href="#noticias/materia/${item.slug}">${esc(item.titulo)}</a><time>${esc(item.data)}</time></li>`).join('')}
      </ol>
    </aside>
  </div>
  <div class="grade grade-3">${cards.map(card).join('')}</div>
  <nav class="pager" aria-label="Páginas de notícias">${pager}</nav>
  <form class="news-form" id="newsForm" novalidate>
    <h2>Receba nossas promoções</h2>
    <p>Ao clicar em Enviar, você confirma que leu a política de privacidade. Nada sai deste navegador.</p>
    <div class="form-grid">
      <label>Seu e-mail<input name="email" type="email" autocomplete="email" required></label>
      <label>Seu WhatsApp<input name="whatsapp" type="tel" inputmode="tel" autocomplete="tel"></label>
    </div>
    <label class="check"><input name="aceite" type="checkbox"> Li e aceito a <a href="#privacidade">política de privacidade</a>.</label>
    <div class="btn-row">
      <button class="btn btn-red" type="submit">Enviar</button>
      <button class="btn btn-line" type="button" data-act="zap">Nosso canal no WhatsApp</button>
    </div>
    <p id="newsErr" role="alert"></p>
    <p id="newsOk" role="status"></p>
  </form>`
}

function articleHtml() {
  const item = articleBySlug(state.artigo)
  if (!item) return listHtml()
  return `<article class="materia">
    <p class="kicker"><a href="#noticias">Notícias</a> · ${esc(item.cat)}</p>
    <h1>${esc(item.titulo)}</h1>
    <p class="lead">${esc(item.linha)}</p>
    <p>Por ${esc(item.autor)} · ${esc(item.data)} · ${esc(item.leitura)} de leitura</p>
    <p class="foto-news foto-capa">Foto de capa (a fornecer)</p>
    ${item.corpo.map((p) => `<p>${esc(p)}</p>`).join('')}
    <a class="btn btn-line" href="#noticias">Voltar às notícias</a>
  </article>`
}

export function renderNoticias() {
  return state.artigo ? articleHtml() : listHtml()
}

export function mountNoticias() {}

export function validateNews(form) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return 'Digite um e-mail válido.'
  if (!form.aceite.checked) return 'Aceite a política de privacidade para continuar.'
  return ''
}
