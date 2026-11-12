import { LOJAS } from '../data/lojas.js'
import { CONTACT_SUBJECTS } from '../data/navigation.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'

export function contatoPage() {
  const units = LOJAS.map((loja) => `<option>${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
  const subjects = CONTACT_SUBJECTS.map((subject) => {
    const selected = state.assunto === subject ? ' selected' : ''
    return `<option${selected}>${subject}</option>`
  }).join('')

  return `<section class="wrap page-hero">
    <h1>Fale com a Serve Mais</h1>
    <div class="accent"></div>
    <p class="sub">Dúvidas, sugestões ou elogios? Respondemos o mais rápido possível.</p>
    <div class="contact mt-20">
      <form class="card" id="contatoForm" novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="nome">Nome completo</label>
            <input id="nome" name="nome" autocomplete="name" required>
            <p class="err" id="err-nome"></p>
          </div>
          <div class="field">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
            <p class="err" id="err-email"></p>
          </div>
          <div class="field">
            <label for="fone">Telefone / WhatsApp</label>
            <input id="fone" name="fone" inputmode="tel" autocomplete="tel">
          </div>
          <div class="field">
            <label for="unid">Unidade de interesse</label>
            <select id="unid" name="unid">
              <option value="">Escolha (opcional)</option>
              ${units}
            </select>
          </div>
          <div class="field full">
            <label for="assunto">Assunto</label>
            <select id="assunto" name="assunto" required>
              <option value="">Selecione</option>
              ${subjects}
            </select>
            <p class="err" id="err-assunto"></p>
          </div>
          <div class="field full">
            <label for="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" required></textarea>
            <p class="err" id="err-mensagem"></p>
          </div>
        </div>
        <p class="mt-8"><button class="btn btn-r" type="submit">Enviar mensagem</button></p>
        <p id="formOk" role="status"></p>
      </form>
      <div class="channels">
        <button class="channel ch-r" type="button" data-act="canal" data-assunto="Dúvida">
          <span><b>SAC</b><span>(65) 3000-0000 · sac@exemplo.com</span></span><i>→</i>
        </button>
        <button class="channel ch-y" type="button" data-act="ligar" data-tel="(65) 90000-0000">
          <span><b>WhatsApp</b><span>Número demonstrativo</span></span><i>→</i>
        </button>
        <button class="channel ch-w" type="button" data-act="canal" data-assunto="Trabalhe conosco">
          <span><b>Trabalhe conosco</b><span>Envie seu currículo</span></span><i>→</i>
        </button>
        <button class="channel ch-w" type="button" data-act="canal" data-assunto="Imprensa e parcerias">
          <span><b>Imprensa e parcerias</b><span>Contato comercial</span></span><i>→</i>
        </button>
      </div>
    </div>
  </section>`
}

export function mountContato() {
  if (!state.assunto) return
  const select = document.getElementById('assunto')
  if (select) select.value = state.assunto
}

const FIELDS = ['nome', 'email', 'assunto', 'mensagem']

export function handleContatoSubmit(event) {
  if (event.target.id !== 'contatoForm') return
  event.preventDefault()
  const form = event.target
  const errors = {}
  if (form.nome.value.trim().length < 2) errors.nome = 'Digite seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) errors.email = 'Digite um e-mail válido.'
  if (!form.assunto.value) errors.assunto = 'Escolha um assunto.'
  if (form.mensagem.value.trim().length < 10) errors.mensagem = 'Conte um pouco mais (mínimo de 10 letras).'

  FIELDS.forEach((key) => {
    const input = form[key]
    const message = document.getElementById(`err-${key}`)
    input.setAttribute('aria-invalid', errors[key] ? 'true' : 'false')
    if (message) message.textContent = errors[key] || ''
  })

  const ok = document.getElementById('formOk')
  if (Object.keys(errors).length) {
    ok.textContent = ''
    form.querySelector('[aria-invalid=true]').focus()
    return
  }
  ok.innerHTML = '<span class="success"><strong>Campos conferidos.</strong> Nesta proposta o envio ainda é demonstrativo: nenhuma mensagem saiu do seu navegador.</span>'
  form.reset()
  state.assunto = ''
}
