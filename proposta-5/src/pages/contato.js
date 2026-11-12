import { LOJAS } from '../data/lojas.js'
import { ASSUNTOS, FAQ, SITE } from '../data/site.js'
import { emailOk, esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function renderContato() {
  return `<header class="page-head">
    <h1>Fale com a gente.</h1>
    <p class="lead">Dúvidas, sugestões ou elogios? Escolha o canal mais fácil para você.</p>
  </header>
  <div class="canais">
    <button type="button" data-act="zap"><b>WhatsApp</b><span>Resposta rápida (exemplo)</span></button>
    <a href="tel:${SITE.sacTel}"><b>SAC</b><span>${SITE.sac}</span></a>
    <button type="button" data-act="email-exemplo"><b>E-mail</b><span>${SITE.emailExemplo} (exemplo)</span></button>
    <a href="#contato" data-act="scroll" data-alvo="formulario"><b>Formulário</b><span>Abaixo, em 1 minuto</span></a>
  </div>
  <div class="contato-layout">
    <form id="contatoForm" class="card" novalidate>
      <h2 id="formulario">Mande sua mensagem</h2>
      <div class="chips" role="group" aria-label="Assunto">
        ${ASSUNTOS.map((item) => `<button class="chip" type="button" data-act="assunto" data-assunto="${esc(item)}" aria-pressed="${item === state.assunto}">${esc(item)}</button>`).join('')}
      </div>
      <div class="form-grid">
        <label>Nome completo<input name="nome" autocomplete="name" required></label>
        <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
        <label>Telefone / WhatsApp<input name="fone" type="tel" inputmode="tel" autocomplete="tel" required></label>
        <label>Unidade de interesse
          <select name="unidade">
            <option value="">Ainda não sei</option>
            ${LOJAS.map((loja) => `<option value="${loja.id}">${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')}
          </select>
        </label>
        <label class="full">Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
      </div>
      <label class="check"><input name="aceite" type="checkbox"> Li e aceito a <a href="#privacidade">política de privacidade</a>.</label>
      <button class="btn btn-red" type="submit">Enviar mensagem</button>
      <p id="contatoErr" class="err" role="alert"></p>
      <p id="contatoOk" role="status"></p>
    </form>
    <aside>
      <h2>Perguntas frequentes</h2>
      ${FAQ.map((item, index) => `<div class="faq">
        <button type="button" data-act="faq" aria-expanded="${index === 0}" aria-controls="faq-${index}">${esc(item.q)}</button>
        <div id="faq-${index}" ${index === 0 ? '' : 'hidden'}><p>${esc(item.a)}</p></div>
      </div>`).join('')}
      <a class="btn btn-line" href="#lojas">Ver todas as lojas</a>
    </aside>
  </div>`
}

export function mountContato() {}

export function validateContato(form) {
  if (form.nome.value.trim().length < 2) return 'Digite seu nome.'
  if (!emailOk(form.email.value)) return 'Digite um e-mail válido.'
  if (form.fone.value.replace(/\D/g, '').length < 10) return 'Digite um telefone com DDD.'
  if (form.mensagem.value.trim().length < 10) return 'Escreva uma mensagem com pelo menos 10 caracteres.'
  if (!form.aceite.checked) return 'Aceite a política de privacidade para continuar.'
  return ''
}
