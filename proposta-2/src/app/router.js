import { syncChrome } from '../components/chrome.js'
import { paintCommerce } from '../components/receipt.js'
import { ROOMS } from '../data/felita.js'
import { articleBySlug } from '../data/noticias.js'
import { CAMPANHAS, SETORES } from '../data/setores.js'
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
    const prev = state.offerArg
    state.corredor = ''
    state.campanha = ''
    state.marca = ''
    if (arg === 'felita') state.marca = 'felita'
    else {
      const camp = CAMPANHAS.find((item) => slug(item) === arg)
      const setor = SETORES.find((item) => slug(item.nome) === arg)
      if (camp) state.campanha = camp
      else if (setor) state.corredor = setor.nome
    }
    if (prev !== arg) state.limite = 6
    state.offerArg = arg
  }
  if (page === 'lojas' && /^\d+$/.test(arg)) state.pin = Number(arg)
  if (page === 'noticias') state.artigo = articleBySlug(arg) ? arg : ''
  if (page === 'felita' && ROOMS.some((room) => room.id === arg)) state.room = arg
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
    main.classList.remove('in')
    void main.offsetWidth
    main.classList.add('in')
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
  route()
}
