export const SETORES = [
  { nome: 'Hortifruti', cor: '#E7F2D8', tinta: '#2E7D4F', icon: 'horti' },
  { nome: 'Açougue', cor: '#F8D6D2', tinta: '#BD1D1D', icon: 'carne' },
  { nome: 'Mercearia', cor: '#FFF1C2', tinta: '#8A6A00', icon: 'cesta' },
  { nome: 'Frios e laticínios', cor: '#F8E4F1', tinta: '#9C3A78', icon: 'frio' },
  { nome: 'Bebidas', cor: '#F3E6CF', tinta: '#8A5A00', icon: 'copo' },
  { nome: 'Higiene e limpeza', cor: '#FDE6D4', tinta: '#C45C26', icon: 'brilho' },
  { nome: 'Bazar', cor: '#F6DDE0', tinta: '#A33B4A', icon: 'sacola' },
]

export const CAMPANHAS = ['Ofertão da Semana', 'Fecha Mês', 'Sazonais']

export function setorByName(nome) {
  return SETORES.find((setor) => setor.nome === nome) || SETORES[2]
}
