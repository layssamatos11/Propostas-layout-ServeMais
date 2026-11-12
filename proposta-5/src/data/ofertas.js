export const OFERTAS = [
  { id: 1, nome: 'Banana prata', det: 'Por kg (exemplo)', cat: 'Hortifruti', camp: 'ofertao', selo: 'oferta', preco: 4.99, de: 6.49, cor: '#F3E6A8' },
  { id: 2, nome: 'Tomate maduro', det: 'Por kg (exemplo)', cat: 'Hortifruti', camp: 'ofertao', selo: 'leve', preco: 5.49, de: 7.99, cor: '#F6C1B8' },
  { id: 3, nome: 'Alface crespa', det: 'Unidade (exemplo)', cat: 'Hortifruti', camp: 'fecha', selo: 'oferta', preco: 3.29, de: 4.49, cor: '#D5E8C4' },
  { id: 4, nome: 'Patinho bovino', det: 'Por kg (exemplo)', cat: 'Açougue', camp: 'ofertao', selo: 'oferta', preco: 32.9, de: 39.9, cor: '#F0C2BC' },
  { id: 5, nome: 'Frango inteiro', det: 'Por kg (exemplo)', cat: 'Açougue', camp: 'fecha', selo: 'leve', preco: 9.9, de: 12.9, cor: '#F6D7C3' },
  { id: 6, nome: 'Arroz tipo 1', det: 'Pacote 5 kg (exemplo)', cat: 'Mercearia', camp: 'ofertao', selo: 'oferta', preco: 22.9, de: 28.9, cor: '#F3E6CF' },
  { id: 7, nome: 'Feijão carioca', det: 'Pacote 1 kg (exemplo)', cat: 'Mercearia', camp: 'fecha', selo: 'oferta', preco: 7.49, de: 9.99, cor: '#E7D3B0' },
  { id: 8, nome: 'Biscoito cream cracker', det: 'Pacote 400 g (exemplo)', cat: 'Mercearia', camp: 'ofertao', selo: 'off', preco: 4.99, de: 6.49, cor: '#F8E2B8' },
  { id: 9, nome: 'Leite integral', det: 'Caixa 1 L (exemplo)', cat: 'Frios e laticínios', camp: 'ofertao', selo: 'leve', preco: 4.79, de: 5.99, cor: '#F7E7F2' },
  { id: 10, nome: 'Queijo mussarela', det: 'Por kg (exemplo)', cat: 'Frios e laticínios', camp: '', selo: 'oferta', preco: 39.9, de: 49.9, cor: '#F8E4A8' },
  { id: 11, nome: 'Refrigerante cola', det: 'Garrafa 2 L (exemplo)', cat: 'Bebidas', camp: 'fecha', selo: 'oferta', preco: 7.99, de: 10.99, cor: '#F3D2C4' },
  { id: 12, nome: 'Suco de laranja', det: 'Garrafa 1 L (exemplo)', cat: 'Bebidas', camp: 'sazonais', selo: 'novo', preco: 8.49, de: 9.99, cor: '#F8D48A' },
  { id: 13, nome: 'Detergente neutro', det: 'Frasco 500 ml (exemplo)', cat: 'Higiene e limpeza', camp: 'fecha', selo: 'leve', preco: 2.49, de: 3.49, cor: '#D9EFE4' },
  { id: 14, nome: 'Copo americano', det: 'Jogo com 6 (exemplo)', cat: 'Bazar', camp: 'sazonais', selo: 'novo', preco: 12.9, de: 16.9, cor: '#F6DDE0' },
  { id: 15, nome: 'Achocolatado Felitá', det: 'Pote 400 g (exemplo)', cat: 'Mercearia', camp: 'sazonais', selo: 'novo', marca: 'felita', preco: 8.9, de: 11.9, cor: '#E7D3B8' },
  { id: 16, nome: 'Granola Felitá', det: 'Pacote 800 g (exemplo)', cat: 'Mercearia', camp: 'ofertao', selo: 'oferta', marca: 'felita', preco: 16.9, de: 21.9, cor: '#E8D7A8' },
  { id: 17, nome: 'Fermento Felitá', det: 'Pote 100 g (exemplo)', cat: 'Mercearia', camp: 'fecha', selo: 'oferta', marca: 'felita', preco: 4.79, de: 6.49, cor: '#F7E3C4' },
  { id: 18, nome: 'Aveia Felitá', det: 'Caixa 250 g (exemplo)', cat: 'Mercearia', camp: 'sazonais', selo: 'novo', marca: 'felita', preco: 9.9, de: 12.9, cor: '#F3E6CF' },
  { id: 19, nome: 'Lenço Felitá Baby', det: 'Pacote 50 un. (exemplo)', cat: 'Higiene e limpeza', camp: '', selo: 'novo', marca: 'felita', preco: 6.9, de: 8.9, cor: '#F8E4F1' },
  { id: 20, nome: 'Sabonete Felitá Care', det: 'Barra 90 g (exemplo)', cat: 'Higiene e limpeza', camp: 'fecha', selo: 'oferta', marca: 'felita', preco: 2.99, de: 3.99, cor: '#D7E8F6' },
  { id: 21, nome: 'Amaciante Felitá Clean', det: 'Frasco 2 L (exemplo)', cat: 'Higiene e limpeza', camp: 'fecha', selo: 'oferta', marca: 'felita', preco: 11.9, de: 15.9, cor: '#D9E4F6' },
]

export function offerById(id) {
  return OFERTAS.find((item) => item.id === Number(id))
}
