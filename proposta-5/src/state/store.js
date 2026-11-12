import { OFERTAS, offerById } from '../data/ofertas.js'
import { LOJAS, lojaById } from '../data/lojas.js'
import { adjustPrice } from '../domain/price.js'

const LIST_KEY = 'sm5-lista'
const STORE_KEY = 'sm5-unidade'

function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value == null ? fallback : value
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* demonstração segue sem gravar */
  }
}

function cleanList(value) {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => ({ id: Number(item.id), qtd: Number(item.qtd) }))
    .filter((item) => offerById(item.id) && item.qtd > 0 && item.qtd < 100)
}

const storedUnit = Number(load(STORE_KEY, 1))

export const state = {
  ofertas: OFERTAS,
  busca: '',
  corredor: '',
  campanha: '',
  marca: '',
  faixa: 'todas',
  limite: 6,
  offerKey: '',
  cidade: 'Todas',
  aberto: false,
  servico: '',
  q: '',
  pin: null,
  unidade: LOJAS.some((loja) => loja.id === storedUnit) ? storedUnit : 1,
  lista: cleanList(load(LIST_KEY, [])),
  assunto: 'Dúvida',
  noticiaCat: 'Todas',
  pagina: 1,
  artigo: '',
  room: 'chef',
  momento: 'manha',
  zoom: 1,
  jobStep: 1,
  job: {},
  jobOk: false,
}

export function nearestStore() {
  return lojaById(state.unidade) || LOJAS[0]
}

export function setPreferredStore(id) {
  const next = Number(id)
  state.unidade = LOJAS.some((loja) => loja.id === next) ? next : 1
  save(STORE_KEY, state.unidade)
}

export function qtyOf(id) {
  return state.lista.find((item) => item.id === Number(id))?.qtd || 0
}

export function setQty(id, qtd) {
  const productId = Number(id)
  if (!offerById(productId)) return
  const index = state.lista.findIndex((item) => item.id === productId)
  if (qtd <= 0) {
    if (index >= 0) state.lista.splice(index, 1)
  } else if (index >= 0) state.lista[index].qtd = Math.min(99, qtd)
  else state.lista.push({ id: productId, qtd: Math.min(99, qtd) })
  save(LIST_KEY, state.lista)
}

export function removeItem(id) {
  setQty(id, 0)
}

export function listCount() {
  return state.lista.reduce((sum, item) => sum + item.qtd, 0)
}

export function listTotal() {
  return state.lista.reduce((sum, item) => {
    const product = offerById(item.id)
    if (!product) return sum
    return sum + adjustPrice(product.preco, state.unidade) * item.qtd
  }, 0)
}
