import { esc } from '../lib/format.js'
import { formatPhone, horario, mapsLink, storeStatus } from '../domain/hours.js'

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
        <a class="btn btn-red" href="${mapsLink(loja)}" target="_blank" rel="noopener">Como chegar</a>
        <a class="btn btn-ghost" href="tel:+55${loja.tel}">Ligar ${esc(formatPhone(loja.tel))}</a>
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
    <a class="btn btn-ghost" href="${mapsLink(loja)}" target="_blank" rel="noopener">Como chegar</a>
  </article>`
}
