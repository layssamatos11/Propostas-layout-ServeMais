import { syncChrome } from '../components/site-nav.js'
import { paintQty } from '../components/shopping-list.js'
import { FILTROS } from '../data/setores.js'
import { slug } from '../lib/format.js'
import { views } from '../pages/index.js'
import { state } from '../state/store.js'

let current = ''

export function parseLocation() {
  const raw = (location.hash || '#inicio').replace('#', '')
  const [page, arg = ''] = raw.split('/')
  return { page: views[page] ? page : 'inicio', arg }
}

function applyArg(page, arg) {
  if (page === 'ofertas') {
    if (!arg) state.filtro = 'Todas'
    else {
      const label = FILTROS.find((filter) => slug(filter) === arg)
      if (label) state.filtro = label
    }
  }
  if (page === 'lojas' && /^\d+$/.test(arg)) state.pin = Number(arg)
}

export function route() {
  const { page, arg } = parseLocation()
  applyArg(page, arg)
  const changed = page !== current
  current = page
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
  paintQty()
}

export function startRouter() {
  window.addEventListener('hashchange', route)
  route()
}
