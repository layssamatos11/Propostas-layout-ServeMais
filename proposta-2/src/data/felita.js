export const ROOMS = [
  {
    id: 'baby',
    num: '01',
    nome: 'Quarto do bebê',
    linha: 'Felitá Baby',
    historia: 'O cuidado que cabe na rotina: fraldas, lenços e o cheirinho de casa nova.',
    produtos: [13],
  },
  {
    id: 'care',
    num: '02',
    nome: 'Banheiro',
    linha: 'Felitá Care',
    historia: 'Higiene sem complicação, para o banho de todo dia e a visita de domingo.',
    produtos: [11],
  },
  {
    id: 'home',
    num: '03',
    nome: 'Sala',
    linha: 'Felitá Home',
    historia: 'A sala que recebe a família: suco na jarra e o copo que todo mundo conhece.',
    produtos: [10, 12],
  },
  {
    id: 'chef',
    num: '04',
    nome: 'Cozinha',
    linha: 'Felitá Chef',
    historia: 'Sabor caseiro em minutos. Aquele tempero que só a sua família reconhece.',
    produtos: [13, 14, 15],
  },
  {
    id: 'clean',
    num: '05',
    nome: 'Lavanderia',
    linha: 'Felitá Clean',
    historia: 'Roupa limpa, casa em ordem e o cheiro de segunda-feira bem resolvida.',
    produtos: [11],
  },
]

export const MOMENTOS = [
  { id: 'manha', nome: 'Manhã', titulo: 'Nutrição completa para começar o dia com amor e energia.', cena: 'Mesa posta, café e a primeira luz na cozinha.' },
  { id: 'tarde', nome: 'Tarde', titulo: 'O lanche perfeito para compartilhar.', cena: 'A tarde pede bolo, suco e a cadeira arrastada da sala.' },
  { id: 'noite', nome: 'Noite', titulo: 'O sabor da amizade nas noites de filmes.', cena: 'Luz baixa, tigela na mesa e a casa mais quieta.' },
  { id: 'festas', nome: 'Celebrações', titulo: 'Celebre o carinho em cada fatia.', cena: 'A mesa comprida, o bolo no centro e a casa cheia.' },
]

export function roomById(id) {
  return ROOMS.find((room) => room.id === id) || ROOMS[3]
}
