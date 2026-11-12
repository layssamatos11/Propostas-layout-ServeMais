import { slug } from '../lib/format.js'

export const FILTROS = [
  { id: 'Todas', nome: 'Todas' },
  { id: 'ofertao', nome: 'Ofertão da Semana' },
  { id: 'fecha', nome: 'Fecha Mês' },
  { id: 'sazonal', nome: 'Sazonais' },
  { id: 'Hortifruti', nome: 'Hortifruti' },
  { id: 'Açougue', nome: 'Açougue' },
  { id: 'Mercearia', nome: 'Mercearia' },
  { id: 'Bebidas', nome: 'Bebidas' },
  { id: 'Frios', nome: 'Frios e laticínios' },
  { id: 'Higiene', nome: 'Higiene e limpeza' },
  { id: 'Bazar', nome: 'Bazar' },
  { id: 'Felitá', nome: 'Felitá' },
]

export const CAMPANHAS = [
  {
    id: 'ofertao',
    nome: 'Ofertão da semana',
    texto: 'Toda semana, preço de verdade. O banner, a validade e o regulamento ainda serão fornecidos pela rede.',
  },
  {
    id: 'fecha',
    nome: 'Fecha Mês',
    texto: 'Fecha Mês com economia. O período e as regras resumidas entram quando a rede publicar a campanha.',
  },
  {
    id: 'especiais',
    nome: 'Ações especiais',
    texto: 'Dias de desconto e parcerias da rede. O calendário ainda será informado.',
  },
]

export const SAZONAIS = [
  { id: 'pascoa', nome: 'Páscoa', texto: 'Campanha sazonal de exemplo. Período, banner e regulamento serão fornecidos pela rede.' },
  { id: 'natal', nome: 'Natal', texto: 'Campanha sazonal de exemplo. Período, banner e regulamento serão fornecidos pela rede.' },
  { id: 'junina', nome: 'Festa Junina', texto: 'Campanha sazonal de exemplo. Período, banner e regulamento serão fornecidos pela rede.' },
]

export const OFERTAS = [
  { id: 'arroz', nome: 'Arroz tipo 1', cat: 'Mercearia', campanha: 'ofertao', selo: 'oferta', embalagem: 'Pacote 5 kg (exemplo)', de: 28.9, preco: 22.9, cor: '#F3E2C4' },
  { id: 'tomate', nome: 'Tomate maduro', cat: 'Hortifruti', campanha: 'ofertao', selo: 'oferta', embalagem: 'Por kg (exemplo)', de: 7.99, preco: 5.49, cor: '#F6C9BE' },
  { id: 'patinho', nome: 'Patinho bovino', cat: 'Açougue', campanha: 'ofertao', selo: 'off', embalagem: 'Por kg (exemplo)', de: 39.9, preco: 32.9, cor: '#F0C7C4' },
  { id: 'biscoito', nome: 'Biscoito cream cracker', cat: 'Mercearia', campanha: 'ofertao', selo: 'leve', embalagem: 'Pacote 400 g (exemplo)', de: 6.49, preco: 4.99, cor: '#F7E7C2' },
  { id: 'refri', nome: 'Refrigerante cola', cat: 'Bebidas', campanha: 'fecha', selo: 'leve', embalagem: 'Garrafa 2 L (exemplo)', de: 8.99, preco: 6.99, cor: '#F4D2D2' },
  { id: 'detergente', nome: 'Detergente neutro', cat: 'Higiene', campanha: 'ofertao', selo: 'oferta', embalagem: 'Frasco 500 ml (exemplo)', de: 3.49, preco: 2.49, cor: '#D9EFE4' },
  { id: 'feijao', nome: 'Feijão carioca', cat: 'Mercearia', campanha: 'sazonal', selo: 'novo', embalagem: 'Pacote 1 kg (exemplo)', de: 9.49, preco: 7.49, cor: '#E7D3B4' },
  { id: 'banana', nome: 'Banana prata', cat: 'Hortifruti', campanha: 'ofertao', selo: 'oferta', embalagem: 'Por kg (exemplo)', de: 6.99, preco: 4.99, cor: '#F6E7A8' },
  { id: 'frango', nome: 'Frango inteiro', cat: 'Açougue', campanha: 'fecha', selo: 'oferta', embalagem: 'Por kg (exemplo)', de: 12.9, preco: 9.9, cor: '#F8D9C4' },
  { id: 'suco', nome: 'Suco de laranja', cat: 'Bebidas', campanha: 'sazonal', selo: 'novo', embalagem: 'Garrafa 1 L (exemplo)', de: 11.9, preco: 9.99, cor: '#F8E0B0' },
  { id: 'mussarela', nome: 'Mussarela fatiada', cat: 'Frios', campanha: 'ofertao', selo: 'oferta', embalagem: 'Bandeja 300 g (exemplo)', de: 18.9, preco: 14.9, cor: '#F7E3A2' },
  { id: 'iogurte', nome: 'Iogurte natural', cat: 'Frios', campanha: 'fecha', selo: 'leve', embalagem: 'Bandeja 6 un. (exemplo)', de: 8.9, preco: 6.9, cor: '#F4EBD2' },
  { id: 'agua', nome: 'Água sanitária', cat: 'Higiene', campanha: 'ofertao', selo: 'oferta', embalagem: 'Frasco 1 L (exemplo)', de: 5.49, preco: 4.29, cor: '#D5E7F2' },
  { id: 'vela', nome: 'Vela decorativa', cat: 'Bazar', campanha: 'sazonal', selo: 'novo', embalagem: 'Unidade (exemplo)', de: 12.9, preco: 9.9, cor: '#F6D7C8' },
  { id: 'achocolatado', nome: 'Achocolatado em pó', cat: 'Felitá', campanha: 'ofertao', selo: 'oferta', embalagem: 'Lata 400 g (exemplo)', de: 11.9, preco: 8.9, cor: '#E7D3B0' },
  { id: 'aveia', nome: 'Aveia em flocos', cat: 'Felitá', campanha: 'ofertao', selo: 'novo', embalagem: 'Pacote 400 g (exemplo)', de: 7.9, preco: 6.49, cor: '#F3E6C8' },
  { id: 'granola', nome: 'Granola tradicional', cat: 'Felitá', campanha: 'fecha', selo: 'leve', embalagem: 'Pacote 800 g (exemplo)', de: 16.9, preco: 13.9, cor: '#EBD7B4' },
  { id: 'fermento', nome: 'Fermento químico', cat: 'Felitá', campanha: 'sazonal', selo: 'oferta', embalagem: 'Caixa 100 g (exemplo)', de: 6.49, preco: 4.79, cor: '#F8E7D2' },
]

export function campanhaById(id) {
  return [...CAMPANHAS, ...SAZONAIS].find((item) => item.id === id)
}

export function matchFiltro(arg) {
  if (!arg || arg === 'todas') return 'Todas'
  const found = FILTROS.find((item) => slug(item.id) === arg || slug(item.nome) === arg)
  return found ? found.id : 'Todas'
}

export function offerById(id) {
  return OFERTAS.find((item) => item.id === id)
}
