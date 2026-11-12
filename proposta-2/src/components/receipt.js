import { offerById } from '../data/ofertas.js'
import { adjustPrice } from '../domain/pricing.js'
import { whatsappLink } from '../domain/hours.js'
import { esc, money } from '../lib/format.js'
import { listTotal, nearestStore, state } from '../state/store.js'

export function listMessage() {
  const lines = state.lista.map((item) => {
    const product = offerById(item.id)
    if (!product) return ''
    const price = money(adjustPrice(product.preco, state.loja) * item.qtd)
    return `- ${product.nome} x${item.qtd} — ${price}`
  }).filter(Boolean)
  const where = nearestStore()
  return `Lista Serve Mais (exemplo)\n${lines.join('\n')}\nTotal ilustrativo: ${money(listTotal())}\nUnidade: ${where.nome}`
}

export function receiptBody() {
  if (!state.lista.length) {
    return `<p class="cupom-brand">Rede Serve Mais</p>
      <p class="cupom-sub">Lista de compras (exemplo)</p>
      <p class="cupom-empty">Sua lista está vazia. Toque no + das ofertas para montar a feira.</p>
      <a class="btn btn-red" href="#ofertas">Ver ofertas</a>`
  }
  const lines = state.lista.map((item) => {
    const product = offerById(item.id)
    if (!product) return ''
    const price = money(adjustPrice(product.preco, state.loja) * item.qtd)
    return `<li class="cupom-line">
      <button type="button" data-act="tirar" data-id="${product.id}" aria-label="Tirar ${esc(product.nome)}">×</button>
      <span>${esc(product.nome)} <small>x${item.qtd}</small></span>
      <strong>${price}</strong>
    </li>`
  }).join('')
  return `<p class="cupom-brand">Rede Serve Mais</p>
    <p class="cupom-sub">Lista de compras (exemplo)</p>
    <ul>${lines}</ul>
    <p class="cupom-total"><span>Total</span><strong>${money(listTotal())}</strong></p>
    <div class="cupom-actions">
      <a class="btn btn-red" href="${whatsappLink(listMessage())}" target="_blank" rel="noopener">Enviar no WhatsApp</a>
      <button class="btn btn-line" type="button" data-act="imprimir">Imprimir lista</button>
    </div>
    <p class="cupom-hint">A lista fica salva neste aparelho.</p>`
}

export function paintCommerce() {
  const count = state.lista.reduce((sum, item) => sum + item.qtd, 0)
  document.querySelectorAll('[data-list-count]').forEach((node) => {
    node.textContent = String(count)
    node.hidden = count === 0
  })
  document.querySelectorAll('[data-qty]').forEach((box) => {
    const qty = state.lista.find((item) => item.id === Number(box.dataset.qty))?.qtd || 0
    const count = box.querySelector('[data-count]')
    const minus = box.querySelector('[data-d="-1"]')
    if (count) count.textContent = String(qty)
    if (minus) minus.disabled = qty < 1
  })
  document.querySelectorAll('[data-receipt]').forEach((node) => {
    node.innerHTML = receiptBody()
  })
}
