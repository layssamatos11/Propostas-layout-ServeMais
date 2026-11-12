import { faixa } from '../components/chrome.js'
import { CAPITULOS, LINHAS } from '../data/felita.js'
import { esc } from '../lib/format.js'

export function felitaPage() {
  const chapters = CAPITULOS.map((item) => {
    const ink = item.cor === '#F5C400' ? '#1A1A1A' : '#fff'
    return `<article class="capitulo">
      <b style="color:${item.cor}">${item.num}</b>
      <div>
        <h2>${esc(item.titulo)}</h2>
        <p>${esc(item.texto)}</p>
      </div>
      <div class="capitulo-foto" style="background:${item.cor};color:${ink}">Foto / ilustração do capítulo (a fornecer)</div>
    </article>`
  }).join('')
  const lines = LINHAS.map((item) => {
    return `<article class="linha" style="background:${item.cor};color:${item.tinta}"><strong>Linha ${item.id}</strong><span>a definir</span></article>`
  }).join('')
  return `<section class="felita-hero">
    <div class="felita-hero-copy">
      <p class="script">Felitá</p>
      <p>Em todos os momentos.</p>
    </div>
    <div class="felita-hero-foto">Imagem e marca do site atual (a fornecer)</div>
  </section>
  ${faixa()}
  <section class="wrap felita-intro">
    <p class="migalha"><a href="#inicio">Início</a> › Marca exclusiva</p>
    <p class="olho">Escolha todos os dias</p>
    <h1>FELICIDADE</h1>
    <p class="nota">Imagem e marca recortadas do site atual, para referência. A história abaixo é contada em capítulos.</p>
  </section>
  <section class="wrap capitulos">${chapters}</section>
  <section class="linhas-bloco">
    <div class="wrap">
      <h2>Linhas Felitá</h2>
      <p>Sugestão: cada linha com cor própria, tirada da faixa colorida da marca. Nomes e produtos a fornecer.</p>
      <div class="linhas">${lines}</div>
      <div class="btn-row">
        <a class="btn btn-yellow" href="#ofertas">Ver ofertas Felitá</a>
        <a class="btn btn-line" href="#lojas">Encontrar a loja mais próxima</a>
      </div>
    </div>
  </section>`
}

export function mountFelita() {}
