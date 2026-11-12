const TEXTOS = {
  privacidade: {
    titulo: 'Política de privacidade',
    corpo: [
      'Este texto é um espaço reservado. A política oficial, com a base legal e os contatos da rede, entra antes da publicação do site.',
      'Nesta proposta, a lista de compras e a unidade escolhida ficam só neste aparelho, nas chaves sm5-lista e sm5-unidade. Os formulários não enviam dados para lugar nenhum.',
    ],
  },
  cookies: {
    titulo: 'Política de cookies',
    corpo: [
      'Este texto é um espaço reservado. A política oficial de cookies será publicada pela Rede Serve Mais.',
      'A demonstração guarda apenas a lista e a unidade de exemplo no armazenamento local do navegador. Não há cookie de rastreamento.',
    ],
  },
}

export function renderLegal(kind) {
  const page = TEXTOS[kind]
  return `<article class="materia">
    <p class="kicker">Institucional</p>
    <h1>${page.titulo}</h1>
    ${page.corpo.map((p) => `<p>${p}</p>`).join('')}
    <a class="btn btn-line" href="#inicio">Voltar ao início</a>
  </article>`
}

export function mountLegal() {}
