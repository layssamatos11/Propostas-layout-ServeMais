export const OFERTAS = [
  { id: 1, nome: 'Banana prata', det: 'Por kg (exemplo)', cat: 'Hortifruti', camp: 'Ofertão da Semana', tag: 'OFERTA', preco: 4.99, de: 6.49 },
  { id: 2, nome: 'Tomate maduro', det: 'Por kg (exemplo)', cat: 'Hortifruti', camp: 'Ofertão da Semana', tag: 'PCT', preco: 5.49, de: 7.99 },
  { id: 3, nome: 'Alface crespa', det: 'Unidade (exemplo)', cat: 'Hortifruti', camp: '', tag: 'OFERTA', preco: 2.99, de: 3.99 },
  { id: 4, nome: 'Patinho bovino', det: 'Por kg (exemplo)', cat: 'Açougue', camp: 'Ofertão da Semana', tag: 'OFERTA', preco: 32.9, de: 39.9 },
  { id: 5, nome: 'Frango inteiro', det: 'Por kg (exemplo)', cat: 'Açougue', camp: 'Fecha Mês', tag: 'LEVE 3', preco: 9.99, de: 12.9 },
  { id: 6, nome: 'Linguiça toscana', det: 'Por kg (exemplo)', cat: 'Açougue', camp: '', tag: 'PCT', preco: 18.9, de: 22.9 },
  { id: 7, nome: 'Arroz tipo 1', det: 'Pacote 5 kg (exemplo)', cat: 'Mercearia', camp: 'Ofertão da Semana', tag: 'OFERTA', preco: 22.9, de: 28.9 },
  { id: 8, nome: 'Feijão carioca', det: 'Pacote 1 kg (exemplo)', cat: 'Mercearia', camp: 'Fecha Mês', tag: 'OFERTA', preco: 7.49, de: 9.99 },
  { id: 9, nome: 'Óleo de soja', det: 'Garrafa 900 ml (exemplo)', cat: 'Mercearia', camp: 'Fecha Mês', tag: 'PCT', preco: 6.99, de: 8.49 },
  { id: 10, nome: 'Leite integral', det: 'Caixa 1 L (exemplo)', cat: 'Frios e laticínios', camp: 'Ofertão da Semana', tag: 'LEVE 3', preco: 4.79, de: 5.99 },
  { id: 11, nome: 'Queijo mussarela', det: 'Por kg (exemplo)', cat: 'Frios e laticínios', camp: '', tag: 'OFERTA', preco: 39.9, de: 49.9 },
  { id: 12, nome: 'Refrigerante cola', det: 'Garrafa 2 L (exemplo)', cat: 'Bebidas', camp: 'Fecha Mês', tag: 'PCT', preco: 7.99, de: 10.99 },
  { id: 13, nome: 'Suco de laranja', det: 'Garrafa 1 L (exemplo)', cat: 'Bebidas', camp: 'Sazonais', tag: 'NOVO', preco: 8.49, de: 9.99 },
  { id: 14, nome: 'Água mineral', det: 'Garrafa 1,5 L (exemplo)', cat: 'Bebidas', camp: '', tag: 'OFERTA', preco: 2.49, de: 3.29 },
  { id: 15, nome: 'Detergente neutro', det: 'Frasco 500 ml (exemplo)', cat: 'Higiene e limpeza', camp: 'Fecha Mês', tag: 'LEVE 3', preco: 1.99, de: 2.79 },
  { id: 16, nome: 'Copo americano', det: 'Jogo com 6 (exemplo)', cat: 'Bazar', camp: 'Sazonais', tag: 'NOVO', preco: 12.9, de: 16.9 },
]

export function offerById(id) {
  return OFERTAS.find((offer) => offer.id === Number(id))
}
