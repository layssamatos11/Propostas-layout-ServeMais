import { NOTICIAS } from '../data/noticias.js'
import { adjustPrice } from './price.js'
import { isOpen } from './hours.js'
import { discount, norm } from '../lib/format.js'

export function filteredOffers(state) {
  return [...state.ofertas].filter((item) => {
    if (state.corredor && item.cat !== state.corredor) return false
    if (state.campanha && item.camp !== state.campanha) return false
    if (state.marca === 'felita' && item.marca !== 'felita') return false
    if (state.busca && !norm(`${item.nome} ${item.det}`).includes(norm(state.busca))) return false
    const price = adjustPrice(item.preco, state.unidade)
    if (state.faixa === 'ate10' && price > 10) return false
    if (state.faixa === '10a30' && (price < 10 || price > 30)) return false
    if (state.faixa === 'acima30' && price <= 30) return false
    return true
  }).sort((a, b) => discount(b) - discount(a) || a.nome.localeCompare(b.nome, 'pt-BR'))
}

export function filteredStores(state, lojas) {
  return lojas.filter((loja) => {
    if (state.cidade !== 'Todas' && loja.cidade !== state.cidade) return false
    if (state.aberto && !isOpen(loja)) return false
    if (state.servico && !loja.servicos.includes(state.servico)) return false
    if (state.q && !norm(`${loja.nome} ${loja.bairro} ${loja.cidade} ${loja.end}`).includes(norm(state.q))) return false
    return true
  })
}

export function newsSplit(state) {
  const all = NOTICIAS.filter((item) => state.noticiaCat === 'Todas' || item.cat === state.noticiaCat)
  const feature = all[0] || null
  const rest = all.slice(1)
  const pages = Math.max(1, Math.ceil(rest.length / 6) || 1)
  const pagina = Math.min(state.pagina, pages)
  const start = (pagina - 1) * 6
  return { feature, cards: rest.slice(start, start + 6), pages, pagina, total: all.length }
}
