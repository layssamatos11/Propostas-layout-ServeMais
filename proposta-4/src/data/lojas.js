const base = [
  ['Unidade 01', 'Cuiabá', 'Centro', 'Rua exemplo, 100', 7, 22, 8, 18, '6530000101', 34, 46],
  ['Unidade 02', 'Cuiabá', 'Santa Rosa', 'Avenida exemplo, 250', 7, 22, 8, 18, '6530000102', 24, 30],
  ['Unidade 03', 'Cuiabá', 'CPA', 'Avenida exemplo, 1400', 8, 23, 8, 20, '6530000103', 18, 58],
  ['Unidade 04', 'Cuiabá', 'Morada da Serra', 'Rua exemplo, 80', 7, 21, 8, 14, '6530000104', 42, 24],
  ['Unidade 05', 'Cuiabá', 'Jardim Imperial', 'Rua exemplo, 320', 6, 22, 7, 18, '6530000105', 16, 40],
  ['Unidade 06', 'Cuiabá', 'Pedra 90', 'Avenida exemplo, 900', 8, 22, 8, 18, '6530000106', 30, 70],
  ['Unidade 07', 'Cuiabá', 'Jardim das Américas', 'Rua exemplo, 55', 7, 22, 8, 18, '6530000107', 46, 62],
  ['Unidade 08', 'Cuiabá', 'Goiabeiras', 'Avenida exemplo, 2100', 8, 23, 8, 20, '6530000108', 38, 80],
  ['Unidade 09', 'Cuiabá', 'Porto', 'Rua exemplo, 12', 7, 21, 8, 13, '6530000109', 50, 38],
  ['Unidade 10', 'Cuiabá', 'Bosque da Saúde', 'Rua exemplo, 640', 8, 22, 8, 18, '6530000110', 22, 18],
  ['Unidade 11', 'Cuiabá', 'Despraiado', 'Avenida exemplo, 300', 7, 22, 8, 18, '6530000111', 12, 72],
  ['Unidade 12', 'Várzea Grande', 'Centro', 'Avenida exemplo, 150', 7, 22, 8, 18, '6530000112', 70, 48],
  ['Unidade 13', 'Várzea Grande', 'Cristo Rei', 'Rua exemplo, 430', 8, 22, 8, 18, '6530000113', 78, 34],
  ['Unidade 14', 'Várzea Grande', 'Mapim', 'Rua exemplo, 88', 7, 21, 8, 14, '6530000114', 74, 64],
  ['Unidade 15', 'Várzea Grande', 'Jardim Glória', 'Avenida exemplo, 770', 8, 23, 8, 20, '6530000115', 86, 50],
  ['Unidade 16', 'Várzea Grande', 'Costa Verde', 'Rua exemplo, 19', 8, 23, 8, 20, '6530000116', 82, 74],
  ['Unidade 17', 'Várzea Grande', 'Água Limpa', 'Avenida exemplo, 510', 7, 22, 8, 18, '6530000117', 66, 26],
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
  x: row[9],
  y: row[10],
}))

export function lojaById(id) {
  return LOJAS.find((loja) => loja.id === Number(id))
}
