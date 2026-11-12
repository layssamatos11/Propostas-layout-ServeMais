export function ticker(text) {
  const line = `${text}${text}`
  return `<div class="ticker" aria-hidden="true"><div class="ticker-track"><span>${line}</span><span>${line}</span></div></div>`
}
