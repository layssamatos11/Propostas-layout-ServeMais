import { syncChrome } from '../components/chrome.js'
import { CIDADES } from '../data/site.js'
import { NEWS_CATS, articleBySlug } from '../data/noticias.js'
import { matchFiltro } from '../data/ofertas.js'
import { slug } from '../lib/format.js'
import { views } from '../pages/index.js'
import { state } from '../state/store.js'

let current = ''

export function parseLocation() {
  const raw = (location.hash || '#inicio').replace(/^#/, '')
  const [page, ...rest] = raw.split('/').filter(Boolean).map(decodeURIComponent)
  return { page: views[page] ? page : 'inicio', rest }
}

function applyArg(page, rest) {
  if (page === 'ofertas') {
    const id = matchFiltro(rest[0] || '')
    if (id !== state.filtro) {
      state.filtro = id
      state.visiveis = 8
    }
  }
  if (page === 'lojas') {
    const cidade = CIDADES.find((item) => slug(item) === (rest[0] || ''))
    state.cidade = cidade || 'Todas'
  }
  if (page === 'noticias') {
    if (rest[0] === 'materia') {
      state.artigo = articleBySlug(rest[1]) ? rest[1] : ''
      return
    }
    state.artigo = ''
    if (!rest[0] || rest[0] === 'todas') state.noticiaCat = 'Todas'
    else {
      const cat = NEWS_CATS.find((item) => slug(item) === rest[0])
      state.noticiaCat = cat || 'Todas'
    }
    state.pagina = Math.max(1, Number(rest[1]) || 1)
  }
}

export function route() {
  const { page, rest } = parseLocation()
  applyArg(page, rest)
  const key = `${page}/${rest.join('/')}`
  const changed = key !== current
  current = key
  syncChrome(page)
  if (changed) {
    const main = document.getElementById('conteudo')
    main.innerHTML = `<div class="page">${views[page].render()}</div>`
    window.scrollTo(0, 0)
  }
  views[page].mount()
}

export function forceRender() {
  current = ''
  route()
}

export function startRouter() {
  window.addEventListener('hashchange', route)
  if (!location.hash) history.replaceState(null, '', '#inicio')
  route()
}
