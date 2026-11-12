import { esc } from '../lib/format.js'

export function filterChips(list, attr, current) {
  return list.map((label) => {
    const pressed = label === current
    return `<button class="chip" type="button" data-act="${attr}" data-${attr}="${esc(label)}" aria-pressed="${pressed}">${esc(label)}</button>`
  }).join('')
}
