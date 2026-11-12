import { precoLocal } from '../domain/price.js'
import { discount, esc, money } from '../lib/format.js'
import { qtyOf, state } from '../state/store.js'

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

const SELO = { oferta: 'Oferta', leve: 'Leve 3', novo: 'Novo' }

export function productCard(item) {
  const preco = precoLocal(item.preco, state.unidade)
  const de = precoLocal(item.de, state.unidade)
  const off = discount(item)
  const badge = item.selo === 'off' ? `-${off}%` : SELO[item.selo] || 'Oferta'
  const kind = item.selo === 'off' ? 'off' : item.selo || 'oferta'
  return `<article class="produto">
    <span class="selo selo-${kind}">${esc(badge)}</span>
    <div class="foto-prod" style="background:${esc(item.cor)}"><span>Foto do produto (exemplo)</span></div>
    <h3>${esc(item.nome)}</h3>
    <p class="emb">${esc(item.embalagem)}</p>
    <div class="preco-linha">
      <div>
        <p class="preco-de">${money(de)}</p>
        <p class="preco">${money(preco)}</p>
      </div>
      ${qtyBox(item.id, item.nome, qtyOf(item.id))}
    </div>
  </article>`
}
