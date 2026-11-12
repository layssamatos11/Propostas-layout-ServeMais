import { adjustPrice } from '../domain/price.js'
import { discount, esc, money } from '../lib/format.js'
import { qtyOf, state } from '../state/store.js'

const SELOS = { oferta: 'Oferta', leve: 'Leve 3', novo: 'Novo' }

export function seloLabel(item) {
  if (item.selo === 'off') return `-${discount(item)}%`
  return SELOS[item.selo] || 'Oferta'
}

function qtyBox(id, name, qty) {
  const n = Number(qty) || 0
  return `<div class="qty" data-qty="${id}">
    <button type="button" data-act="qtd" data-id="${id}" data-d="-1" data-name="${esc(name)}" aria-label="Diminuir ${esc(name)}"${n ? '' : ' disabled'}>−</button>
    <span data-count>${n}</span>
    <button type="button" data-act="qtd" data-id="${id}" data-d="1" data-name="${esc(name)}" aria-label="Aumentar ${esc(name)}">+</button>
  </div>`
}

export function paintQty() {
  document.querySelectorAll('[data-qty]').forEach((box) => {
    const qty = qtyOf(box.dataset.qty)
    const count = box.querySelector('[data-count]')
    const minus = box.querySelector('[data-d="-1"]')
    if (count) count.textContent = String(qty)
    if (minus) minus.disabled = qty < 1
  })
}

export function productCard(item) {
  const preco = adjustPrice(item.preco, state.unidade)
  const de = adjustPrice(item.de, state.unidade)
  return `<article class="produto">
    <div class="foto" style="background:${item.cor}"><span>Foto do produto (exemplo)</span><b class="selo selo-${esc(item.selo)}">${esc(seloLabel(item))}</b></div>
    <p class="preco-de">${money(de)}</p>
    <p class="preco">${money(preco)}</p>
    <h3>${esc(item.nome)}</h3>
    <p class="emb">${esc(item.det)}</p>
    ${qtyBox(item.id, item.nome, qtyOf(item.id))}
  </article>`
}
