const PATHS = {
  horti: '<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z"/>',
  carne: '<path d="M5 14c2 4 6 6 10 5 3-1 4-4 3-6-2 1-4 0-5-2 2-1 2-4 0-5-4 0-8 3-8 8z"/><circle cx="16" cy="8" r="1.2" fill="#fff" stroke="none"/>',
  cesta: '<path d="M4 9h16l-1.4 9.2A2 2 0 0 1 16.6 20H7.4a2 2 0 0 1-2-1.8L4 9z"/><path d="M8 9l1.5-4h5L16 9"/>',
  frio: '<path d="M12 3v18M5 7l14 10M19 7L5 17"/>',
  copo: '<path d="M7 3h10l-1 8a4 4 0 0 1-8 0L7 3z"/><path d="M12 15v4M9 21h6"/>',
  brilho: '<path d="M12 3l1.2 4.2L17 8.5l-3.8 1.3L12 14l-1.2-4.2L7 8.5l3.8-1.3L12 3zM18 14l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2z"/>',
  sacola: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/>',
}

export function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${PATHS[name] || PATHS.cesta}</svg>`
}
