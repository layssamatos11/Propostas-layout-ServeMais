import { NAV } from '../data/site.js'

const TITLES = {
  inicio: '',
  ofertas: 'Ofertas',
  felita: 'Marca exclusiva',
  noticias: 'Notícias',
  trabalhe: 'Trabalhe conosco',
  contato: 'Contato',
  lojas: 'Nossas lojas',
  institucional: 'Institucional',
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
  document.title = page === 'inicio'
    ? 'Rede Serve Mais — Mais perto de você'
    : `${TITLES[page] || 'Rede Serve Mais'} | Rede Serve Mais`
}
