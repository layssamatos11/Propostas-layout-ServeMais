import { OFERTAS } from '../data/ofertas.js'
import { LOJAS } from '../data/lojas.js'
import { state } from '../state/store.js'
import { isOpen } from './hours.js'
import { adjustPrice, discountRatio } from './pricing.js'

export function matchesFilter(product, filter) {
  if (!filter || filter === 'Todas') return true
  return product.cat === filter || product.camp === filter
}

export function filteredOffers() {
  const query = state.oq.trim().toLowerCase()
  return OFERTAS.filter((product) => {
    if (!matchesFilter(product, state.filtro)) return false
    if (!query) return true
    return `${product.nome} ${product.cat} ${product.det}`.toLowerCase().includes(query)
  })
}

export function sortedOffers(list) {
  const items = list.slice()
  const price = (product) => adjustPrice(product.preco, state.loja)
  if (state.ordem === 'menor') items.sort((a, b) => price(a) - price(b))
  else if (state.ordem === 'maior') items.sort((a, b) => price(b) - price(a))
  else if (state.ordem === 'nome') items.sort((a, b) => a.nome.localeCompare(b.nome, 'pt'))
  else items.sort((a, b) => discountRatio(b) - discountRatio(a))
  return items
}

export function filteredStores() {
  const query = state.q.trim().toLowerCase()
  return LOJAS.filter((loja) => {
    if (state.cidade !== 'Todas' && loja.cidade !== state.cidade) return false
    if (state.aberto && !isOpen(loja)) return false
    if (!query) return true
    return `${loja.nome} ${loja.bairro} ${loja.cidade} ${loja.end}`.toLowerCase().includes(query)
  })
}

export function maxDiscountPercent() {
  return Math.round(Math.max(...OFERTAS.map(discountRatio)) * 100)
}
