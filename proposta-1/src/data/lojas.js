export const LOJAS = [
  { id: 1, nome: 'Unidade 01', cidade: 'Cuiabá', bairro: 'Centro', end: 'Rua exemplo, 100', abre: 7, fecha: 22, tel: '6530000101', x: 34, y: 46 },
  { id: 2, nome: 'Unidade 02', cidade: 'Cuiabá', bairro: 'Santa Rosa', end: 'Avenida exemplo, 250', abre: 7, fecha: 22, tel: '6530000102', x: 24, y: 30 },
  { id: 3, nome: 'Unidade 03', cidade: 'Cuiabá', bairro: 'CPA', end: 'Avenida exemplo, 1400', abre: 8, fecha: 23, tel: '6530000103', x: 18, y: 58 },
  { id: 4, nome: 'Unidade 04', cidade: 'Cuiabá', bairro: 'Morada da Serra', end: 'Rua exemplo, 80', abre: 7, fecha: 21, tel: '6530000104', x: 42, y: 24 },
  { id: 5, nome: 'Unidade 05', cidade: 'Cuiabá', bairro: 'Jardim Imperial', end: 'Rua exemplo, 320', abre: 6, fecha: 22, tel: '6530000105', x: 16, y: 40 },
  { id: 6, nome: 'Unidade 06', cidade: 'Cuiabá', bairro: 'Pedra 90', end: 'Avenida exemplo, 900', abre: 8, fecha: 22, tel: '6530000106', x: 30, y: 70 },
  { id: 7, nome: 'Unidade 07', cidade: 'Cuiabá', bairro: 'Jardim das Américas', end: 'Rua exemplo, 55', abre: 7, fecha: 22, tel: '6530000107', x: 46, y: 62 },
  { id: 8, nome: 'Unidade 08', cidade: 'Cuiabá', bairro: 'Goiabeiras', end: 'Avenida exemplo, 2100', abre: 8, fecha: 24, tel: '6530000108', x: 38, y: 80 },
  { id: 9, nome: 'Unidade 09', cidade: 'Cuiabá', bairro: 'Porto', end: 'Rua exemplo, 12', abre: 7, fecha: 21, tel: '6530000109', x: 50, y: 38 },
  { id: 10, nome: 'Unidade 10', cidade: 'Cuiabá', bairro: 'Bosque da Saúde', end: 'Rua exemplo, 640', abre: 8, fecha: 22, tel: '6530000110', x: 22, y: 18 },
  { id: 11, nome: 'Unidade 11', cidade: 'Cuiabá', bairro: 'Despraiado', end: 'Avenida exemplo, 300', abre: 7, fecha: 22, tel: '6530000111', x: 12, y: 72 },
  { id: 12, nome: 'Unidade 12', cidade: 'Várzea Grande', bairro: 'Centro', end: 'Avenida exemplo, 150', abre: 7, fecha: 22, tel: '6530000112', x: 70, y: 48 },
  { id: 13, nome: 'Unidade 13', cidade: 'Várzea Grande', bairro: 'Cristo Rei', end: 'Rua exemplo, 430', abre: 8, fecha: 22, tel: '6530000113', x: 78, y: 34 },
  { id: 14, nome: 'Unidade 14', cidade: 'Várzea Grande', bairro: 'Mapim', end: 'Rua exemplo, 88', abre: 7, fecha: 21, tel: '6530000114', x: 74, y: 64 },
  { id: 15, nome: 'Unidade 15', cidade: 'Várzea Grande', bairro: 'Jardim Glória', end: 'Avenida exemplo, 770', abre: 8, fecha: 23, tel: '6530000115', x: 86, y: 50 },
  { id: 16, nome: 'Unidade 16', cidade: 'Várzea Grande', bairro: 'Costa Verde', end: 'Rua exemplo, 19', abre: 8, fecha: 24, tel: '6530000116', x: 82, y: 74 },
  { id: 17, nome: 'Unidade 17', cidade: 'Várzea Grande', bairro: 'Água Limpa', end: 'Avenida exemplo, 510', abre: 7, fecha: 22, tel: '6530000117', x: 66, y: 26 },
]

export function lojaById(id) {
  return LOJAS.find((loja) => loja.id === Number(id))
}
