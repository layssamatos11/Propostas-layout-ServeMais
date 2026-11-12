export function hourLabel(hour) {
  return `${String(hour % 24).padStart(2, '0')}h`
}

export function isOpen(loja, now = new Date()) {
  const clock = now.getHours() + now.getMinutes() / 60
  if (loja.fecha >= 24) return clock >= loja.abre
  return clock >= loja.abre && clock < loja.fecha
}

export function storeStatus(loja) {
  if (isOpen(loja)) {
    return { on: true, txt: `Aberto · fecha às ${hourLabel(loja.fecha)}` }
  }
  return { on: false, txt: `Fechado · abre às ${hourLabel(loja.abre)}` }
}

export function formatPhone(digits) {
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
}

export function mapsLink(loja) {
  const query = `${loja.end}, ${loja.bairro}, ${loja.cidade}, Mato Grosso`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
