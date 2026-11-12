import { LOJAS } from '../data/lojas.js'
import { formatPhone, hourLabel, mapsLink, storeStatus } from '../domain/hours.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function lojaCard(loja) {
  const status = storeStatus(loja)
  const selected = state.loja === loja.id
  const pinned = state.pin === loja.id

  return `<article class="loja${pinned ? ' is-on' : ''}" id="loja-${loja.id}" data-id="${loja.id}">
    <div class="loja-top">
      <span class="num">${loja.id}</span>
      <div>
        <h3>${esc(loja.nome)} (exemplo)</h3>
        <p>${esc(loja.end)} · ${esc(loja.bairro)} · ${esc(loja.cidade)}</p>
        <p>Horário: ${hourLabel(loja.abre)} às ${hourLabel(loja.fecha)} (exemplo)</p>
        <p class="loja-status">
          <span class="pill ${status.on ? 'on' : 'off'}">${status.txt}</span>
          ${selected ? ' <span class="pill you">Sua unidade</span>' : ''}
        </p>
      </div>
    </div>
    <div class="loja-actions">
      <a class="btn btn-r" href="${mapsLink(loja)}" target="_blank" rel="noopener">Como chegar</a>
      <button class="btn btn-line" type="button" data-act="ligar" data-tel="${formatPhone(loja.tel)}">Ligar</button>
      <button class="btn btn-y" type="button" data-act="usar-loja" data-id="${loja.id}">${selected ? 'Preços desta unidade' : 'Ver preços'}</button>
    </div>
  </article>`
}

export function unitSelect() {
  const options = LOJAS.map((loja) => {
    const selected = state.loja === loja.id ? ' selected' : ''
    return `<option value="${loja.id}"${selected}>${esc(loja.nome)} · ${esc(loja.bairro)}</option>`
  }).join('')

  return `<select id="unidade" aria-label="Unidade para preços locais">
    <option value=""${state.loja ? '' : ' selected'}>Todas as unidades</option>
    ${options}
  </select>`
}
