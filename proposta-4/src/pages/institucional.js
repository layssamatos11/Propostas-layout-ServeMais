import { LOJAS } from '../data/lojas.js'

const MARCOS = [
  ['Ano — fundação', 'Descrição do marco a confirmar com a empresa.'],
  ['Ano — expansão', 'Descrição do marco a confirmar com a empresa.'],
  ['Ano — nova fase', 'Descrição do marco a confirmar com a empresa.'],
  ['Hoje — 17 lojas', 'Cuiabá e Várzea Grande. A data de cada abertura ainda será confirmada.'],
]

const VALORES = [
  ['Proximidade', 'Atendimento que conhece o cliente. Texto exemplo.'],
  ['Preço justo', 'Economia em toda a semana. Texto exemplo.'],
  ['Qualidade', 'Produtos frescos e selecionados. Texto exemplo.'],
  ['Região', 'Valorização de Mato Grosso. Texto exemplo.'],
]

export function renderInstitucional() {
  const cidades = new Set(LOJAS.map((loja) => loja.cidade)).size
  return `<section class="hero">
      <div>
        <p class="olho">Institucional</p>
        <h1>Uma rede feita de família.</h1>
        <p class="lead">Texto institucional demonstrativo: a história, a trajetória e a proximidade da Rede Serve Mais com os consumidores mato-grossenses serão redigidos com o cliente.</p>
      </div>
      <div class="foto"><p>Fotografia — equipe e fachada de uma loja da rede (a produzir)</p></div>
    </section>
    <section>
      <h2>Nossa trajetória</h2>
      <p>Linha do tempo. Marcos a confirmar com a empresa.</p>
      <ol class="timeline">
        ${MARCOS.map(([titulo, texto]) => `<li><strong>${titulo}</strong><p>${texto}</p></li>`).join('')}
      </ol>
    </section>
    <section>
      <h2>Nossos valores</h2>
      <div class="valores">
        ${VALORES.map(([titulo, texto]) => `<article><h3>${titulo}</h3><p>${texto}</p></article>`).join('')}
      </div>
    </section>
    <section class="stats">
      <p><strong>${LOJAS.length}</strong><span>unidades</span></p>
      <p><strong>${cidades}</strong><span>cidades atendidas</span></p>
      <p><strong>—</strong><span>colaboradores (a confirmar)</span></p>
      <p><strong>—</strong><span>anos de história (a confirmar)</span></p>
    </section>`
}

export function mountInstitucional() {}
