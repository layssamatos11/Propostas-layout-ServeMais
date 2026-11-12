function readUnidade() {
  try {
    const n = Number(localStorage.getItem('sm4-unidade'))
    return n >= 1 && n <= 17 ? n : 0
  } catch {
    return 0
  }
}

export const state = {
  filtro: 'Todas',
  cidade: 'Todas',
  aberto: false,
  busca: '',
  lojaId: 1,
  unidade: readUnidade(),
  ordem: 'desconto',
  visiveis: 8,
  artigo: '',
  noticiaCat: 'Todas',
  pagina: 1,
  homeCat: 'Todas',
  momento: 'manha',
  linha: 'chef',
  quizStep: 0,
  quizAns: [],
  zoom: 1,
}

export function setUnidade(id) {
  const n = Number(id) || 0
  state.unidade = n >= 1 && n <= 17 ? n : 0
  try {
    localStorage.setItem('sm4-unidade', String(state.unidade))
  } catch {
    /* a preferência fica só nesta visita */
  }
}
