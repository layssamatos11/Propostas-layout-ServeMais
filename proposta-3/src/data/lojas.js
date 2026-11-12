const base = [
  ['Unidade 1', 'Cuiabá', 'Centro', 'Rua exemplo, 100', 7, 22, 8, 18, '6530000101'],
  ['Unidade 2', 'Cuiabá', 'Santa Rosa', 'Avenida exemplo, 250', 7, 22, 8, 18, '6530000102'],
  ['Unidade 3', 'Cuiabá', 'CPA', 'Avenida exemplo, 1400', 8, 23, 8, 20, '6530000103'],
  ['Unidade 4', 'Cuiabá', 'Morada da Serra', 'Rua exemplo, 80', 7, 21, 8, 14, '6530000104'],
  ['Unidade 5', 'Cuiabá', 'Jardim Imperial', 'Rua exemplo, 320', 6, 22, 7, 18, '6530000105'],
  ['Unidade 6', 'Cuiabá', 'Pedra 90', 'Avenida exemplo, 900', 8, 22, 8, 18, '6530000106'],
  ['Unidade 7', 'Cuiabá', 'Jardim das Américas', 'Rua exemplo, 55', 7, 22, 8, 18, '6530000107'],
  ['Unidade 8', 'Cuiabá', 'Goiabeiras', 'Avenida exemplo, 2100', 8, 23, 8, 20, '6530000108'],
  ['Unidade 9', 'Cuiabá', 'Porto', 'Rua exemplo, 12', 7, 21, 8, 13, '6530000109'],
  ['Unidade 10', 'Cuiabá', 'Bosque da Saúde', 'Rua exemplo, 640', 8, 22, 8, 18, '6530000110'],
  ['Unidade 11', 'Cuiabá', 'Despraiado', 'Avenida exemplo, 300', 7, 22, 8, 18, '6530000111'],
  ['Unidade 12', 'Várzea Grande', 'Centro', 'Avenida exemplo, 150', 7, 22, 8, 18, '6530000112'],
  ['Unidade 13', 'Várzea Grande', 'Cristo Rei', 'Rua exemplo, 430', 8, 22, 8, 18, '6530000113'],
  ['Unidade 14', 'Várzea Grande', 'Mapim', 'Rua exemplo, 88', 7, 21, 8, 14, '6530000114'],
  ['Unidade 15', 'Várzea Grande', 'Jardim Glória', 'Avenida exemplo, 770', 8, 23, 8, 20, '6530000115'],
  ['Unidade 16', 'Várzea Grande', 'Costa Verde', 'Rua exemplo, 19', 8, 23, 8, 20, '6530000116'],
  ['Unidade 17', 'Várzea Grande', 'Água Limpa', 'Avenida exemplo, 510', 7, 22, 8, 18, '6530000117'],
]

export const LOJAS = base.map((row, index) => ({
  id: index + 1,
  nome: row[0],
  cidade: row[1],
  bairro: row[2],
  end: row[3],
  abre: row[4],
  fecha: row[5],
  domAbre: row[6],
  domFecha: row[7],
  tel: row[8],
}))

export function lojaById(id) {
  return LOJAS.find((loja) => loja.id === Number(id))
}
