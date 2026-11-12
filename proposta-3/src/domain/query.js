import { OFERTAS } from '../data/ofertas.js'
import { LOJAS } from '../data/lojas.js'
import { state } from '../state/store.js'

export function filteredOffers() {
  if (state.cat === 'Todas') return OFERTAS
  return OFERTAS.filter((item) => item.cat === state.cat)
}

export function filteredStores() {
  if (state.cidade === 'Todas') return LOJAS
  return LOJAS.filter((loja) => loja.cidade === state.cidade)
}
