import { SITE } from '../data/site.js'

export function hourLabel(hour) {
  return `${String(hour % 24).padStart(2, '0')}h`
}

export function todayHours(loja, now = new Date()) {
  const weekend = now.getDay() === 0
  return weekend
    ? { abre: loja.domAbre, fecha: loja.domFecha }
    : { abre: loja.abre, fecha: loja.fecha }
}

export function isOpen(loja, now = new Date()) {
  const { abre, fecha } = todayHours(loja, now)
  const clock = now.getHours() + now.getMinutes() / 60
  if (fecha >= 24) return clock >= abre
  return clock >= abre && clock < fecha
}

export function storeStatus(loja, now = new Date()) {
  const hours = todayHours(loja, now)
  if (isOpen(loja, now)) return { on: true, txt: `Aberto agora · fecha às ${hourLabel(hours.fecha)}` }
  return { on: false, txt: `Fechado · abre às ${hourLabel(hours.abre)}` }
}

export function formatPhone(digits) {
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
}

export function mapsLink(loja) {
  const query = `${loja.end}, ${loja.bairro}, ${loja.cidade}, Mato Grosso`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function openDirections(loja) {
  const destination = encodeURIComponent(`${loja.end}, ${loja.bairro}, ${loja.cidade}, Mato Grosso`)
  const tab = window.open('', '_blank')
  const go = (origin) => {
    const from = origin ? `origin=${encodeURIComponent(origin)}&` : ''
    const url = `https://www.google.com/maps/dir/?api=1&${from}destination=${destination}&travelmode=driving`
    if (tab) {
      tab.opener = null
      tab.location.replace(url)
    } else window.location.href = url
  }
  if (!navigator.geolocation) {
    go('')
    return Promise.resolve('missing')
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        go(`${pos.coords.latitude},${pos.coords.longitude}`)
        resolve('ok')
      },
      () => {
        go('')
        resolve('denied')
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    )
  })
}

export function dialOrCopy(digits, label) {
  const raw = String(digits).replace(/\D/g, '')
  const shown = label || formatPhone(raw)
  // Celular: abre o discador. PC e tablet: copia o número.
  const phone = window.matchMedia('(max-width: 640px) and (pointer: coarse) and (hover: none)').matches
  if (phone) {
    window.location.href = `tel:+55${raw}`
    return Promise.resolve('call')
  }
  if (!navigator.clipboard?.writeText) return Promise.resolve('fail')
  return navigator.clipboard.writeText(shown).then(() => 'copy', () => 'fail')
}

export function whatsappLink(text) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}
