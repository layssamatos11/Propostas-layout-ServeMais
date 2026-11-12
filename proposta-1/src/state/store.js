import { LOJAS } from '../data/lojas.js'
import { offerById } from '../data/ofertas.js'
import { adjustPrice } from '../domain/pricing.js'

const LIST_KEY = 'sm-lista'
const STORE_KEY = 'sm-unidade'

function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value == null ? fallback : value
  } catch {
    return fallback
  }
}

export const state = {
  filtro: 'Todas',
  homeCat: 'Todas',
  ordem: 'desconto',
  limite: 8,
  oq: '',
  cidade: 'Todas',
  aberto: false,
  q: '',
  pin: null,
  zoom: 1,
  loja: load(STORE_KEY, null),
  lista: load(LIST_KEY, []),
  assunto: '',
}

if (state.loja && !LOJAS.some((loja) => loja.id === state.loja)) state.loja = null
if (!Array.isArray(state.lista)) state.lista = []

export function qtyOf(id) {
  const item = state.lista.find((entry) => entry.id === Number(id))
  return item ? item.qtd : 0
}

export function setQty(id, qtd) {
  const productId = Number(id)
  const index = state.lista.findIndex((entry) => entry.id === productId)
  if (qtd <= 0) {
    if (index >= 0) state.lista.splice(index, 1)
  } else if (index >= 0) {
    state.lista[index].qtd = qtd
  } else {
    state.lista.push({ id: productId, qtd })
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(state.lista))
}

export function clearList() {
  state.lista = []
  localStorage.setItem(LIST_KEY, JSON.stringify(state.lista))
}

export function setPreferredStore(id) {
  state.loja = id ? Number(id) : null
  localStorage.setItem(STORE_KEY, JSON.stringify(state.loja))
}

export function listCount() {
  return state.lista.reduce((sum, item) => sum + item.qtd, 0)
}

export function listTotal() {
  return state.lista.reduce((sum, item) => {
    const product = offerById(item.id)
    if (!product) return sum
    return sum + adjustPrice(product.preco, state.loja) * item.qtd
  }, 0)
}
