import { faixa } from '../components/chrome.js'
import { SETORES } from '../data/site.js'
import { PASSOS, VAGAS } from '../data/vagas.js'
import { esc } from '../lib/format.js'

export function trabalhePage() {
  const steps = PASSOS.map((item) => `<li><strong>${esc(item.titulo)}</strong><span>${esc(item.texto)}</span></li>`).join('')
  const jobs = VAGAS.map((item) => `<article class="vaga"><h3>${esc(item.titulo)}</h3><p>${esc(item.meta)}</p></article>`).join('')
  const options = SETORES.map((item) => `<option>${esc(item)}</option>`).join('')
  return `<section class="hero-job">
    <div class="wrap">
      <h1>Venha fazer parte da família.</h1>
      <p>Cadastre seu currículo e conheça as vagas da rede. Vagas e regras serão informadas pela Rede Serve Mais.</p>
    </div>
  </section>
  ${faixa()}
  <section class="wrap passos">
    <h2>Como funciona</h2>
    <ol>${steps}</ol>
  </section>
  <section class="wrap job-layout">
    <div>
      <h2>Vagas abertas</h2>
      ${jobs}
      <p class="nota">A lista oficial substitui estes dois exemplos quando o RH cadastrar.</p>
    </div>
    <form class="card" id="jobForm" novalidate>
      <h2>Seu currículo</h2>
      <label>Nome completo<input name="nome" autocomplete="name" required></label>
      <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
      <label>Telefone<input name="fone" inputmode="tel" autocomplete="tel" required></label>
      <label>Loja ou setor de interesse<select name="setor" required><option value="">Selecione</option>${options}</select></label>
      <p class="err" id="jobErr"></p>
      <button class="btn btn-red" type="submit">Enviar currículo</button>
      <p id="jobOk" role="status"></p>
    </form>
  </section>`
}

export function mountTrabalhe() {}

export function validateJob(form) {
  if (form.nome.value.trim().length < 2) return 'Digite seu nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return 'Digite um e-mail válido.'
  if (form.fone.value.replace(/\D/g, '').length < 10) return 'Digite um telefone com DDD.'
  if (!form.setor.value) return 'Escolha a loja ou o setor.'
  return ''
}
