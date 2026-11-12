import { setorByName } from '../data/setores.js'
import { badgeClass, badgeOf } from '../domain/badges.js'
import { adjustPrice } from '../domain/pricing.js'
import { esc, money } from '../lib/format.js'
import { icon } from '../lib/icons.js'
import { state } from '../state/store.js'

export function productCard(product) {
  const setor = setorByName(product.cat)
  const badge = badgeOf(product)
  const from = money(adjustPrice(product.de, state.loja))
  const now = money(adjustPrice(product.preco, state.loja))

  return `<article class="pcard">
    <div class="ph" style="background-color:${setor.cor}">
      <span class="badge ${badgeClass(badge)}">${esc(badge)}</span>
      ${icon(setor.icon, setor.tinta)}
      <span class="cap">Foto do produto (exemplo)</span>
    </div>
    <h3>${esc(product.nome)}</h3>
    <p class="unit">${esc(product.det)}</p>
    <div class="price-row">
      <div>
        <span class="old">${from}</span>
        <div class="now">${now}</div>
      </div>
      <button class="add" type="button" data-act="add" data-add="${product.id}" data-name="${esc(product.nome)}">+</button>
    </div>
    <p class="valid">Válido: período a definir</p>
  </article>`
}
