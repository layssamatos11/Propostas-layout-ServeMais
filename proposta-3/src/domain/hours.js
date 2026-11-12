export function hourLabel(hour) {
  return `${String(hour % 24).padStart(2, '0')}h`
}

export function formatPhone(tel) {
  const digits = String(tel)
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
}

export function mapsLink(loja) {
  const query = encodeURIComponent(`${loja.end}, ${loja.bairro}, ${loja.cidade}, Mato Grosso`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function horario(loja) {
  return `Seg a sáb ${hourLabel(loja.abre)} às ${hourLabel(loja.fecha)} · dom ${hourLabel(loja.domAbre)} às ${hourLabel(loja.domFecha)} (exemplo)`
}
