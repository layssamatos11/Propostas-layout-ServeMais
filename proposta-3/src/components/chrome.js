import { NAV } from '../data/site.js'

const TITLES = {
  inicio: '',
  ofertas: 'Ofertas',
  felita: 'Marca exclusiva',
  noticias: 'Notícias',
  trabalhe: 'Trabalhe conosco',
  contato: 'Contato',
  lojas: 'Nossas lojas',
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
  document.title = page === 'inicio'
    ? 'Rede Serve Mais — Tudo que a sua casa precisa'
    : `${TITLES[page] || 'Rede Serve Mais'} | Rede Serve Mais`
}

export function faixa() {
  return `<div class="faixa" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>`
}
