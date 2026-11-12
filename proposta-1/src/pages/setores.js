import { SETORES } from '../data/setores.js'
import { esc, slug } from '../lib/format.js'
import { icon } from '../lib/icons.js'

export function setoresPage() {
  const cards = SETORES.map((setor) => {
    return `<article class="pcard sector-card">
      <i class="sector-badge" style="background:${setor.cor}">${icon(setor.icon, setor.tinta)}</i>
      <h3 class="mt-8">${esc(setor.nome)}</h3>
      <p class="unit">${esc(setor.desc)}</p>
      <a class="btn btn-y sector-cta" href="#ofertas/${slug(setor.nome)}" role="button">Ver ofertas</a>
    </article>`
  }).join('')

  return `<section class="wrap page-hero">
    <span class="blob" aria-hidden="true"></span>
    <h1>Setores</h1>
    <p class="sub mt-8">Tudo o que a família precisa em um só lugar.</p>
    <div class="grid grid-sectors">${cards}</div>
  </section>`
}

export function mountSetores() {}
