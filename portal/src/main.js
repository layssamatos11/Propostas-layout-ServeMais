import './main.css'
import { PROPOSTAS } from './proposals.js'

const grade = document.getElementById('propostas')

function endereco(porta) {
  return `${location.protocol}//${location.hostname}:${porta}/`
}

grade.innerHTML = PROPOSTAS.map((item) => {
  const numero = String(item.id).padStart(2, '0')
  return `<li>
    <a class="card" href="${endereco(item.porta)}" data-porta="${item.porta}">
      <div class="palco" aria-hidden="true">
        <div class="browser">
          <div class="chrome">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="url">proposta ${numero}</span>
          </div>
          ${item.stage}
        </div>
      </div>
      <div class="corpo">
        <div class="meta">
          <span class="num">${numero}</span>
          <span class="estado" data-estado aria-live="polite"><i aria-hidden="true"></i> Verificando</span>
        </div>
        <h2>${item.nome}</h2>
        <p class="linha">${item.linha}</p>
        <p class="texto">${item.texto}</p>
        <p class="recorte">${item.recorte}</p>
        <span class="rodape">
          <span class="go">Abrir esta proposta <span aria-hidden="true">→</span></span>
          <span class="porta">porta ${item.porta}</span>
        </span>
        <p class="nota" hidden>O servidor desta porta não respondeu. O link continua válido.</p>
      </div>
    </a>
  </li>`
}).join('')

async function viva(url) {
  const controle = new AbortController()
  const timer = setTimeout(() => controle.abort(), 2500)
  try {
    await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: controle.signal })
    return true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

PROPOSTAS.forEach(async (item) => {
  const card = grade.querySelector(`[data-porta="${item.porta}"]`)
  const estado = card.querySelector('.estado')
  const nota = card.querySelector('.nota')
  const noAr = await viva(endereco(item.porta))
  estado.lastChild.textContent = noAr ? ' Pronta para abrir' : ' Servidor parado'
  estado.dataset.on = noAr ? 'sim' : 'nao'
  nota.hidden = noAr
})
