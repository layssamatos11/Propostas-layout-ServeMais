import { ticker } from '../components/ticker.js'
import { LOJAS } from '../data/lojas.js'
import { JOB_AREAS, JOB_ROLES, SITE } from '../data/site.js'
import { emailOk, esc } from '../lib/format.js'
import { state } from '../state/store.js'

function field(name, label, type = 'text', extra = '') {
  const value = esc(state.job[name] || '')
  return `<label>${label}<input name="${name}" id="job-${name}" type="${type}" value="${value}" ${extra}></label>`
}

export function renderTrabalhe() {
  const step = state.jobStep
  const areas = JOB_AREAS.map((area) => `<option${state.job.area === area ? ' selected' : ''}>${esc(area)}</option>`).join('')
  const roles = JOB_ROLES.map((role) => `<option${state.job.cargo === role ? ' selected' : ''}>${esc(role)}</option>`).join('')
  const units = LOJAS.map((loja) => `<option value="${esc(loja.nome)}"${state.job.unidade === loja.nome ? ' selected' : ''}>${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
  let body = ''
  if (step === 1) {
    body = `<div class="form-grid">
      ${field('nome', 'Nome completo', 'text', 'autocomplete="name" required')}
      ${field('email', 'E-mail', 'email', 'autocomplete="email" required')}
      ${field('fone', 'Telefone / WhatsApp', 'tel', 'autocomplete="tel" inputmode="tel" required')}
      <label>Área de interesse<select name="area" id="job-area" required><option value="">Selecione</option>${areas}</select></label>
    </div>
    <p id="jobErr" class="err" role="alert"></p>
    <button class="btn btn-red" type="submit">Continuar</button>`
  } else if (step === 2) {
    body = `<div class="form-grid">
      <label>Unidade de preferência<select name="unidade" id="job-unidade" required><option value="">Selecione</option>${units}</select></label>
      <label>Cargo desejado<select name="cargo" id="job-cargo" required><option value="">Selecione</option>${roles}</select></label>
    </div>
    <label class="drop" id="dropCurriculo">
      Anexar currículo
      <span>Arraste o arquivo ou toque para escolher (PDF, DOC). Nesta proposta o arquivo é opcional.</span>
      <input name="arquivo" id="arquivo" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword">
    </label>
    <p class="note" id="fileNote">${state.job.arquivo ? `Arquivo selecionado: ${esc(state.job.arquivo)}` : 'Sem arquivo. O envio continua demonstrativo.'}</p>
    <p id="jobErr" class="err" role="alert"></p>
    <div class="btn-row">
      <button class="btn btn-line" type="button" data-act="job-back">Voltar</button>
      <button class="btn btn-red" type="submit">Continuar</button>
    </div>`
  } else {
    body = `<ul class="revisao">
      <li>${esc(state.job.nome || '')}</li>
      <li>${esc(state.job.email || '')}</li>
      <li>${esc(state.job.fone || '')}</li>
      <li>${esc(state.job.area || '')} · ${esc(state.job.cargo || '')}</li>
      <li>${esc(state.job.unidade || '')}</li>
    </ul>
    <label class="check"><input name="aceite" type="checkbox"${state.job.aceite ? ' checked' : ''}> Li e aceito a <a href="#privacidade">política de privacidade</a>.</label>
    <p id="jobErr" class="err" role="alert"></p>
    <div class="btn-row">
      <button class="btn btn-line" type="button" data-act="job-back">Voltar</button>
      <button class="btn btn-red" type="submit">Enviar</button>
    </div>`
  }
  const sent = state.jobOk
    ? '<p class="success" role="status">Currículo conferido neste aparelho. O envio ainda é demonstrativo.</p>'
    : ''
  state.jobOk = false
  return `<section class="hero hero-job">
    <div>
      <h1>Vem pro <em>time.</em></h1>
      <p class="lead">Entre para a equipe e ajude a cada vez mais realizar os sonhos de todas as famílias de Cuiabá-MT.</p>
      <a class="btn btn-yellow" href="#trabalhe" data-act="scroll" data-alvo="curriculo">Enviar meu currículo</a>
    </div>
    <div class="hero-foto"><span>Fotografia: equipe sorrindo em uma loja da rede (a produzir)</span><b>Vagas (exemplo)</b></div>
  </section>
  ${ticker('Caixa * Açougue * Padaria * Reposição * Administrativo * Logística * ')}
  <section class="bloco passos-bloco" id="curriculo">
    <h2>Como funciona</h2>
    <ol class="passos">
      <li><b>1</b><strong>Conte sobre você</strong><span>Preencha o formulário com seus dados.</span></li>
      <li><b>2</b><strong>Anexe seu currículo</strong><span>Na operação real, o arquivo segue em PDF ou Word. Aqui ele não sai do navegador.</span></li>
      <li><b>3</b><strong>Fique atento ao e-mail</strong><span>Se o currículo for selecionado, o contato chega no seu e-mail.</span></li>
    </ol>
  </section>
  <section class="job-layout">
    <form class="card" id="jobForm" novalidate>
      <p class="kicker">Seu currículo</p>
      <h2>Etapa ${step} de 3</h2>
      ${sent}
      ${body}
    </form>
    <aside class="job-aside">
      <h2>Ou envie um e-mail</h2>
      <a href="mailto:${SITE.vagas}">${SITE.vagas}</a>
      <p>Se preferir, mande seu currículo direto para nós.</p>
      <h2>Fique atento ao seu e-mail</h2>
      <p>Caso seu currículo seja selecionado, entraremos em contato pelo seu e-mail.</p>
      <h2>Por que trabalhar aqui</h2>
      <p>Equipe próxima · Crescimento · Lojas em Cuiabá e Várzea Grande · Benefícios (exemplo)</p>
    </aside>
  </section>`
}

export function mountTrabalhe() {}

export function readJobForm(form) {
  if (!form) return
  ;['nome', 'email', 'fone', 'area', 'cargo'].forEach((key) => {
    if (form.elements[key]) state.job[key] = form.elements[key].value
  })
  if (form.elements.unidade) state.job.unidade = form.elements.unidade.value
  if (form.elements.aceite) state.job.aceite = form.elements.aceite.checked
  const file = form.elements.arquivo?.files?.[0]
  if (file) state.job.arquivo = file.name
}

export function validateJob(step) {
  const job = state.job
  if (step === 1) {
    if ((job.nome || '').trim().length < 2) return 'Digite seu nome.'
    if (!emailOk(job.email || '')) return 'Digite um e-mail válido.'
    if ((job.fone || '').replace(/\D/g, '').length < 10) return 'Digite um telefone com DDD.'
    if (!job.area) return 'Escolha a área de interesse.'
  }
  if (step === 2) {
    if (!job.unidade || !job.cargo) return 'Escolha unidade e cargo.'
    if (job.arquivo && !/\.(pdf|docx?)$/i.test(job.arquivo)) return 'Use um arquivo PDF, DOC ou DOCX.'
  }
  if (step === 3 && !job.aceite) return 'Aceite a política de privacidade para continuar.'
  return ''
}
