import { discount, esc, money } from '../lib/format.js'
import { state } from '../state/store.js'
import { precoLocal } from '../domain/price.js'

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
      <button class="mais" type="button" data-act="anotar" data-nome="${esc(item.nome)}" aria-label="Anotar ${esc(item.nome)}">+</button>
    </div>
  </article>`
}
