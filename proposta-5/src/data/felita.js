export const ROOMS = [
  {
    id: 'baby',
    num: '01',
    nome: 'Quarto do bebê',
    linha: 'Felitá Baby',
    historia: 'O cuidado que cabe na rotina: o cheirinho de casa nova e o produto que a família já reconhece.',
    produtos: [19],
  },
  {
    id: 'care',
    num: '02',
    nome: 'Banheiro',
    linha: 'Felitá Care',
    historia: 'Higiene sem complicação, para o banho de todo dia e a visita de domingo.',
    produtos: [20],
  },
  {
    id: 'home',
    num: '03',
    nome: 'Sala',
    linha: 'Felitá Home',
    historia: 'A sala que recebe a família: suco na jarra e o copo que todo mundo conhece.',
    produtos: [12, 14],
  },
  {
    id: 'chef',
    num: '04',
    nome: 'Cozinha',
    linha: 'Felitá Chef',
    historia: 'Sabor caseiro em minutos. Transforme qualquer prato em um convite para a mesa.',
    produtos: [15, 16, 17],
  },
  {
    id: 'clean',
    num: '05',
    nome: 'Lavanderia',
    linha: 'Felitá Clean',
    historia: 'Roupa limpa, casa em ordem e o cheiro de segunda-feira bem resolvida.',
    produtos: [21],
  },
]

export const MOMENTOS = [
  {
    id: 'manha',
    nome: 'Manhã',
    titulo: 'Nutrição completa para começar o dia com amor e energia.',
    cena: 'Mesa posta, café e a primeira luz na cozinha.',
    cor: '#FBB90E',
    itens: [18, 15],
  },
  {
    id: 'tarde',
    nome: 'Tarde',
    titulo: 'O lanche perfeito para compartilhar.',
    cena: 'A tarde pede bolo, suco e a cadeira arrastada da sala.',
    cor: '#F3E6CF',
    itens: [12, 16],
  },
  {
    id: 'noite',
    nome: 'Noite',
    titulo: 'O sabor da amizade nas noites de filmes.',
    cena: 'Luz baixa, tigela na mesa e a casa mais quieta.',
    cor: '#231815',
    escuro: true,
    itens: [15, 8],
  },
  {
    id: 'festas',
    nome: 'Celebrações',
    titulo: 'Celebre o carinho em cada fatia.',
    cena: 'A mesa comprida, o bolo no centro e a casa cheia.',
    cor: '#BD1D1D',
    escuro: true,
    itens: [17, 16],
  },
]

export function roomById(id) {
  return ROOMS.find((room) => room.id === id) || ROOMS[3]
}

export function momentoById(id) {
  return MOMENTOS.find((item) => item.id === id) || MOMENTOS[0]
}
