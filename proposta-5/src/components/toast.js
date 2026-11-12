let toastTimer

export function toast(message) {
  const node = document.getElementById('toast')
  node.textContent = message
  node.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => node.classList.remove('show'), 2800)
}
