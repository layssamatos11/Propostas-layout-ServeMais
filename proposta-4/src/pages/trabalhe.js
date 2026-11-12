import { LOJAS } from '../data/lojas.js'
import { SITE } from '../data/site.js'
import { AREAS, CARGOS, MOTIVOS, PASSOS } from '../data/vagas.js'
import { esc } from '../lib/format.js'

export function validateJob(form) {
  const data = new FormData(form)
  const nome = String(data.get('nome') || '').trim()
  if (nome.length < 3) return 'Digite seu nome.'
  const email = String(data.get('email') || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Digite um e-mail válido.'
  const fone = String(data.get('fone') || '').replace(/\D/g, '')
  if (fone.length < 10) return 'Digite um telefone com DDD.'
  if (!data.get('area')) return 'Escolha a área de interesse.'
  if (!data.get('unidade')) return 'Escolha a unidade de preferência.'
  if (!data.get('cargo')) return 'Escolha o cargo desejado.'
  const file = form.curriculo.files[0]
  if (file && !/\.(pdf|doc|docx)$/i.test(file.name)) return 'O currículo de exemplo precisa ser PDF ou Word.'
  if (!form.aceite.checked) return 'Aceite a política de privacidade para continuar.'
  return ''
}

export function renderTrabalhe() {
  const unidades = LOJAS.map((loja) => `<option value="${loja.id}">${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
  return `<section class="hero hero-job">
      <div>
        <p class="olho">Trabalhe conosco</p>
        <h1>Entre para a equipe e ajude a cada vez mais realizar os sonhos de todas as famílias de Cuiabá-MT.</h1>
        <button class="btn btn-yellow" type="button" data-act="scroll" data-alvo="curriculo">Enviar meu currículo</button>
      </div>
      <div class="foto"><p>Fotografia — equipe sorrindo em uma loja da rede (a produzir)</p></div>
    </section>
    <ol class="passos">
      ${PASSOS.map(([titulo, texto], index) => `<li><span>${index + 1}</span><strong>${esc(titulo)}</strong><p>${esc(texto)}</p></li>`).join('')}
    </ol>
    <div class="split" id="curriculo">
      <form id="jobForm" novalidate>
        <h2>Seu currículo</h2>
        <p>Abaixo, o formulário para seguirmos com o processo seletivo. Nesta proposta o envio fica só neste aparelho.</p>
        <div class="form-grid">
          <label>Nome completo<input name="nome" autocomplete="name" required></label>
          <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
          <label>Telefone / WhatsApp<input name="fone" type="tel" autocomplete="tel" inputmode="tel" required></label>
          <label>Área de interesse
            <select name="area" required>
              <option value="">Selecione</option>
              ${AREAS.map((area) => `<option>${esc(area)}</option>`).join('')}
            </select>
          </label>
          <label>Unidade de preferência
            <select name="unidade" required>
              <option value="">Selecione</option>
              ${unidades}
            </select>
          </label>
          <label>Cargo desejado
            <select name="cargo" required>
              <option value="">Selecione</option>
              ${CARGOS.map((cargo) => `<option>${esc(cargo)}</option>`).join('')}
            </select>
          </label>
          <label class="drop full" id="dropCurriculo">Arraste o arquivo ou toque para escolher (PDF, DOC)
            <input id="curriculo" name="curriculo" type="file" accept=".pdf,.doc,.docx,application/pdf">
            <span id="arquivoNome"></span>
          </label>
          <label class="check full"><input name="aceite" type="checkbox"> Li e aceito a <a href="#privacidade">política de privacidade</a>.</label>
        </div>
        <p class="erro" id="jobErr" role="alert"></p>
        <p class="ok" id="jobOk" role="status"></p>
        <button class="btn btn-red" type="submit">Enviar</button>
      </form>
      <aside class="lado">
        <h2>Ou envie um e-mail</h2>
        <a href="mailto:${SITE.vagas}">${SITE.vagas}</a>
        <p>Se preferir, mande seu currículo direto para nós. O endereço está na proposta; o envio real depende da rede.</p>
        <h2>Por que trabalhar aqui</h2>
        <ul>${MOTIVOS.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </aside>
    </div>`
}

export function mountTrabalhe() {}
