export function adjustPrice(value, lojaId) {
  if (!lojaId) return value
  const factor = 1 + ((Number(lojaId) % 5) - 2) * 0.02
  return Math.round(value * factor * 100) / 100
}

export function nearestByCoords(lojas, lat, lng) {
  const here = { lat, lng }
  return [...lojas].sort((a, b) => distance(here, a) - distance(here, b))[0]
}

function distance(a, b) {
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLng = (b.lng - a.lng) * rad
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)))
}
