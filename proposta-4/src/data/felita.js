export const MOMENTOS = [
  {
    id: 'manha',
    nome: 'Manhã',
    linha: 'Café e energia',
    cor: '#FFF1C7',
    titulo: 'Nutrição completa para começar o dia com amor e energia.',
    texto: 'O primeiro passo para um dia feliz começa com um café da manhã nutritivo. Compartilhe saúde e energia com quem você mais ama.',
    foto: 'Fotografia do capítulo Manhã: mesa de café com achocolatado, aveia e granola (a produzir).',
    pontos: [
      { item: 'achocolatado', x: 22, y: 38 },
      { item: 'aveia', x: 48, y: 58 },
      { item: 'granola', x: 72, y: 34 },
    ],
  },
  {
    id: 'tarde',
    nome: 'Tarde',
    linha: 'Lanche e amigos',
    cor: '#F8D7D4',
    titulo: 'Um lanche que cabe na conversa.',
    texto: 'A tarde pede algo simples para dividir. Este capítulo é exemplo: a cena oficial ainda será fotografada.',
    foto: 'Fotografia do capítulo Tarde: lanche compartilhado (a produzir).',
    pontos: [
      { item: 'bolo', x: 28, y: 42 },
      { item: 'suco', x: 55, y: 30 },
      { item: 'biscoito', x: 74, y: 60 },
    ],
  },
  {
    id: 'noite',
    nome: 'Noite',
    linha: 'Mesa e sabor',
    cor: '#2A2420',
    escuro: true,
    titulo: 'A mesa que fecha o dia.',
    texto: 'Quando a casa se reúne, a marca fica no prato. O texto deste capítulo é demonstrativo.',
    foto: 'Fotografia do capítulo Noite: mesa posta em família (a produzir).',
    pontos: [
      { item: 'tapioca', x: 30, y: 46 },
      { item: 'molho', x: 52, y: 32 },
      { item: 'arroz', x: 73, y: 55 },
    ],
  },
  {
    id: 'celebracoes',
    nome: 'Celebrações',
    linha: 'Datas especiais',
    cor: '#FBB90E',
    titulo: 'A data pede um pouco mais de festa.',
    texto: 'Aniversário, domingo ou qualquer motivo bom. Os produtos desta cena são exemplos.',
    foto: 'Fotografia do capítulo Celebrações: mesa de festa (a produzir).',
    pontos: [
      { item: 'fermento', x: 26, y: 40 },
      { item: 'bolo', x: 50, y: 58 },
      { item: 'suco', x: 74, y: 36 },
    ],
  },
]

export const LINHAS = [
  { id: 'chef', nome: 'Chef', cor: '#BD1D1D' },
  { id: 'care', nome: 'Care', cor: '#FBB90E' },
  { id: 'clean', nome: 'Clean', cor: '#1E8E4E' },
  { id: 'home', nome: 'Home', cor: '#8F1212' },
  { id: 'baby', nome: 'Baby', cor: '#1F1A17' },
]

export const ITENS = [
  { id: 'achocolatado', nome: 'Achocolatado em pó 400 g', linha: 'care', oferta: 'achocolatado', historia: 'O sabor que evoca lembranças felizes. Perfeito para o café da manhã ou um lanche especial com as crianças.' },
  { id: 'aveia', nome: 'Aveia em flocos 400 g', linha: 'care', oferta: 'aveia', historia: 'Um aliado simples para a tigela da manhã. A história oficial do produto ainda será escrita com a marca.' },
  { id: 'granola', nome: 'Granola tradicional 800 g', linha: 'chef', oferta: 'granola', historia: 'Crocância para o iogurte e para a fruta. Passe o toque e leia: este texto é um exemplo afetivo.' },
  { id: 'fermento', nome: 'Fermento químico 100 g', linha: 'home', oferta: 'fermento', historia: 'O detalhe que faz o bolo crescer na cozinha de casa. A embalagem oficial ainda será aplicada.' },
  { id: 'bolo', nome: 'Mistura para bolo 400 g', linha: 'chef', oferta: '', historia: 'Para o lanche da tarde ou a celebração de domingo. A oferta da semana ainda será definida.' },
  { id: 'suco', nome: 'Suco de laranja 1 L', linha: 'care', oferta: '', historia: 'Um copo a mais na mesa. Produto de exemplo nesta jornada.' },
  { id: 'biscoito', nome: 'Biscoito de leite 300 g', linha: 'chef', oferta: '', historia: 'Para dividir sem cerimônia. A mini-história oficial entra com o catálogo da marca.' },
  { id: 'tapioca', nome: 'Massa para tapioca 500 g', linha: 'chef', oferta: '', historia: 'Noite leve, quando a receita é rápida. Oferta da semana a definir.' },
  { id: 'molho', nome: 'Molho de tomate 340 g', linha: 'chef', oferta: '', historia: 'A base da panela que reúne a casa. Texto demonstrativo.' },
  { id: 'arroz', nome: 'Arroz da casa 1 kg', linha: 'home', oferta: '', historia: 'O prato que não falta. A linha Home ainda recebe os nomes oficiais.' },
  { id: 'sabao', nome: 'Sabão neutro 500 g', linha: 'clean', oferta: '', historia: 'Cuidado com a roupa da família, sem complicar a rotina. Exemplo da linha Clean.' },
  { id: 'amaciante', nome: 'Amaciante 2 L', linha: 'clean', oferta: '', historia: 'O cheiro de casa limpa. Produto ilustrativo.' },
  { id: 'alcool', nome: 'Álcool 1 L', linha: 'clean', oferta: '', historia: 'A limpeza do dia a dia. A fórmula e a embalagem oficiais ainda serão informadas.' },
  { id: 'toalha', nome: 'Pano de prato', linha: 'home', oferta: '', historia: 'Um item de casa, feito para a rede. Exemplo da linha Home.' },
  { id: 'fralda', nome: 'Fralda infantil', linha: 'baby', oferta: '', historia: 'Cuidado para quem chegou agora. A linha Baby é um espaço reservado no catálogo.' },
  { id: 'lenco', nome: 'Lenço umedecido', linha: 'baby', oferta: '', historia: 'Praticidade na bolsa da família. Texto de exemplo.' },
  { id: 'shampoo', nome: 'Shampoo infantil 200 ml', linha: 'baby', oferta: '', historia: 'Um cuidado a mais na hora do banho. Produto ilustrativo.' },
]

export const PERGUNTAS = [
  {
    pergunta: 'Quem vai à mesa hoje?',
    opcoes: [
      ['so', 'Só eu'],
      ['familia', 'Em família'],
      ['amigos', 'Com amigos'],
      ['festa', 'Uma festa'],
    ],
  },
  {
    pergunta: 'Qual momento você quer cuidar?',
    opcoes: [
      ['manha', 'Manhã'],
      ['tarde', 'Tarde'],
      ['noite', 'Noite'],
      ['celebracoes', 'Uma celebração'],
    ],
  },
  {
    pergunta: 'O que não pode faltar?',
    opcoes: [
      ['doce', 'Algo doce'],
      ['pratico', 'Algo prático'],
      ['mesa', 'A mesa posta'],
    ],
  },
]

const FRASES = {
  so: 'Para a sua mesa, a sugestão de hoje é simples.',
  familia: 'Para a família inteira, duas escolhas que cabem na rotina.',
  amigos: 'Para dividir com amigos, dois produtos de lanche.',
  festa: 'Para a festa, dois produtos que ajudam a celebrar.',
}

export function itemById(id) {
  return ITENS.find((item) => item.id === id)
}

export function momentoById(id) {
  return MOMENTOS.find((item) => item.id === id) || MOMENTOS[0]
}

export function sugestoes(ans) {
  const momento = ans[1] || 'manha'
  const doMomento = ITENS.filter((item) => MOMENTOS.find((m) => m.id === momento)?.pontos.some((p) => p.item === item.id))
  const base = doMomento.length >= 2 ? doMomento : ITENS.filter((item) => item.linha === 'chef')
  return { frase: FRASES[ans[0]] || FRASES.familia, itens: base.slice(0, 2) }
}
