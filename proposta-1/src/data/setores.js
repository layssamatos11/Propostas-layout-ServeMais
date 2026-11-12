export const SETORES = [
  { nome: 'Hortifruti', cor: '#E5F4D8', tinta: '#2E7D32', desc: 'Frutas, legumes e verduras para a mesa da família.', icon: 'horti' },
  { nome: 'Açougue', cor: '#F8D6D2', tinta: '#BD1D1D', desc: 'Cortes de carne e aves para o churrasco e a rotina.', icon: 'carne' },
  { nome: 'Mercearia', cor: '#FFF1C7', tinta: '#8A6A00', desc: 'Itens do dia a dia para abastecer a despensa.', icon: 'cesta' },
  { nome: 'Frios e laticínios', cor: '#F8E4F1', tinta: '#9C3A78', desc: 'Queijos, presuntos, leites e iogurtes.', icon: 'frio' },
  { nome: 'Bebidas', cor: '#FDE7A8', tinta: '#8A5A00', desc: 'Água, sucos, refrigerantes e muito mais.', icon: 'copo' },
  { nome: 'Higiene e limpeza', cor: '#FDE6D4', tinta: '#C45C26', desc: 'Cuidados pessoais e tudo para deixar a casa em ordem.', icon: 'brilho' },
  { nome: 'Bazar', cor: '#F6DDE0', tinta: '#A33B4A', desc: 'Utilidades domésticas e itens do cotidiano.', icon: 'sacola' },
]

export const FILTROS = [
  'Todas',
  'Ofertão da Semana',
  'Fecha Mês',
  'Sazonais',
  ...SETORES.map((setor) => setor.nome),
]

export function setorByName(nome) {
  return SETORES.find((setor) => setor.nome === nome) || SETORES[2]
}
