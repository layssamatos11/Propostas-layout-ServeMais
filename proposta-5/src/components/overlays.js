import { esc } from '../lib/format.js'

let lastFocus = null

export function openMenu() {
  lastFocus = document.activeElement
  document.getElementById('menu').hidden = false
  document.body.classList.add('lock')
  document.querySelector('.burger')?.setAttribute('aria-expanded', 'true')
  document.querySelector('#menu .x')?.focus()
}

export function closeMenu() {
  const menu = document.getElementById('menu')
  if (!menu || menu.hidden) return
  menu.hidden = true
  document.body.classList.remove('lock')
  document.querySelector('.burger')?.setAttribute('aria-expanded', 'false')
  if (lastFocus?.focus) lastFocus.focus()
}

export function openDialog(title, html) {
  lastFocus = document.activeElement
  document.getElementById('dlgBody').innerHTML = `<h2 id="dlgTitle">${esc(title)}</h2><div class="dlg-copy">${html}</div>`
  document.getElementById('dialog').hidden = false
  document.body.classList.add('lock')
  document.querySelector('#dialog .x')?.focus()
}

export function closeDialog() {
  const dialog = document.getElementById('dialog')
  if (!dialog || dialog.hidden) return
  dialog.hidden = true
  if (document.getElementById('menu').hidden) document.body.classList.remove('lock')
  if (lastFocus?.focus) lastFocus.focus()
}
