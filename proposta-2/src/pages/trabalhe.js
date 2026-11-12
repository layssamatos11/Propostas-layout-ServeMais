import { LOJAS } from '../data/lojas.js'
import { JOB_AREAS, JOB_ROLES, SITE } from '../data/site.js'
import { esc } from '../lib/format.js'
import { state } from '../state/store.js'
import { ticker } from '../components/ticker.js'

function field(name, label, type = 'text', extra = '') {
  const value = esc(state.job[name] || '')
  return `<label>${label}<input name="${name}" id="${name}" type="${type}" value="${value}" ${extra}></label>`
}

export function trabalhePage() {
  const step = state.jobStep
  const areas = JOB_AREAS.map((area) => `<option${state.job.area === area ? ' selected' : ''}>${area}</option>`).join('')
  const roles = JOB_ROLES.map((role) => `<option${state.job.cargo === role ? ' selected' : ''}>${role}</option>`).join('')
  const units = LOJAS.map((loja) => `<option value="${esc(loja.nome)}"${state.job.unidade === loja.nome ? ' selected' : ''}>${esc(loja.nome)} · ${esc(loja.cidade)}</option>`).join('')
  let body = ''
  if (step === 1) {
    body = `<div class="form-grid">
      ${field('nome', 'Nome completo', 'text', 'autocomplete="name" required')}
      ${field('email', 'E-mail', 'email', 'autocomplete="email" required')}
      ${field('fone', 'Telefone / WhatsApp', 'tel', 'autocomplete="tel" inputmode="tel" required')}
    </div>
    <p class="err" id="jobErr"></p>
    <button class="btn btn-red" type="button" data-act="job-next">Continuar</button>`
  } else if (step === 2) {
    body = `<div class="form-grid">
      <label>Área de interesse<select name="area" id="area" required><option value="">Selecione</option>${areas}</select></label>
      <label>Unidade de preferência<select name="unidade" id="unidadeJob" required><option value="">Selecione</option>${units}</select></label>
      <label class="full">Cargo desejado<select name="cargo" id="cargo" required><option value="">Selecione</option>${roles}</select></label>
    </div>
    <p class="err" id="jobErr"></p>
    <div class="btn-row">
      <button class="btn btn-line" type="button" data-act="job-back">Voltar</button>
      <button class="btn btn-red" type="button" data-act="job-next">Continuar</button>
    </div>`
  } else {
    const fileNote = state.job.arquivo
      ? `Arquivo selecionado: ${esc(state.job.arquivo)}`
      : 'O arquivo não é enviado. Só o nome fica neste aparelho.'
    body = `<label class="drop">
      Anexar currículo
      <span>Arraste o arquivo ou toque para escolher (PDF, DOC)</span>
      <input name="arquivo" id="arquivo" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword">
    </label>
    <p class="note" id="fileNote">${fileNote}</p>
    <label class="check"><input name="aceite" id="aceite" type="checkbox"${state.job.aceite ? ' checked' : ''}> Li e aceito a política de privacidade.</label>
    <button class="text-btn" type="button" data-act="politica" data-qual="privacidade">Ler a política</button>
    <p class="err" id="jobErr"></p>
    <div class="btn-row">
      <button class="btn btn-line" type="button" data-act="job-back">Voltar</button>
      <button class="btn btn-red" type="submit">Enviar</button>
    </div>`
  }
  const sent = state.jobOk
    ? '<p class="success">Currículo conferido neste aparelho. O envio ainda é demonstrativo: nenhum arquivo saiu do navegador.</p>'
    : ''
  state.jobOk = false
  return `<section class="hero hero-job">
    <div class="wrap hero-grid">
      <div>
        <h1>Vem pro <em>time.</em></h1>
        <p class="lead">Entre para a equipe e ajude a cada vez mais realizar os sonhos de todas as famílias de Cuiabá-MT.</p>
        <a class="btn btn-yellow" href="#curriculo">Enviar meu currículo</a>
      </div>
      <div class="hero-foto"><span>Fotografia: equipe sorrindo em uma loja da rede (a produzir)</span><b>Vagas (exemplo)</b></div>
    </div>
  </section>
  ${ticker('Caixa · Açougue · Padaria · Reposição · Administrativo · Logística · ')}
  <section class="wrap passos-3" id="curriculo">
    <h2>Como funciona</h2>
    <ol>
      <li><b>1</b><strong>Conte sobre você</strong><span>Preencha o formulário com seus dados.</span></li>
      <li><b>2</b><strong>Anexe seu currículo</strong><span>Envie em PDF ou Word.</span></li>
      <li><b>3</b><strong>Fique atento ao e-mail</strong><span>Se o currículo for selecionado, o contato chega no seu e-mail.</span></li>
    </ol>
  </section>
  <section class="wrap job-layout">
    <form class="card" id="jobForm" novalidate>
      <p class="kicker">Seu currículo</p>
      <h2>Etapa ${step} de 3</h2>
      ${sent}
      ${body}
      <p id="jobOk" role="status"></p>
    </form>
    <aside class="job-aside">
      <h2>Ou envie um e-mail</h2>
      <a href="mailto:${SITE.vagas}">${SITE.vagas}</a>
      <p>Se preferir, mande seu currículo direto para nós. O endereço é demonstrativo.</p>
      <h2>Fique atento ao seu e-mail</h2>
      <p>Caso seu currículo seja selecionado, entraremos em contato pelo seu e-mail.</p>
      <h2>Por que trabalhar aqui</h2>
      <p>Equipe próxima · Crescimento · Benefícios (exemplo)</p>
    </aside>
  </section>`
}

export function mountTrabalhe() {}

export function readJobForm(form) {
  if (!form) return
  ;['nome', 'email', 'fone', 'area', 'cargo'].forEach((key) => {
    if (form[key]) state.job[key] = form[key].value
  })
  if (form.unidade) state.job.unidade = form.unidade.value
  if (form.aceite) state.job.aceite = form.aceite.checked
  const file = form.arquivo?.files?.[0]
  if (file) state.job.arquivo = file.name
}

export function validateJob(step) {
  const job = state.job
  if (step === 1) {
    if ((job.nome || '').trim().length < 2) return 'Digite seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((job.email || '').trim())) return 'Digite um e-mail válido.'
    if ((job.fone || '').replace(/\D/g, '').length < 10) return 'Digite um telefone com DDD.'
  }
  if (step === 2) {
    if (!job.area || !job.unidade || !job.cargo) return 'Escolha área, unidade e cargo.'
  }
  if (step === 3) {
    if (!job.arquivo) return 'Anexe um PDF ou Word. O arquivo fica só neste navegador.'
    if (!job.aceite) return 'Aceite a política de privacidade para continuar.'
  }
  return ''
}
