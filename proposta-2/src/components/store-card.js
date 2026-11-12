import { formatPhone, hourLabel, mapsLink, storeStatus, whatsappLink } from '../domain/hours.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function storeRow(loja) {
  const status = storeStatus(loja)
  const on = state.pin === loja.id ? ' is-on' : ''
  return `<article class="loja-row${on}" data-id="${loja.id}">
    <button class="loja-hit" type="button" data-act="pin" data-id="${loja.id}">
      <span class="num">${loja.id}</span>
      <span>
        <strong>${esc(loja.nome)} (exemplo)</strong>
        <small>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</small>
        <em class="${status.on ? 'on' : 'off'}">${status.txt}</em>
      </span>
    </button>
  </article>`
}

export function storeDetail(loja) {
  const status = storeStatus(loja)
  const services = loja.servicos.map((item) => `<span>${esc(item)}</span>`).join('')
  const hello = `Olá, quero falar com a ${loja.nome} (exemplo).`
  return `<article class="loja-detail">
    <p class="kicker">${esc(loja.cidade)}</p>
    <h2>${esc(loja.nome)} (exemplo)</h2>
    <p class="status ${status.on ? 'on' : 'off'}">${status.txt}</p>
    <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
    <dl>
      <div><dt>Seg a sáb</dt><dd>${hourLabel(loja.abre)} às ${hourLabel(loja.fecha)}</dd></div>
      <div><dt>Dom e feriados</dt><dd>${hourLabel(loja.domAbre)} às ${hourLabel(loja.domFecha)}</dd></div>
    </dl>
    <div class="btn-row">
      <a class="btn btn-red" href="${mapsLink(loja)}" target="_blank" rel="noopener">Como chegar</a>
      <button class="btn btn-line" type="button" data-act="ligar" data-tel="${formatPhone(loja.tel)}">Ligar</button>
      <a class="btn btn-yellow" href="${whatsappLink(hello)}" target="_blank" rel="noopener">WhatsApp</a>
    </div>
    <p class="servicos">${services} <small>(exemplos)</small></p>
  </article>`
}
