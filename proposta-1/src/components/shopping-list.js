import { lojaById } from '../data/lojas.js'
import { offerById } from '../data/ofertas.js'
import { adjustPrice } from '../domain/pricing.js'
import { esc, money } from '../lib/format.js'
import { listCount, listTotal, qtyOf, setQty, state } from '../state/store.js'

export function paintQty() {
  document.querySelectorAll('[data-add]').forEach((button) => {
    const qty = qtyOf(button.dataset.add)
    button.classList.toggle('in', qty > 0)
    button.textContent = qty > 0 ? String(qty) : '+'
    const name = button.dataset.name
    button.setAttribute(
      'aria-label',
      qty > 0 ? `${name}: ${qty} na lista. Adicionar mais um` : `Adicionar ${name} à lista`,
    )
  })
  const count = String(listCount())
  document.getElementById('fabCount').textContent = count
  const desk = document.getElementById('fabCountDesk')
  if (desk) desk.textContent = count
}

export function renderLista() {
  const body = document.getElementById('listaBody')
  const foot = document.getElementById('listaFoot')
  if (!state.lista.length) {
    body.innerHTML = `<p class="empty">Sua lista está vazia. Toque no + das ofertas para montar a feira.</p>
      <p class="mt-12"><a class="btn btn-r" href="#ofertas" data-act="close-lista">Ver ofertas</a></p>`
    foot.innerHTML = ''
    return
  }

  body.innerHTML = state.lista.map((item) => {
    const product = offerById(item.id)
    if (!product) return ''
    const price = money(adjustPrice(product.preco, state.loja))
    return `<div class="line">
      <div class="nm"><b>${esc(product.nome)}</b><div class="unit">${price}</div></div>
      <div class="step">
        <button type="button" data-act="qtd" data-id="${product.id}" data-d="-1" aria-label="Diminuir ${esc(product.nome)}">−</button>
        <span>${item.qtd}</span>
        <button type="button" data-act="qtd" data-id="${product.id}" data-d="1" aria-label="Aumentar ${esc(product.nome)}">+</button>
      </div>
    </div>`
  }).join('')

  const where = state.loja
    ? `Na ${esc(lojaById(state.loja).nome)}`
    : 'Preço base, sem unidade escolhida'

  foot.innerHTML = `<p class="unit">Total ilustrativo</p>
    <p class="now">${money(listTotal())}</p>
    <p class="unit price-note">${where}</p>
    <button class="btn btn-line" type="button" data-act="limpar">Limpar lista</button>`
}

function bumpFab() {
  const fab = document.getElementById('fab')
  fab.classList.remove('pop')
  void fab.offsetWidth
  fab.classList.add('pop')
}

export function changeQty(id, qtd, { bump = false } = {}) {
  setQty(id, qtd)
  paintQty()
  if (!document.getElementById('lista').hidden) renderLista()
  if (bump) bumpFab()
}
