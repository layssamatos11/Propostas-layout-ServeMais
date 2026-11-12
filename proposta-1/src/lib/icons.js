const PATHS = {
  horti: (color) => `<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" fill="${color}"/>`,
  carne: (color) => `<path d="M5 14c2 4 6 6 10 5 3-1 4-4 3-6-2 1-4 0-5-2 2-1 2-4 0-5-4 0-8 3-8 8z" fill="${color}"/><circle cx="16" cy="8" r="1.2" fill="#fff"/>`,
  cesta: (color) => `<path d="M4 9h16l-1.4 9.2A2 2 0 0 1 16.6 20H7.4a2 2 0 0 1-2-1.8L4 9z" fill="none" stroke="${color}" stroke-width="1.8"/><path d="M8 9l1.5-4h5L16 9" fill="none" stroke="${color}" stroke-width="1.8"/>`,
  frio: (color) => `<path d="M12 3v18M5 7l14 10M19 7L5 17" stroke="${color}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
  copo: (color) => `<path d="M7 3h10l-1 8a4 4 0 0 1-8 0L7 3z" fill="none" stroke="${color}" stroke-width="1.8"/><path d="M12 15v4M9 21h6" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`,
  brilho: (color) => `<path d="M12 3l1.2 4.2L17 8.5l-3.8 1.3L12 14l-1.2-4.2L7 8.5l3.8-1.3L12 3zM18 14l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2z" fill="${color}"/>`,
  sacola: (color) => `<path d="M6 8h12l-1 12H7L6 8z" fill="none" stroke="${color}" stroke-width="1.8"/><path d="M9 8V7a3 3 0 0 1 6 0v1" fill="none" stroke="${color}" stroke-width="1.8"/>`,
}

export function icon(name, color = 'currentColor') {
  const draw = PATHS[name] || PATHS.cesta
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${draw(color)}</svg>`
}
