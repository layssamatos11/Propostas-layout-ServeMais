import { LOJAS } from '../data/lojas.js'
import { SITE } from '../data/site.js'
import { esc } from '../lib/format.js'

const ASSUNTOS = ['Dúvida', 'Sugestão', 'Elogio', 'Imprensa', 'Parceria']

export function validateContato(form) {
  const data = new FormData(form)
  const nome = String(data.get('nome') || '').trim()
  if (nome.length < 3) return 'Digite seu nome.'
  const email = String(data.get('email') || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Digite um e-mail válido.'
  const fone = String(data.get('fone') || '').replace(/\D/g, '')
  if (fone.length < 10) return 'Digite um telefone com DDD.'
  const msg = String(data.get('mensagem') || '').trim()
  if (msg.length < 10) return 'Escreva uma mensagem um pouco mais completa.'
  return ''
}

export function renderContato() {
  const unidades = LOJAS.map((loja) => `<option value="${loja.id}">${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
  return `<header class="page-head">
      <p class="olho">Contato</p>
      <h1>Fale com a Serve Mais</h1>
      <p class="lead">Dúvidas, sugestões ou elogios? Respondemos o mais rápido possível.</p>
    </header>
    <div class="split">
      <form id="contatoForm" novalidate>
        <div class="form-grid">
          <label>Nome completo<input name="nome" autocomplete="name" required></label>
          <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
          <label>Telefone / WhatsApp<input name="fone" type="tel" autocomplete="tel" inputmode="tel" required></label>
          <label>Unidade de interesse
            <select name="unidade">
              <option value="">Ainda não sei</option>
              ${unidades}
            </select>
          </label>
          <label class="full">Assunto
            <select name="assunto">
              ${ASSUNTOS.map((item) => `<option>${esc(item)}</option>`).join('')}
            </select>
          </label>
          <label class="full">Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
        </div>
        <p class="erro" id="contatoErr" role="alert"></p>
        <p class="ok" id="contatoOk" role="status"></p>
        <button class="btn btn-red" type="submit">Enviar mensagem</button>
      </form>
      <aside class="lado canais">
        <section>
          <h2>SAC</h2>
          <p>Telefone de exemplo publicado nesta proposta.</p>
          <a class="btn btn-red" href="tel:${SITE.sacTel}">${SITE.sac}</a>
          <p class="nota">E-mail: a informar</p>
        </section>
        <section>
          <h2>WhatsApp</h2>
          <p>Número demonstrativo. O canal oficial ainda será informado.</p>
          <button class="btn btn-yellow" type="button" data-act="zap">Abrir WhatsApp</button>
        </section>
        <section>
          <h2>Trabalhe conosco</h2>
          <a href="#trabalhe">Envie seu currículo</a>
        </section>
        <section>
          <h2>Imprensa e parcerias</h2>
          <p>Contato comercial pelo formulário, no assunto Imprensa ou Parceria.</p>
        </section>
      </aside>
    </div>`
}

export function mountContato() {}
