import { TICKER } from '../data/site.js'
import { esc } from '../lib/format.js'

export function ticker(phrase = TICKER) {
  const text = esc(phrase.repeat(2))
  return `<div class="ticker" aria-hidden="true"><div class="ticker-track"><span>${text}</span><span>${text}</span></div></div>`
}
