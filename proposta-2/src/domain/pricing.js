export function adjustPrice(value, lojaId) {
  if (!lojaId) return value
  const factor = 1 + ((Number(lojaId) % 5) - 2) * 0.02
  return Math.round(value * factor * 100) / 100
}

export function discountRatio(product) {
  return (product.de - product.preco) / product.de
}

export function maxDiscountPercent(list) {
  return Math.round(Math.max(...list.map(discountRatio)) * 100)
}
