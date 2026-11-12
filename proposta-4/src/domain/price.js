export function precoLocal(valor, unidade) {
  const id = Number(unidade) || 0
  if (!id) return valor
  const factor = 1 + ((id % 4) - 1) * 0.02
  return Math.round(valor * factor * 100) / 100
}
