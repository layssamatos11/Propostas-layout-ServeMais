import { closeDialog, closeMenu, openDialog, openMenu } from '../components/overlays.js'
import { toast } from '../components/toast.js'
import { itemById } from '../data/felita.js'
import { esc, slug } from '../lib/format.js'
import { mountFelita, quizHtml } from '../pages/felita.js'
import { mountInicio } from '../pages/inicio.js'
import { mountLojas } from '../pages/lojas.js'
import { campanhaById } from '../pages/ofertas.js'
import { mountOfertas } from '../pages/ofertas.js'
import { validateContato } from '../pages/contato.js'
import { validateNews } from '../pages/noticias.js'
import { validateJob } from '../pages/trabalhe.js'
import { setUnidade, state } from '../state/store.js'
import { forceRender } from './router.js'

function go(hash) {
  if (location.hash !== hash) location.hash = hash
  else forceRender()
}

function showForm(form, errId, okId, error, success) {
  const err = document.getElementById(errId)
  const ok = document.getElementById(okId)
  if (error) {
    if (err) err.textContent = error
    if (ok) ok.textContent = ''
    return
  }
  if (err) err.textContent = ''
  if (ok) ok.textContent = success
  form.reset()
  const arquivo = document.getElementById('arquivoNome')
  if (arquivo) arquivo.textContent = ''
}

const actions = {
  'open-menu': openMenu,
  'close-menu': closeMenu,
  'close-dialog': closeDialog,
  social() {
    toast('O perfil oficial da rede ainda será informado.')
  },
  zap() {
    toast('O WhatsApp oficial ainda será informado. Este canal é demonstrativo.')
  },
  app() {
    toast('As lojas de aplicativo ainda serão informadas.')
  },
  card() {
    openDialog('Serve Mais Card', '<p>Faça seu cartão. O pedido, as regras e o atendimento oficial ainda serão informados pela rede.</p>')
  },
  campanha(el) {
    const camp = campanhaById(el.dataset.campanha)
    if (!camp) return
    openDialog(camp.nome, `<p>${esc(camp.texto)}</p><p>Período e regulamento: a fornecer.</p>`)
  },
  anotar(el) {
    toast(`Anotado: ${el.dataset.nome}. Nesta proposta nada vai para um carrinho.`)
  },
  'home-cat'(el) {
    state.homeCat = el.dataset.cat
    mountInicio()
  },
  cat(el) {
    const id = el.dataset.cat
    go(id === 'Todas' ? '#ofertas' : `#ofertas/${slug(id)}`)
  },
  cidade(el) {
    const cidade = el.dataset.cidade
    go(cidade === 'Todas' ? '#lojas' : `#lojas/${slug(cidade)}`)
  },
  aberto() {
    state.aberto = !state.aberto
    mountLojas()
  },
  mais() {
    state.visiveis += 8
    mountOfertas()
  },
  loja(el) {
    state.lojaId = Number(el.dataset.id)
    mountLojas()
  },
  zoom(el) {
    const dir = el.dataset.zoom === 'in' ? 0.15 : -0.15
    state.zoom = Math.min(1.8, Math.max(1, Math.round((state.zoom + dir) * 100) / 100))
    mountLojas()
  },
  momento(el) {
    state.momento = el.dataset.momento
    mountFelita()
  },
  linha(el) {
    state.linha = el.dataset.linha
    mountFelita()
  },
  hotspot(el) {
    const item = itemById(el.dataset.item)
    if (!item) return
    const oferta = item.oferta
      ? '<p><a class="btn btn-red" href="#ofertas/felita">Ver na oferta</a></p>'
      : '<p>Oferta da semana a definir.</p>'
    openDialog(item.nome, `<p>${esc(item.historia)}</p>${oferta}`)
  },
  flip(el) {
    const next = el.getAttribute('aria-pressed') !== 'true'
    el.setAttribute('aria-pressed', next ? 'true' : 'false')
    el.setAttribute('aria-label', next ? el.dataset.verso : el.dataset.frente)
  },
  quiz(el) {
    if (state.quizStep >= 3) return
    state.quizAns[state.quizStep] = el.dataset.op
    state.quizStep += 1
    const box = document.getElementById('quizBox')
    if (!box) return
    box.innerHTML = quizHtml()
  },
  'quiz-reset'() {
    state.quizStep = 0
    state.quizAns = []
    const box = document.getElementById('quizBox')
    if (box) box.innerHTML = quizHtml()
  },
  ncat(el) {
    const cat = el.dataset.cat
    go(cat === 'Todas' ? '#noticias' : `#noticias/${slug(cat)}`)
  },
  npage(el) {
    const cat = state.noticiaCat === 'Todas' ? 'todas' : slug(state.noticiaCat)
    go(`#noticias/${cat}/${el.dataset.page}`)
  },
  scroll(el) {
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    document.getElementById(el.dataset.alvo)?.scrollIntoView({ behavior, block: 'start' })
  },
}

export function startInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#menu a')) closeMenu()
    if (event.target.closest('#dialog a')) closeDialog()
    if (event.target.id === 'dialog') {
      closeDialog()
      return
    }
    const el = event.target.closest('[data-act]')
    if (!el || !actions[el.dataset.act]) return
    if (el.dataset.act === 'loja' && event.target.closest('a')) return
    actions[el.dataset.act](el, event)
  })

  document.addEventListener('submit', (event) => {
    const form = event.target
    if (form.id === 'contatoForm') {
      event.preventDefault()
      showForm(form, 'contatoErr', 'contatoOk', validateContato(form), 'Mensagem conferida. Nesta proposta nada saiu do seu navegador.')
    }
    if (form.id === 'jobForm') {
      event.preventDefault()
      showForm(form, 'jobErr', 'jobOk', validateJob(form), 'Currículo conferido neste aparelho. O envio ainda é demonstrativo.')
    }
    if (form.id === 'newsForm') {
      event.preventDefault()
      showForm(form, 'newsErr', 'newsOk', validateNews(form), 'Inscrição conferida neste aparelho. O envio ainda é demonstrativo.')
    }
  })

  document.addEventListener('change', (event) => {
    if (event.target.id === 'unidadeSelect') {
      setUnidade(event.target.value)
      mountOfertas()
    }
    if (event.target.id === 'ordemSelect') {
      state.ordem = event.target.value === 'nome' ? 'nome' : 'desconto'
      mountOfertas()
    }
    if (event.target.id === 'curriculo') {
      const nome = document.getElementById('arquivoNome')
      if (nome) nome.textContent = event.target.files[0] ? event.target.files[0].name : ''
    }
  })

  document.addEventListener('input', (event) => {
    if (event.target.id !== 'buscaLoja') return
    state.busca = event.target.value
    mountLojas()
  })

  document.addEventListener('dragover', (event) => {
    if (event.target.closest('#dropCurriculo')) event.preventDefault()
  })
  document.addEventListener('drop', (event) => {
    const zone = event.target.closest('#dropCurriculo')
    if (!zone) return
    event.preventDefault()
    const input = zone.querySelector('input')
    if (event.dataTransfer.files.length) input.files = event.dataTransfer.files
    const nome = document.getElementById('arquivoNome')
    if (nome && input.files[0]) nome.textContent = input.files[0].name
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (!document.getElementById('dialog').hidden) closeDialog()
    else closeMenu()
  })

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  document.addEventListener('scroll', () => {
    document.getElementById('topo')?.classList.toggle('scrolled', window.scrollY > 4)
    if (reduce) return
    const flutua = document.querySelector('.flutua')
    if (flutua) flutua.style.setProperty('--py', `${Math.min(window.scrollY, 220) * -0.06}px`)
  }, { passive: true })
}
