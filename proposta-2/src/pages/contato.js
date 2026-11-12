import { LOJAS } from '../data/lojas.js'
import { FAQ, SITE } from '../data/site.js'
import { esc } from '../lib/format.js'
import { whatsappLink } from '../domain/hours.js'
import { state } from '../state/store.js'

const ASSUNTOS = ['Dúvida', 'Sugestão', 'Elogio', 'Reclamação']

export function contatoPage() {
  const chips = ASSUNTOS.map((item) => {
    const on = state.assunto === item ? ' aria-pressed="true"' : ' aria-pressed="false"'
    return `<button type="button" data-act="assunto" data-assunto="${item}"${on}>${item}</button>`
  }).join('')
  const units = LOJAS.map((loja) => `<option>${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
  const faq = FAQ.map((item, index) => {
    return `<div class="faq">
      <button type="button" data-act="faq" aria-expanded="false" aria-controls="faq-${index}" id="faq-btn-${index}">${esc(item.q)}</button>
      <div id="faq-${index}" hidden><p>${esc(item.a)}</p></div>
    </div>`
  }).join('')
  return `<section class="wrap page-head">
    <h1>Fale com a gente.</h1>
    <p>Dúvidas, sugestões ou elogios? Escolha o canal mais fácil para você.</p>
    <div class="canais">
      <a class="canal" href="${whatsappLink('Olá, vim pelo site da Rede Serve Mais (exemplo).')}" target="_blank" rel="noopener"><b>WhatsApp</b><span>Resposta rápida (exemplo)</span></a>
      <a class="canal" href="tel:${SITE.sacTel}"><b>SAC</b><span>${SITE.sac}</span></a>
      <a class="canal" href="mailto:${SITE.email}"><b>E-mail</b><span>${SITE.email}</span></a>
      <a class="canal" href="#formulario"><b>Formulário</b><span>Abaixo, em 1 minuto</span></a>
    </div>
  </section>
  <section class="wrap contact-layout" id="formulario">
    <form class="card" id="contatoForm" novalidate>
      <h2>Mande sua mensagem</h2>
      <div class="chips">${chips}</div>
      <div class="form-grid">
        <label>Nome completo<input id="nome" name="nome" autocomplete="name" required></label>
        <label>E-mail<input id="email" name="email" type="email" autocomplete="email" required></label>
        <label>Telefone / WhatsApp<input id="fone" name="fone" inputmode="tel" autocomplete="tel"></label>
        <label>Unidade de interesse<select id="unid" name="unid"><option value="">Escolha (opcional)</option>${units}</select></label>
        <label class="full">Mensagem<textarea id="mensagem" name="mensagem" required></textarea></label>
      </div>
      <label class="check"><input id="aceite" name="aceite" type="checkbox"> Li e aceito a política de privacidade.</label>
      <button class="text-btn" type="button" data-act="politica" data-qual="privacidade">Ler a política</button>
      <p class="err" id="contatoErr"></p>
      <button class="btn btn-red" type="submit">Enviar mensagem</button>
      <p id="contatoOk" role="status"></p>
    </form>
    <aside>
      <h2>Perguntas frequentes</h2>
      ${faq}
      <a class="btn btn-line" href="#lojas">Ver todas as lojas</a>
    </aside>
  </section>`
}

export function mountContato() {}

export function validateContato(form) {
  if (form.nome.value.trim().length < 2) return 'Digite seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return 'Digite um e-mail válido.'
  if (form.mensagem.value.trim().length < 10) return 'Conte um pouco mais (mínimo de 10 letras).'
  if (!form.aceite.checked) return 'Aceite a política de privacidade para enviar.'
  return ''
}
