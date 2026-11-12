import { LOJAS } from '../data/lojas.js'
import { NAV } from '../data/site.js'
import { storeStatus } from '../domain/hours.js'
import { esc } from '../lib/format.js'
import { nearestStore } from '../state/store.js'

const TITLES = {
  inicio: '',
  ofertas: 'Ofertas',
  lista: 'Minha lista',
  felita: 'Marca exclusiva',
  noticias: 'Notícias',
  trabalhe: 'Trabalhe conosco',
  contato: 'Contato',
  lojas: 'Nossas lojas',
  privacidade: 'Política de privacidade',
  cookies: 'Política de cookies',
}

export function syncChrome(page) {
  const nav = NAV.map(([id, label]) => {
    const current = id === page ? ' aria-current="page"' : ''
    return `<a href="#${id}"${current}>${label}</a>`
  }).join('')
  document.getElementById('navDesktop').innerHTML = nav
  document.getElementById('navMobile').innerHTML = nav
  document.querySelectorAll('[data-nav-lojas]').forEach((node) => {
    if (page === 'lojas') node.setAttribute('aria-current', 'page')
    else node.removeAttribute('aria-current')
  })
  document.querySelectorAll('[data-tab]').forEach((node) => {
    if (node.dataset.tab === page) node.setAttribute('aria-current', 'page')
    else node.removeAttribute('aria-current')
  })
  const loja = nearestStore()
  const status = storeStatus(loja)
  const word = status.on ? 'Aberto agora' : 'Fechado agora'
  document.getElementById('pertoStatus').textContent = `${word} na unidade mais próxima: ${loja.nome} (exemplo)`
  document.body.dataset.page = page
  document.title = page === 'inicio'
    ? 'Rede Serve Mais — Sua lista, nossa gôndola'
    : `${TITLES[page] || 'Rede Serve Mais'} | Rede Serve Mais`
}

export function storeOptions(selected) {
  return LOJAS.map((loja) => `<option value="${loja.id}"${loja.id === Number(selected) ? ' selected' : ''}>${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
}
