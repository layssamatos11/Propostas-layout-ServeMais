import { badgeClass, badgeOf } from '../domain/badges.js'
import { adjustPrice } from '../domain/pricing.js'
import { setorByName } from '../data/setores.js'
import { esc, money } from '../lib/format.js'
import { icon } from '../lib/icons.js'
import { qtyOf, state } from '../state/store.js'

function qtyBox(id, name, qty) {
  const n = Number(qty) || 0
  return `<div class="qty" data-qty="${id}">
    <button type="button" data-act="qtd" data-id="${id}" data-d="-1" data-name="${esc(name)}" aria-label="Diminuir ${esc(name)}"${n ? '' : ' disabled'}>−</button>
    <span data-count>${n}</span>
    <button type="button" data-act="qtd" data-id="${id}" data-d="1" data-name="${esc(name)}" aria-label="Aumentar ${esc(name)}">+</button>
  </div>`
}

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
      ${qtyBox(product.id, product.nome, qtyOf(product.id))}
    </div>
  </article>`
}
