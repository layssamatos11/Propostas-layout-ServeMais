import { faixa } from '../components/chrome.js'

const DESTINOS = [
  ['ofertas', 'Ofertas', 'As promoções da semana, com validade.', 'borda-red'],
  ['felita', 'Marca exclusiva Felitá', 'A história da marca que só tem aqui.', 'borda-blue'],
  ['noticias', 'Notícias', 'Novidades e campanhas da rede.', 'borda-yellow'],
  ['lojas', 'Nossas lojas', '17 unidades com endereço e rota.', 'borda-green'],
  ['trabalhe', 'Trabalhe conosco', 'Venha fazer parte da família.', 'borda-gold'],
  ['contato', 'Contato', 'Fale com a gente.', 'borda-cyan'],
]

export function inicioPage() {
  const cards = DESTINOS.map(([id, title, text, edge]) => {
    return `<a class="destino ${edge}" href="#${id}"><strong>${title}</strong><span>${text}</span></a>`
  }).join('')
  return `<section class="hero-home">
    <div class="hero-copy">
      <p class="pill">Rede familiar · Cuiabá e Várzea Grande</p>
      <h1>Tudo que a sua casa precisa, perto de você.</h1>
      <p>Ofertas toda semana, a marca Felitá e 17 lojas para fazer a sua feira do jeito que você gosta.</p>
      <div class="btn-row">
        <a class="btn btn-yellow" href="#ofertas">Ver ofertas</a>
        <a class="btn btn-line-light" href="#lojas">Achar minha loja</a>
      </div>
    </div>
    <div class="hero-foto">Foto principal da campanha (a fornecer)</div>
  </section>
  ${faixa()}
  <section class="wrap destinos">
    <h2>Para onde você quer ir?</h2>
    <div class="destino-grid">${cards}</div>
  </section>`
}

export function mountInicio() {}
