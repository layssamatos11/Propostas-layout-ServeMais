import { adjustPrice } from '../domain/price.js'
import { discount, esc, money } from '../lib/format.js'
import { state } from '../state/store.js'

const SELOS = { oferta: 'Oferta', leve: 'Leve 3', novo: 'Novo' }

export function seloLabel(item) {
  if (item.selo === 'off') return `-${discount(item)}%`
  return SELOS[item.selo] || 'Oferta'
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
    <button class="mais" type="button" data-act="add" data-add="${item.id}" data-name="${esc(item.nome)}" aria-label="Adicionar ${esc(item.nome)} à lista">+</button>
  </article>`
}
