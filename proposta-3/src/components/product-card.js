import { FOTO } from '../data/site.js'
import { esc, money } from '../lib/format.js'

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
      <strong>${money(product.preco)}</strong>
      <small>Válido: período a definir</small>
    </div>
  </article>`
}
