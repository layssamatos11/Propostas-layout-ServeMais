import { LOJAS } from '../data/lojas.js'
import { PAGES, TABS } from '../data/site.js'
import { storeStatus } from '../domain/hours.js'
import { esc } from '../lib/format.js'
import { listCount, nearestStore } from '../state/store.js'

const TITLES = {
  inicio: '',
  lista: 'Minha lista',
  institucional: 'Institucional',
  ...Object.fromEntries(PAGES),
}

export function syncChrome(page) {
  const nav = PAGES.map(([id, label], index) => {
    const current = id === page ? ' aria-current="page"' : ''
    return `<a href="#${id}"${current}><small>${String(index + 1).padStart(2, '0')}</small>${label}</a>`
  }).join('')
  document.getElementById('navDesktop').innerHTML = nav
  document.getElementById('navMobile').innerHTML = nav
  const count = listCount()
  document.getElementById('tabbar').innerHTML = TABS.map(([id, label]) => {
    const current = id === page ? ' aria-current="page"' : ''
    const badge = id === 'lista' ? `<b data-list-count${count ? '' : ' hidden'}>${count}</b>` : ''
    return `<a href="#${id}"${current}>${label}${badge}</a>`
  }).join('')
  const loja = nearestStore()
  const status = storeStatus(loja)
  document.getElementById('nearestName').textContent = `${loja.nome} (exemplo)`
  const flag = document.getElementById('nearestFlag')
  flag.textContent = status.on ? 'Aberto agora' : 'Fechado agora'
  flag.className = status.on ? 'on' : 'off'
  document.title = page === 'inicio'
    ? 'Rede Serve Mais — Sua lista, nossa gôndola'
    : `${TITLES[page] || 'Rede Serve Mais'} | Rede Serve Mais`
}

export function storeOptions(selected) {
  const head = `<option value="">Unidade ilustrativa mais próxima</option>`
  const options = LOJAS.map((loja) => {
    const on = Number(selected) === loja.id ? ' selected' : ''
    return `<option value="${loja.id}"${on}>${esc(loja.nome)} · ${esc(loja.bairro)}</option>`
  }).join('')
  return head + options
}
