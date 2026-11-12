import { formatPhone, horario, mapsLink } from '../domain/hours.js'
import { esc } from '../lib/format.js'

export function storeCard(loja) {
  return `<article class="loja">
    <h2>${esc(loja.nome)}</h2>
    <p><b>Cidade:</b> ${esc(loja.cidade)} (exemplo)</p>
    <p><b>Endereço:</b> ${esc(loja.end)}, ${esc(loja.bairro)}</p>
    <p><b>Horário:</b> ${horario(loja)}</p>
    <p><b>Telefone:</b> ${formatPhone(loja.tel)}</p>
    <a class="btn btn-red" href="${mapsLink(loja)}" target="_blank" rel="noopener">Abrir no Google Maps</a>
  </article>`
}
