import { formatPhone, horario } from '../domain/hours.js'
import { esc } from '../lib/format.js'

export function storeCard(loja) {
  return `<article class="loja">
    <h2>${esc(loja.nome)}</h2>
    <p><b>Cidade:</b> ${esc(loja.cidade)} (exemplo)</p>
    <p><b>Endereço:</b> ${esc(loja.end)}, ${esc(loja.bairro)}</p>
    <p><b>Horário:</b> ${horario(loja)}</p>
    <p><b>Telefone:</b> ${formatPhone(loja.tel)}</p>
    <div class="loja-acoes">
      <button class="btn btn-red" type="button" data-act="rota" data-id="${loja.id}">Como chegar</button>
      <button class="btn btn-line" type="button" data-act="ligar" data-digits="${loja.tel}" data-label="${formatPhone(loja.tel)}">Ligar ${formatPhone(loja.tel)}</button>
    </div>
  </article>`
}
