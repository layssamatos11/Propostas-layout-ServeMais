import { badgeClass, badgeOf } from '../domain/badges.js'
import { adjustPrice } from '../domain/pricing.js'
import { setorByName } from '../data/setores.js'
import { esc, money } from '../lib/format.js'
import { icon } from '../lib/icons.js'
import { state } from '../state/store.js'

export function productCard(product) {
  const setor = setorByName(product.cat)
  const badge = badgeOf(product)
  const price = money(adjustPrice(product.preco, state.loja))
  const from = money(adjustPrice(product.de, state.loja))
  return `<article class="gondola">
    <div class="foto" style="--foto:${setor.cor};--tinta:${setor.tinta}">
      <span class="selo selo-${badgeClass(badge)}">${esc(badge)}</span>
      ${icon(setor.icon)}
      <span class="foto-cap">Foto do produto (exemplo)</span>
    </div>
    <div class="etiqueta">
      <span>${from}</span>
      <strong>${price}</strong>
    </div>
    <div class="gondola-foot">
      <div>
        <h3>${esc(product.nome)}</h3>
        <p>${esc(product.det)}</p>
      </div>
      <button class="plus" type="button" data-act="add" data-add="${product.id}" data-name="${esc(product.nome)}">+</button>
    </div>
  </article>`
}
