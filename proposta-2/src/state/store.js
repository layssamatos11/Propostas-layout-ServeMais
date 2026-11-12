import { LOJAS, lojaById } from '../data/lojas.js'
import { offerById } from '../data/ofertas.js'
import { adjustPrice } from '../domain/pricing.js'

const LIST_KEY = 'sm2-lista'
const STORE_KEY = 'sm2-unidade'

function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value == null ? fallback : value
  } catch {
    return fallback
  }
}

export const state = {
  oq: '',
  corredor: '',
  campanha: '',
  marca: '',
  faixa: 'todas',
  limite: 6,
  offerArg: null,
  cidade: 'Todas',
  aberto: false,
  servico: '',
  q: '',
  pin: null,
  loja: load(STORE_KEY, null),
  lista: load(LIST_KEY, []),
  assunto: 'Dúvida',
  newsCat: 'Todas',
  newsPage: 1,
  artigo: '',
  room: 'chef',
  momento: 'manha',
  jobStep: 1,
  job: {},
}

if (state.loja && !LOJAS.some((loja) => loja.id === state.loja)) state.loja = null
if (!Array.isArray(state.lista)) state.lista = []

export function nearestStore() {
  return lojaById(state.loja) || LOJAS[0]
}

export function spotlightStores() {
  const focus = nearestStore()
  return [...LOJAS].sort((a, b) => {
    if (a.id === focus.id) return -1
    if (b.id === focus.id) return 1
    const da = (a.lat - focus.lat) ** 2 + (a.lng - focus.lng) ** 2
    const db = (b.lat - focus.lat) ** 2 + (b.lng - focus.lng) ** 2
    return da - db
  }).slice(0, 3)
}

export function storeFromCoords(lat, lng) {
  return [...LOJAS].sort((a, b) => {
    const da = (a.lat - lat) ** 2 + (a.lng - lng) ** 2
    const db = (b.lat - lat) ** 2 + (b.lng - lng) ** 2
    return da - db
  })[0]
}

export function qtyOf(id) {
  const item = state.lista.find((entry) => entry.id === Number(id))
  return item ? item.qtd : 0
}

export function setQty(id, qtd) {
  const productId = Number(id)
  const index = state.lista.findIndex((entry) => entry.id === productId)
  if (qtd <= 0) {
    if (index >= 0) state.lista.splice(index, 1)
  } else if (index >= 0) state.lista[index].qtd = qtd
  else state.lista.push({ id: productId, qtd })
  localStorage.setItem(LIST_KEY, JSON.stringify(state.lista))
}

export function removeItem(id) {
  setQty(id, 0)
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
