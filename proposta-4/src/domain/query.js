import { LOJAS } from '../data/lojas.js'
import { NOTICIAS } from '../data/noticias.js'
import { OFERTAS } from '../data/ofertas.js'
import { norm } from '../lib/format.js'
import { state } from '../state/store.js'
import { isOpen } from './hours.js'

function matchOffer(item, filtro) {
  if (filtro === 'Todas') return true
  if (filtro === 'ofertao' || filtro === 'fecha' || filtro === 'sazonal') return item.campanha === filtro
  return item.cat === filtro
}

export function filteredOffers() {
  return OFERTAS.filter((item) => matchOffer(item, state.filtro))
}

export function sortedOffers() {
  const list = [...filteredOffers()]
  if (state.ordem === 'nome') return list.sort((a, b) => a.nome.localeCompare(b.nome, 'pt'))
  const desc = (item) => (item.de > item.preco ? 1 - item.preco / item.de : 0)
  return list.sort((a, b) => desc(b) - desc(a))
}

export function homeOffers() {
  return OFERTAS.filter((item) => state.homeCat === 'Todas' || item.cat === state.homeCat).slice(0, 4)
}

export function filteredStores() {
  const q = norm(state.busca.trim())
  return LOJAS.filter((loja) => {
    if (state.cidade !== 'Todas' && loja.cidade !== state.cidade) return false
    if (state.aberto && !isOpen(loja)) return false
    if (!q) return true
    return norm(`${loja.nome} ${loja.bairro} ${loja.cidade} ${loja.end}`).includes(q)
  })
}

export function newsSplit() {
  const all = NOTICIAS.filter((item) => state.noticiaCat === 'Todas' || item.cat === state.noticiaCat)
  const rest = all.slice(1)
  const pages = Math.max(1, Math.ceil(rest.length / 3) || 1)
  const pagina = Math.min(Math.max(state.pagina, 1), pages)
  return { feature: all[0] || null, slice: rest.slice((pagina - 1) * 3, pagina * 3), pages, pagina }
}
