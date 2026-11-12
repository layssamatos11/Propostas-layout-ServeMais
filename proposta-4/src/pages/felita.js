import { ITENS, LINHAS, MOMENTOS, PERGUNTAS, itemById, momentoById, sugestoes } from '../data/felita.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

function cenaHtml() {
  const momento = momentoById(state.momento)
  const pontos = momento.pontos.map((ponto) => {
    const item = itemById(ponto.item)
    return `<button class="hot" type="button" style="left:${ponto.x}%;top:${ponto.y}%" data-act="hotspot" data-item="${esc(ponto.item)}" aria-label="Ver ${esc(item?.nome || 'produto')}">+</button>`
  }).join('')
  const lista = momento.pontos.map((ponto) => {
    const item = itemById(ponto.item)
    if (!item) return ''
    const acao = item.oferta
      ? `<a href="#ofertas/felita">Ver na oferta</a>`
      : '<span>Oferta da semana a definir</span>'
    return `<li><strong>${esc(item.nome)}</strong>${acao}</li>`
  }).join('')
  return `<div class="cena${momento.escuro ? ' cena-escura' : ''}">
      <div class="cena-foto" style="background:${momento.cor}">
        <p>${esc(momento.foto)}</p>
        ${pontos}
      </div>
      <div class="cena-copy">
        <p class="olho">Capítulo · ${esc(momento.nome)}</p>
        <h3>${esc(momento.titulo)}</h3>
        <p>${esc(momento.texto)}</p>
        <ul class="cena-itens">${lista}</ul>
      </div>
    </div>`
}

function linhaHtml() {
  const itens = ITENS.filter((item) => item.linha === state.linha)
  return itens.map((item) => `<button class="flip" type="button" data-act="flip" aria-pressed="false" data-frente="${esc(item.nome)}" data-verso="${esc(item.historia)}" aria-label="${esc(item.nome)}">
      <span class="flip-in">
        <span class="face"><strong>Felitá</strong><em>${esc(item.nome)}</em><small>Toque para ler a história</small></span>
        <span class="back">${esc(item.historia)}</span>
      </span>
    </button>`).join('')
}

export function quizHtml() {
  if (state.quizStep >= PERGUNTAS.length) {
    const { frase, itens } = sugestoes(state.quizAns)
    const nomes = itens.map((item) => item.nome).join(' e ')
    const share = `https://wa.me/?text=${encodeURIComponent(`Sugestão Felitá (exemplo): ${nomes}`)}`
    return `<p class="olho">Sugestão para você</p>
      <h3>${esc(frase)}</h3>
      <ul class="sugestoes">${itens.map((item) => `<li><strong>Felitá</strong><span>${esc(item.nome)}</span></li>`).join('')}</ul>
      <p class="acoes">
        <a class="btn btn-yellow" href="${share}" target="_blank" rel="noopener">Compartilhar no WhatsApp</a>
        <a class="btn btn-red" href="#ofertas/felita">Veja a Felitá em oferta</a>
        <a class="btn btn-ghost" href="#lojas">Veja nossas lojas</a>
      </p>
      <button class="btn btn-ghost" type="button" data-act="quiz-reset">Refazer as perguntas</button>`
  }
  const atual = PERGUNTAS[state.quizStep]
  return `<p class="olho">Pergunta ${state.quizStep + 1} de ${PERGUNTAS.length}</p>
    <h3>${esc(atual.pergunta)}</h3>
    <div class="opcoes">
      ${atual.opcoes.map(([id, label]) => `<button type="button" data-act="quiz" data-op="${esc(id)}">${esc(label)}</button>`).join('')}
    </div>`
}

export function mountFelita() {
  const cena = document.getElementById('cena')
  if (!cena) return
  cena.innerHTML = cenaHtml()
  document.querySelectorAll('[data-act="momento"]').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.momento === state.momento ? 'true' : 'false')
  })
  const grade = document.getElementById('linhaGrade')
  if (grade) grade.innerHTML = linhaHtml()
  document.querySelectorAll('[data-act="linha"]').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.linha === state.linha ? 'true' : 'false')
  })
}

export function renderFelita() {
  const momentos = MOMENTOS.map((item) => {
    const pressed = state.momento === item.id ? 'true' : 'false'
    return `<button type="button" data-act="momento" data-momento="${item.id}" aria-pressed="${pressed}"><strong>${esc(item.nome)}</strong><span>${esc(item.linha)}</span></button>`
  }).join('')
  const linhas = LINHAS.map((item) => {
    const pressed = state.linha === item.id ? 'true' : 'false'
    const tinta = item.cor === '#FBB90E' ? '#1F1A17' : '#fff'
    return `<button type="button" data-act="linha" data-linha="${item.id}" aria-pressed="${pressed}"><span style="background:${item.cor};color:${tinta}">Felitá</span>${esc(item.nome)}</button>`
  }).join('')
  return `<section class="felita-hero">
      <div>
        <p class="marca-nota">Logomarca oficial Felitá a aplicar</p>
        <p class="script">Felitá</p>
        <h1 class="revela"><span>Em</span> <span>todos</span> <span>os</span> <span>momentos.</span></h1>
        <p class="lead">Ser Felitá é escolher todos os dias levar a felicidade pra sua casa, em cada produto, em cada momento.</p>
        <p class="acoes">
          <button class="btn btn-yellow" type="button" data-act="scroll" data-alvo="momentos">Escolha seu momento</button>
          <a class="btn btn-ghost" href="#ofertas/felita">Ver ofertas Felitá</a>
        </p>
      </div>
      <div class="foto foto-felita">
        <div class="flutua" aria-hidden="true"><span>Felitá</span><span>Felitá</span><span>Felitá</span></div>
        <p>Fotografia — família reunida à mesa no café da manhã, luz natural (a produzir)</p>
      </div>
    </section>
    <blockquote class="quote">
      <p>Sabemos que cada momento com a família é importante.</p>
      <p>Por isso é essencial ter um aliado para trazer mais qualidade em cada uma dessas horas.</p>
    </blockquote>
    <section id="momentos">
      <h2>Escolha seu momento</h2>
      <p>Cada momento da família é um capítulo. Toque para viver a história.</p>
      <div class="momentos" role="group" aria-label="Momentos do dia">${momentos}</div>
      <div id="cena">${cenaHtml()}</div>
    </section>
    <section id="familia">
      <h2>A família Felitá</h2>
      <p>Cinco linhas, uma mesma promessa: escolher a felicidade.</p>
      <div class="linhas" role="group" aria-label="Linhas Felitá">${linhas}</div>
      <div class="flip-grid" id="linhaGrade">${linhaHtml()}</div>
    </section>
    <section class="quiz-sec">
      <div>
        <h2>Qual Felitá combina com o seu momento?</h2>
        <p>3 perguntas rápidas e sugestões na hora (exemplo de fluxo).</p>
        <div id="quizBox">${quizHtml()}</div>
      </div>
    </section>
    <section class="porque">
      <div>
        <h2>Por que escolher a Felitá?</h2>
        <p>Nós queremos estar presente nos momentos que mais importam: os momentos em família. Buscamos sempre a confiança, o sabor e a qualidade, sem complicação, do dia a dia às ocasiões especiais. Felitá é mais do que escolha, é parte da sua vida.</p>
      </div>
      <p class="acoes">
        <a class="btn btn-red" href="#ofertas/felita">Veja a Felitá em oferta</a>
        <a class="btn btn-ghost" href="#lojas">Veja nossas lojas</a>
      </p>
    </section>`
}
