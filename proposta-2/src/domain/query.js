import { OFERTAS } from '../data/ofertas.js'
import { LOJAS } from '../data/lojas.js'
import { state } from '../state/store.js'
import { isOpen } from './hours.js'
import { adjustPrice, discountRatio } from './pricing.js'

function inFaixa(product) {
  const price = adjustPrice(product.preco, state.loja)
  if (state.faixa === 'ate10') return price <= 10
  if (state.faixa === '10a30') return price > 10 && price <= 30
  if (state.faixa === 'acima30') return price > 30
  return true
}

export function filteredOffers() {
  const query = state.oq.trim().toLowerCase()
  const items = OFERTAS.filter((product) => {
    if (state.corredor && product.cat !== state.corredor) return false
    if (state.campanha && product.camp !== state.campanha) return false
    if (state.marca === 'felita' && product.marca !== 'felita') return false
    if (!inFaixa(product)) return false
    if (!query) return true
    return `${product.nome} ${product.cat} ${product.det}`.toLowerCase().includes(query)
  })
  return items.sort((a, b) => discountRatio(b) - discountRatio(a))
}

export function filteredStores() {
  const query = state.q.trim().toLowerCase()
  return LOJAS.filter((loja) => {
    if (state.cidade !== 'Todas' && loja.cidade !== state.cidade) return false
    if (state.aberto && !isOpen(loja)) return false
    if (state.servico && !loja.servicos.includes(state.servico)) return false
    if (!query) return true
    return `${loja.nome} ${loja.bairro} ${loja.cidade} ${loja.end}`.toLowerCase().includes(query)
  })
}
