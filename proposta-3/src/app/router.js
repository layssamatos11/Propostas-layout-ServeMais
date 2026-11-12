import { syncChrome } from '../components/chrome.js'
import { CATS, CIDADES } from '../data/site.js'
import { articleBySlug } from '../data/noticias.js'
import { slug } from '../lib/format.js'
import { views } from '../pages/index.js'
import { state } from '../state/store.js'

let current = ''

export function parseLocation() {
  const raw = (location.hash || '#inicio').replace(/^#/, '')
  const [page, arg = ''] = raw.split('/')
  return { page: views[page] ? page : 'inicio', arg: decodeURIComponent(arg) }
}

function applyArg(page, arg) {
  if (page === 'ofertas') {
    const cat = CATS.find((item) => slug(item) === arg)
    state.cat = cat || 'Todas'
  }
  if (page === 'lojas') {
    const cidade = CIDADES.find((item) => slug(item) === arg)
    state.cidade = cidade || 'Todas'
  }
  if (page === 'noticias') state.artigo = articleBySlug(arg) ? arg : ''
}

export function route() {
  const { page, arg } = parseLocation()
  applyArg(page, arg)
  const key = `${page}/${arg}`
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
  route()
}
