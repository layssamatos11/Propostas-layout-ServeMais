export const state = {
  cat: 'Todas',
  cidade: 'Todas',
  artigo: '',
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
