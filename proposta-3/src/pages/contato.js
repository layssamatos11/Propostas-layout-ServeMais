import { ASSUNTOS, FAQ } from '../data/site.js'
import { esc } from '../lib/format.js'

export function contatoPage() {
  const options = ASSUNTOS.map((item) => `<option>${esc(item)}</option>`).join('')
  const faq = FAQ.map((item, index) => {
    return `<div class="faq">
      <button type="button" data-act="faq" aria-expanded="false" aria-controls="faq-${index}">${esc(item.q)}</button>
      <div id="faq-${index}" hidden><p>${esc(item.a)}</p></div>
    </div>`
  }).join('')
  return `<section class="hero-contato">
    <div class="wrap">
      <h1>Fale com a gente.</h1>
      <p>Dúvida, sugestão ou elogio? Escolha o canal mais fácil para você.</p>
    </div>
  </section>
  <section class="wrap canais">
    <button class="canal" type="button" data-act="canal" data-canal="telefone"><b>Telefone</b><span>[a informar]</span></button>
    <button class="canal" type="button" data-act="canal" data-canal="email"><b>E-mail</b><span>[a informar]</span></button>
    <button class="canal" type="button" data-act="canal" data-canal="redes"><b>Redes sociais</b><span>Instagram, Facebook, TikTok e LinkedIn: perfis oficiais a informar</span></button>
  </section>
  <section class="wrap contact-layout">
    <form class="card" id="contatoForm" novalidate>
      <h2>Envie uma mensagem</h2>
      <label>Nome<input name="nome" autocomplete="name" required></label>
      <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
      <label>Assunto<select name="assunto">${options}</select></label>
      <label>Mensagem<textarea name="mensagem" required></textarea></label>
      <p class="err" id="contatoErr"></p>
      <button class="btn btn-red" type="submit">Enviar mensagem</button>
      <p id="contatoOk" role="status"></p>
    </form>
    <aside>
      <h2>Perguntas frequentes</h2>
      ${faq}
    </aside>
  </section>`
}

export function mountContato() {}

export function validateContato(form) {
  if (form.nome.value.trim().length < 2) return 'Digite seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return 'Digite um e-mail válido.'
  if (form.mensagem.value.trim().length < 10) return 'Conte um pouco mais (mínimo de 10 letras).'
  return ''
}
