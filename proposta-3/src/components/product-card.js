import { FOTO } from '../data/site.js'
import { esc, money } from '../lib/format.js'
import { qtyOf } from '../state/store.js'

function qtyBox(id, name, qty) {
  const n = Number(qty) || 0
  return `<div class="qty" data-qty="${id}">
    <button type="button" data-act="qtd" data-id="${id}" data-d="-1" aria-label="Diminuir ${esc(name)}"${n ? '' : ' disabled'}>−</button>
    <span data-count>${n}</span>
    <button type="button" data-act="qtd" data-id="${id}" data-d="1" aria-label="Aumentar ${esc(name)}">+</button>
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

export function productCard(product) {
  const foto = FOTO[(product.id - 1) % FOTO.length]
  const ink = foto === '#F3E6C4' || foto === '#F4E7C8' ? '#5C4630' : '#fff'
  return `<article class="produto">
    <div class="produto-foto" style="background:${foto};color:${ink}">
      <span>Foto do produto (a fornecer)</span>
    </div>
    <div class="produto-corpo">
      <span class="selo">Demonstrativo</span>
      <h3>${esc(product.nome)}</h3>
      <p>${esc(product.cat)} · ${esc(product.det)}</p>
      <div class="produto-preco">
        <strong>${money(product.preco)}</strong>
        ${qtyBox(product.id, product.nome, qtyOf(product.id))}
      </div>
      <small>Válido: período a definir</small>
    </div>
  </article>`
}
