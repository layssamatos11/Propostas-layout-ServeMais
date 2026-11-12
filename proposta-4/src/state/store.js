function readUnidade() {
  try {
    const n = Number(localStorage.getItem('sm4-unidade'))
    return n >= 1 && n <= 17 ? n : 0
  } catch {
    return 0
  }
}

export const state = {
  filtro: 'Todas',
  cidade: 'Todas',
  aberto: false,
  busca: '',
  lojaId: 1,
  unidade: readUnidade(),
  ordem: 'desconto',
  visiveis: 8,
  artigo: '',
  noticiaCat: 'Todas',
  pagina: 1,
  homeCat: 'Todas',
  momento: 'manha',
  linha: 'chef',
  quizStep: 0,
  quizAns: [],
  zoom: 1,
  qty: {},
}

export function qtyOf(id) {
  return state.qty[id] || 0
}

export function setQty(id, qtd) {
  const next = Math.max(0, Math.min(99, Number(qtd) || 0))
  if (next === 0) delete state.qty[id]
  else state.qty[id] = next
}

export function setUnidade(id) {
  const n = Number(id) || 0
  state.unidade = n >= 1 && n <= 17 ? n : 0
  try {
    localStorage.setItem('sm4-unidade', String(state.unidade))
  } catch {
    /* a preferência fica só nesta visita */
  }
}
