const TEXTOS = {
  privacidade: {
    titulo: 'Política de privacidade',
    corpo: [
      'Este texto é um espaço reservado. A política oficial será redigida com a Rede Serve Mais antes da publicação.',
      'Nesta proposta, os formulários de contato, currículo e promoções conferem os campos e não enviam os dados para nenhum servidor.',
      'A unidade escolhida na página de ofertas pode ficar gravada só neste navegador, para o exemplo de preço local.',
    ],
  },
  cookies: {
    titulo: 'Política de cookies',
    corpo: [
      'Este texto é um espaço reservado. A política oficial de cookies será definida com a rede.',
      'A proposta guarda apenas a unidade escolhida para ilustrar preços locais. Não há banner de consentimento porque ainda não há cookies de terceiros.',
    ],
  },
}

export function renderLegal(id) {
  const texto = TEXTOS[id]
  return `<article class="materia">
    <p class="migalha"><a href="#inicio">Início</a> › ${texto.titulo}</p>
    <p class="olho">Conteúdo demonstrativo</p>
    <h1>${texto.titulo}</h1>
    ${texto.corpo.map((p) => `<p>${p}</p>`).join('')}
  </article>`
}

export function mountLegal() {}
