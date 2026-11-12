export const NOTICIAS = [
  {
    slug: 'ofertao-nas-lojas',
    cat: 'Campanhas',
    titulo: 'Ofertão da semana chega às 17 lojas',
    linha: 'Uma edição demonstrativa de como a campanha semanal apareceria no jornal da rede.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#1B2744',
    corpo: [
      'Este texto mostra o miolo de uma matéria. A redação oficial, a foto e a data entram quando a rede publicar.',
      'O destaque reserva espaço para o banner da campanha e um botão para a leitura completa.',
    ],
  },
  {
    slug: 'felita-na-mesa',
    cat: 'Felitá',
    titulo: 'Felitá conta a história em cinco capítulos',
    linha: 'A marca exclusiva ganha uma página própria, do nome à prateleira.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#E10613',
    corpo: [
      'A página da marca exclusiva organiza a história em capítulos e deixa as linhas de produto para a rede nomear.',
      'Enquanto isso, o botão leva o leitor às ofertas demonstrativas.',
    ],
  },
  {
    slug: 'como-achar-a-loja',
    cat: 'Lojas',
    titulo: 'Como achar a unidade do seu bairro',
    linha: 'Dezessete cartões, filtro por cidade e a rota no Google Maps.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#2F6BFF',
    corpo: [
      'O mapa interativo fica para quando os endereços oficiais forem cadastrados.',
      'Até lá, cada unidade de exemplo abre uma busca no Google Maps.',
    ],
  },
  {
    slug: 'rede-familiar',
    cat: 'Institucional',
    titulo: 'Uma rede familiar, perto da mesa',
    linha: 'O texto de trajetória será escrito com a empresa.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#22C55E',
    corpo: [
      'Cuiabá e Várzea Grande concentram as 17 lojas desta proposta.',
      'Ano de fundação, marcos e números oficiais ainda não entram aqui.',
    ],
  },
  {
    slug: 'fecha-mes',
    cat: 'Campanhas',
    titulo: 'Fecha Mês reserva o banner da campanha',
    linha: 'Validade e regulamento serão publicados pela rede.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#F6E7A8',
    corpo: [
      'O bloco vermelho no fim das ofertas é o lugar do Fecha Mês.',
      'Sem data oficial, o botão explica que a campanha ainda é um exemplo.',
    ],
  },
  {
    slug: 'vagas-da-rede',
    cat: 'Institucional',
    titulo: 'O currículo fica neste navegador',
    linha: 'O formulário de Trabalhe conosco confere os campos e não envia o arquivo.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#C6A15B',
    corpo: [
      'As vagas listadas são exemplos de loja, setor e cidade.',
      'A lista oficial substitui esses cartões quando o RH cadastrar.',
    ],
  },
  {
    slug: 'domingo-na-loja',
    cat: 'Lojas',
    titulo: 'Domingo e feriado no cartão da unidade',
    linha: 'Cada loja de exemplo separa o horário da semana e o do domingo.',
    data: 'Data a definir',
    autor: 'Equipe Serve Mais',
    cor: '#7C8EA0',
    corpo: [
      'Os horários desta proposta são ilustrativos.',
      'O cartão oficial traz o expediente confirmado pela unidade.',
    ],
  },
]

export function articleBySlug(slug) {
  return NOTICIAS.find((item) => item.slug === slug)
}
