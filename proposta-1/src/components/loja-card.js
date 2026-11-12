import { LOJAS } from '../data/lojas.js'
import { formatPhone, hourLabel, storeStatus } from '../domain/hours.js'
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
      <button class="btn btn-r" type="button" data-act="rota" data-id="${loja.id}">Como chegar</button>
      <button class="btn btn-line" type="button" data-act="ligar" data-digits="${loja.tel}" data-label="${formatPhone(loja.tel)}">Ligar ${formatPhone(loja.tel)}</button>
      <a class="btn btn-y" href="#ofertas" data-act="usar-loja" data-id="${loja.id}">Ver preços</a>
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
