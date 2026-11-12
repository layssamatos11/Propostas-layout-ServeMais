import { esc } from '../lib/format.js'
import { renderLista } from './shopping-list.js'

let lastFocus = null

function anyOverlayOpen() {
  return !document.getElementById('menu').hidden
    || !document.getElementById('lista').hidden
    || !document.getElementById('dialog').hidden
}

export function syncScrollLock() {
  document.body.classList.toggle('lock', anyOverlayOpen())
}

function rememberFocus() {
  lastFocus = document.activeElement
}

function restoreFocus() {
  if (lastFocus) lastFocus.focus()
}

export function openLista() {
  rememberFocus()
  document.getElementById('listaBack').hidden = false
  document.getElementById('lista').hidden = false
  renderLista()
  syncScrollLock()
  document.querySelector('#lista .x').focus()
}

export function closeLista() {
  document.getElementById('lista').hidden = true
  document.getElementById('listaBack').hidden = true
  syncScrollLock()
  restoreFocus()
}

export function openMenu() {
  rememberFocus()
  document.getElementById('menu').hidden = false
  syncScrollLock()
  document.querySelector('#menu .x').focus()
}

export function closeMenu() {
  document.getElementById('menu').hidden = true
  syncScrollLock()
  restoreFocus()
}

export function openDialog(title, html) {
  rememberFocus()
  document.getElementById('dlgBody').innerHTML = `<h2 id="dlgTitle">${esc(title)}</h2><div class="mt-10">${html}</div>`
  document.getElementById('dialog').hidden = false
  syncScrollLock()
  document.querySelector('#dialog .x').focus()
}

export function closeDialog() {
  document.getElementById('dialog').hidden = true
  syncScrollLock()
  restoreFocus()
}
