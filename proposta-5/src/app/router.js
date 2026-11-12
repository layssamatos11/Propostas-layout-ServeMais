import { syncChrome } from '../components/chrome.js'
import { paintCommerce } from '../components/receipt.js'
import { ROOMS } from '../data/felita.js'
import { articleBySlug } from '../data/noticias.js'
import { CAMPANHAS, NEWS_CATS, SETORES } from '../data/site.js'
import { slug } from '../lib/format.js'
import { views } from '../pages/index.js'
import { state } from '../state/store.js'

let current = ''

export function parseLocation() {
  const raw = (location.hash || '#inicio').replace(/^#/, '')
  const parts = raw.split('/').map((part) => {
    try { return decodeURIComponent(part) } catch { return part }
  })
  const page = views[parts[0]] ? parts[0] : 'inicio'
  return { page, rest: parts.slice(1) }
}

function applyArg(page, rest) {
  if (page === 'ofertas') {
    const arg = rest[0] || ''
    const camp = CAMPANHAS.find((item) => slug(item.nome) === arg || item.id === arg)
    const setor = SETORES.find((item) => slug(item.nome) === arg)
    state.corredor = ''
    state.campanha = ''
    state.marca = ''
    if (arg === 'felita') state.marca = 'felita'
    else if (camp) state.campanha = camp.id
    else if (setor) state.corredor = setor.nome
    if (state.offerKey !== arg) state.limite = 6
    state.offerKey = arg
  }
  if (page === 'lojas' && /^\d+$/.test(rest[0] || '')) state.pin = Number(rest[0])
  if (page === 'felita' && ROOMS.some((room) => room.id === rest[0])) state.room = rest[0]
  if (page === 'noticias') {
    const [a, b] = rest
    if (a === 'materia') {
      state.artigo = articleBySlug(b) ? b : ''
      return
    }
    state.artigo = ''
    const cat = NEWS_CATS.find((item) => slug(item) === (a || 'todas')) || 'Todas'
    state.noticiaCat = cat
    state.pagina = Math.max(1, Number(b) || 1)
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
    document.getElementById('conteudo').innerHTML = views[page].render()
    window.scrollTo(0, 0)
  }
  views[page].mount()
  paintCommerce()
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
