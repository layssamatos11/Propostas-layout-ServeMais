import { NEWS_CATS, articleBySlug } from '../data/noticias.js'
import { newsSplit } from '../domain/query.js'
import { esc, slug } from '../lib/format.js'
import { state } from '../state/store.js'

function card(item) {
  return `<a class="card-news" href="#noticias/materia/${esc(item.slug)}">
    <span class="foto-news" style="background:${esc(item.cor)}"><span>Imagem da notícia (a fornecer)</span></span>
    <span class="olho">${esc(item.cat)}</span>
    <time>${esc(item.data)}</time>
    <strong>${esc(item.titulo)}</strong>
    <em>Ler mais</em>
  </a>`
}

export function validateNews(form) {
  const email = String(new FormData(form).get('email') || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Digite um e-mail válido.'
  if (!form.aceite.checked) return 'Aceite a política de privacidade para continuar.'
  return ''
}

function lista() {
  const { feature, slice, pages, pagina } = newsSplit()
  const cats = NEWS_CATS.map((cat) => {
    const pressed = state.noticiaCat === cat ? 'true' : 'false'
    return `<button type="button" class="chip" data-act="ncat" data-cat="${esc(cat)}" aria-pressed="${pressed}">${esc(cat)}</button>`
  }).join('')
  const featureHtml = feature
    ? `<a class="news-feature" href="#noticias/materia/${esc(feature.slug)}">
        <span class="foto-news grande" style="background:${esc(feature.cor)}"><span>Foto de destaque (a fornecer)</span></span>
        <span>
          <span class="olho">Destaque · ${esc(feature.cat)}</span>
          <time>${esc(feature.data)}</time>
          <h2>${esc(feature.titulo)}</h2>
          <p>${esc(feature.linha)}</p>
          <em>Ler matéria</em>
        </span>
      </a>`
    : '<p class="vazio">Nenhuma notícia neste filtro.</p>'
  const pagesHtml = pages > 1
    ? `<nav class="paginacao" aria-label="Páginas de notícias">${Array.from({ length: pages }, (_, index) => {
        const n = index + 1
        const current = n === pagina ? ' aria-current="page"' : ''
        return `<button type="button" data-act="npage" data-page="${n}"${current}>${n}</button>`
      }).join('')}</nav>`
    : ''
  return `<header class="page-head">
      <p class="olho">Notícias</p>
      <h1>Novidades da rede, das lojas e das campanhas.</h1>
      <p class="lead">Conteúdo demonstrativo.</p>
    </header>
    <div class="chips" role="group" aria-label="Editorias">${cats}</div>
    ${featureHtml}
    <div class="news-grid">${slice.map(card).join('')}</div>
    ${pagesHtml}
    <form class="news-form" id="newsForm" novalidate>
      <h2>Receba nossas promoções</h2>
      <p>Ao enviar, você confirma que leu a política de privacidade. Nada sai deste navegador.</p>
      <div class="form-grid">
        <label>Seu e-mail<input name="email" type="email" autocomplete="email" required></label>
        <label>Seu WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" inputmode="tel"></label>
      </div>
      <label class="check"><input name="aceite" type="checkbox"> Li e aceito a <a href="#privacidade">política de privacidade</a>.</label>
      <p class="erro" id="newsErr" role="alert"></p>
      <p class="ok" id="newsOk" role="status"></p>
      <p class="acoes">
        <button class="btn btn-red" type="submit">Enviar</button>
        <button class="btn btn-ghost" type="button" data-act="zap">Nosso canal no WhatsApp</button>
      </p>
    </form>`
}

function artigo() {
  const item = articleBySlug(state.artigo)
  if (!item) return lista()
  return `<article class="materia">
      <p class="migalha"><a href="#noticias">Notícias</a> › ${esc(item.cat)}</p>
      <p class="olho">${esc(item.cat)} · demonstrativo</p>
      <h1>${esc(item.titulo)}</h1>
      <p class="lead">${esc(item.linha)}</p>
      <p class="nota">${esc(item.data)} · Equipe Serve Mais</p>
      <div class="foto-news grande" style="background:${esc(item.cor)}"><span>Foto da matéria (a fornecer)</span></div>
      ${item.corpo.map((p) => `<p>${esc(p)}</p>`).join('')}
      <p><a class="btn btn-ghost" href="#noticias">Voltar às notícias</a></p>
    </article>`
}

export function renderNoticias() {
  return state.artigo ? artigo() : lista()
}

export function mountNoticias() {}

export { slug }
