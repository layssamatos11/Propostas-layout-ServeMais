import { esc } from '../lib/format.js'
import { formatPhone, horario, storeStatus } from '../domain/hours.js'

export function storeCard(loja, on) {
  const status = storeStatus(loja)
  return `<article class="loja${on ? ' on' : ''}" data-act="loja" data-id="${loja.id}">
    <span class="loja-num">${loja.id}</span>
    <div>
      <h2>${esc(loja.nome)} (exemplo)</h2>
      <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
      <p>${esc(horario(loja))}</p>
      <p class="${status.on ? 'aberto' : 'fechado'}">${esc(status.txt)}</p>
      <p class="loja-acoes">
        <button class="btn btn-red" type="button" data-act="rota" data-id="${loja.id}">Como chegar</button>
        <button class="btn btn-ghost" type="button" data-act="ligar" data-digits="${loja.tel}" data-label="${formatPhone(loja.tel)}">Ligar ${esc(formatPhone(loja.tel))}</button>
      </p>
    </div>
  </article>`
}

export function storeRow(loja) {
  return `<article class="loja loja-row">
    <span class="loja-num">${loja.id}</span>
    <div>
      <h3>${esc(loja.nome)} (exemplo)</h3>
      <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(horario(loja))}</p>
    </div>
    <button class="btn btn-ghost" type="button" data-act="rota" data-id="${loja.id}">Como chegar</button>
  </article>`
}
