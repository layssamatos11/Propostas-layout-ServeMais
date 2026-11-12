import { discountRatio } from './pricing.js'

export function badgeOf(product) {
  if (product.tag === 'PCT') return `-${Math.round(discountRatio(product) * 100)}%`
  return product.tag
}

export function badgeClass(label) {
  if (label === 'LEVE 3') return 'green'
  if (label === 'NOVO') return 'yellow'
  return 'red'
}
