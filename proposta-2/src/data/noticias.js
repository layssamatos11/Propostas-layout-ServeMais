export const NOTICIAS = [
  {
    slug: 'ofertao-chega-as-17-lojas',
    cat: 'Campanhas',
    titulo: 'Ofertão da semana chega às 17 lojas da rede',
    linha: 'Uma edição demonstrativa de como a campanha semanal apareceria no jornal da rede.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '3 min',
    lidas: 5,
    corpo: [
      'Este texto é um exemplo de matéria. A campanha, os preços e o período ainda serão informados pela Rede Serve Mais.',
      'No site, a matéria leva o leitor da notícia para a gôndola de ofertas e para a unidade mais próxima.',
    ],
  },
  {
    slug: 'felita-na-cozinha',
    cat: 'Felitá',
    titulo: 'Felitá entra na cozinha com a linha Chef',
    linha: 'A marca exclusiva ganha um cômodo próprio dentro do novo site.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '4 min',
    lidas: 4,
    corpo: [
      'A casa Felitá é um conceito: cada cômodo apresenta produtos e uma história curta.',
      'Os itens, os sabores e as embalagens oficiais entram quando a marca entregar o material.',
    ],
  },
  {
    slug: 'como-chegar-na-unidade',
    cat: 'Lojas',
    titulo: 'Como achar a unidade do seu bairro',
    linha: 'O mapa ilustrativo mostra as 17 lojas em Cuiabá e Várzea Grande.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '2 min',
    lidas: 3,
    corpo: [
      'Os endereços desta proposta são exemplos. O botão Como chegar abre o Google Maps com o texto demonstrativo.',
    ],
  },
  {
    slug: 'rede-de-familia',
    cat: 'Institucional',
    titulo: 'Uma rede feita de família, perto da mesa',
    linha: 'O texto institucional completo será escrito com a empresa.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '5 min',
    lidas: 2,
    corpo: [
      'A história, o ano de fundação e os marcos da rede ficam reservados para o conteúdo oficial.',
    ],
  },
  {
    slug: 'fecha-mes-na-gôndola',
    cat: 'Campanhas',
    titulo: 'Fecha Mês ocupa a gôndola com regras claras',
    linha: 'O banner de campanha reserva espaço para validade e regulamento.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '2 min',
    lidas: 2,
    corpo: [
      'Nada nesta página é uma oferta válida. O regulamento ilustrativo explica onde as regras reais vão entrar.',
    ],
  },
  {
    slug: 'felita-baby',
    cat: 'Felitá',
    titulo: 'Quarto do bebê: a linha Felitá Baby',
    linha: 'Um cômodo da casa mostra como a marca exclusiva pode ser navegada.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '3 min',
    lidas: 1,
    corpo: [
      'Toque no cômodo, leia a história e siga para a oferta. Esse é o caminho desenhado na proposta.',
    ],
  },
  {
    slug: 'horario-de-domingo',
    cat: 'Lojas',
    titulo: 'Domingo e feriado ganham horário próprio no cartão da loja',
    linha: 'Cada unidade separa a semana do fim de semana.',
    data: '00/00/0000',
    autor: 'Equipe Serve Mais',
    leitura: '2 min',
    lidas: 1,
    corpo: [
      'Os horários exibidos são exemplos e mudam de uma unidade para outra só para demonstrar o layout.',
    ],
  },
]

export function articleBySlug(slug) {
  return NOTICIAS.find((item) => item.slug === slug)
}
