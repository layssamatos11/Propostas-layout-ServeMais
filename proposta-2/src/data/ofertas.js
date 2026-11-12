export const OFERTAS = [
  { id: 1, nome: 'Banana prata', det: 'Por kg (exemplo)', cat: 'Hortifruti', camp: 'Ofertão da Semana', tag: 'OFERTA', preco: 4.99, de: 6.49 },
  { id: 2, nome: 'Tomate maduro', det: 'Por kg (exemplo)', cat: 'Hortifruti', camp: 'Ofertão da Semana', tag: 'PCT', preco: 5.49, de: 7.99 },
  { id: 3, nome: 'Patinho bovino', det: 'Por kg (exemplo)', cat: 'Açougue', camp: 'Ofertão da Semana', tag: 'OFERTA', preco: 32.9, de: 39.9 },
  { id: 4, nome: 'Frango inteiro', det: 'Por kg (exemplo)', cat: 'Açougue', camp: 'Fecha Mês', tag: 'LEVE 3', preco: 9.99, de: 12.9 },
  { id: 5, nome: 'Arroz tipo 1', det: 'Pacote 5 kg (exemplo)', cat: 'Mercearia', camp: 'Ofertão da Semana', tag: 'OFERTA', preco: 22.9, de: 28.9 },
  { id: 6, nome: 'Feijão carioca', det: 'Pacote 1 kg (exemplo)', cat: 'Mercearia', camp: 'Fecha Mês', tag: 'OFERTA', preco: 7.49, de: 9.99 },
  { id: 7, nome: 'Leite integral', det: 'Caixa 1 L (exemplo)', cat: 'Frios e laticínios', camp: 'Ofertão da Semana', tag: 'LEVE 3', preco: 4.79, de: 5.99 },
  { id: 8, nome: 'Queijo mussarela', det: 'Por kg (exemplo)', cat: 'Frios e laticínios', camp: '', tag: 'OFERTA', preco: 39.9, de: 49.9 },
  { id: 9, nome: 'Refrigerante cola', det: 'Garrafa 2 L (exemplo)', cat: 'Bebidas', camp: 'Fecha Mês', tag: 'PCT', preco: 7.99, de: 10.99 },
  { id: 10, nome: 'Suco de laranja', det: 'Garrafa 1 L (exemplo)', cat: 'Bebidas', camp: 'Sazonais', tag: 'NOVO', preco: 8.49, de: 9.99 },
  { id: 11, nome: 'Detergente neutro', det: 'Frasco 500 ml (exemplo)', cat: 'Higiene e limpeza', camp: 'Fecha Mês', tag: 'LEVE 3', preco: 1.99, de: 2.79 },
  { id: 12, nome: 'Copo americano', det: 'Jogo com 6 (exemplo)', cat: 'Bazar', camp: 'Sazonais', tag: 'NOVO', preco: 12.9, de: 16.9 },
  { id: 13, nome: 'Achocolatado Felitá', det: 'Pote 400 g (exemplo)', cat: 'Mercearia', camp: 'Sazonais', tag: 'NOVO', marca: 'felita', preco: 8.49, de: 11.9 },
  { id: 14, nome: 'Granola Felitá', det: 'Pacote 800 g (exemplo)', cat: 'Mercearia', camp: 'Ofertão da Semana', tag: 'OFERTA', marca: 'felita', preco: 16.9, de: 21.9 },
  { id: 15, nome: 'Fermento Felitá', det: 'Pote 100 g (exemplo)', cat: 'Mercearia', camp: 'Fecha Mês', tag: 'PCT', marca: 'felita', preco: 3.49, de: 4.99 },
]

export function offerById(id) {
  return OFERTAS.find((offer) => offer.id === Number(id))
}
