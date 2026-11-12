import { PAGES, TAB_ITEMS } from '../data/navigation.js'

function link(page, label, current) {
  const currentAttr = page === current ? ' aria-current="page"' : ''
  return `<a href="#${page}" data-nav="${page}"${currentAttr}>${label}</a>`
}

export function navLinks(current) {
  return PAGES.map(([page, label]) => link(page, label, current)).join('')
}

export function tabLinks(current) {
  const items = TAB_ITEMS.map(([page, label]) => link(page, label, current)).join('')
  return `${items}<button type="button" data-act="open-menu">Menu</button>`
}

export function syncChrome(page) {
  document.getElementById('navDesktop').innerHTML = navLinks(page)
  document.getElementById('navMobile').innerHTML = navLinks(page)
  document.getElementById('tabbar').innerHTML = tabLinks(page)
  const name = PAGES.find((item) => item[0] === page)[1]
  document.title = page === 'inicio'
    ? 'Rede Serve Mais — Cuiabá e Várzea Grande'
    : `${name} | Rede Serve Mais`
}
