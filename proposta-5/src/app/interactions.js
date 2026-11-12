import { storeOptions } from '../components/chrome.js'
import { closeDialog, closeMenu, openDialog, openMenu } from '../components/overlays.js'
import { paintQty } from '../components/product-card.js'
import { paintCommerce } from '../components/receipt.js'
import { toast } from '../components/toast.js'
import { MOMENTOS, ROOMS } from '../data/felita.js'
import { lojaById, LOJAS } from '../data/lojas.js'
import { CAMPANHAS } from '../data/site.js'
import { dialOrCopy, openDirections } from '../domain/hours.js'
import { nearestByCoords } from '../domain/price.js'
import { slug } from '../lib/format.js'
import { validateContato } from '../pages/contato.js'
import { syncCena } from '../pages/felita.js'
import { mountLojas } from '../pages/lojas.js'
import { mountOfertas } from '../pages/ofertas.js'
import { readJobForm, validateJob } from '../pages/trabalhe.js'
import { validateNews } from '../pages/noticias.js'
import { forceRender } from './router.js'
import {
  nearestStore,
  qtyOf,
  removeItem,
  setPreferredStore,
  setQty,
  state,
} from '../state/store.js'

function go(hash) {
  if (location.hash !== hash) location.hash = hash
  else forceRender()
}

function showJobError(message) {
  const node = document.getElementById('jobErr')
  if (node) node.textContent = message
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const actions = {
  'open-menu': openMenu,
  'close-menu': closeMenu,
  'close-dialog': closeDialog,
  alterar() {
    openDialog(
      'Escolha a unidade',
      `<p>Os preços ilustrativos passam a usar esta loja. O endereço continua demonstrativo.</p>
       <label class="dlg-field">Unidade<select id="pickLoja">${storeOptions(state.unidade)}</select></label>
       <button class="btn btn-red" type="button" data-act="confirmar-loja">Usar esta unidade</button>`,
    )
  },
  'confirmar-loja'() {
    const select = document.getElementById('pickLoja')
    setPreferredStore(select.value)
    state.pin = state.unidade
    closeDialog()
    toast(`Preços da ${nearestStore().nome} (exemplo)`)
    forceRender()
  },
  card() {
    openDialog('Serve Mais Card', '<p>Área demonstrativa do cartão da rede. O cadastro, os benefícios e o regulamento serão publicados pela Serve Mais.</p>')
  },
  app(el) {
    toast(`${el.dataset.loja} ainda não está publicado. Este botão é um exemplo.`)
  },
  social() {
    toast('O perfil oficial da rede ainda será informado.')
  },
  zap() {
    toast('O WhatsApp oficial ainda será informado. Este canal é demonstrativo.')
  },
  'email-exemplo'() {
    toast('O e-mail oficial ainda será informado. contato@exemplo.com.br é só um exemplo.')
  },
  acoes() {
    openDialog('Ações especiais', '<p>Dias de desconto e parcerias da rede. O calendário oficial será publicado aqui. Este texto é um exemplo.</p>')
  },
  regulamento() {
    openDialog('Regulamento · Fecha Mês', '<p>Regulamento ilustrativo. As regras, o período e as lojas participantes serão informados pela Rede Serve Mais. Nada aqui é uma oferta válida.</p>')
  },
  geo() {
    if (!navigator.geolocation) {
      toast('Este navegador não informou a localização.')
      go('#lojas')
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const loja = nearestByCoords(LOJAS, position.coords.latitude, position.coords.longitude)
      setPreferredStore(loja.id)
      state.pin = loja.id
      toast(`Entre os endereços de exemplo, a mais próxima é ${loja.nome}.`)
      go(`#lojas/${loja.id}`)
    }, () => {
      toast('Não foi possível usar a localização. Escolha a unidade em Alterar.')
    })
  },
  add(el) {
    const id = Number(el.dataset.add)
    setQty(id, qtyOf(id) + 1)
    paintCommerce()
    paintQty()
    toast(`Anotado: ${el.dataset.name}. A lista fica neste aparelho.`)
  },
  qtd(el) {
    const id = Number(el.dataset.id)
    const next = qtyOf(id) + Number(el.dataset.d)
    setQty(id, next)
    paintCommerce()
    paintQty()
    if (Number(el.dataset.d) > 0) toast(`Anotado: ${el.dataset.name}. A lista fica neste aparelho.`)
  },
  rota(el) {
    const loja = lojaById(el.dataset.id)
    if (!loja) return
    openDirections(loja).then((mode) => {
      if (mode === 'ok') toast('Rota a partir da sua localização.')
      else toast('Não lemos a localização. A rota abre até a unidade.')
    })
  },
  ligar(el) {
    const label = el.dataset.label
    dialOrCopy(el.dataset.digits, label).then((mode) => {
      if (mode === 'copy') toast(`Número copiado: ${label}`)
      else if (mode === 'fail') toast(`Número: ${label}`)
    })
  },
  tirar(el) {
    removeItem(el.dataset.id)
    paintCommerce()
    paintQty()
  },
  imprimir() {
    window.print()
  },
  mais() {
    state.limite += 6
    mountOfertas()
    paintCommerce()
  },
  campanha(el) {
    const camp = CAMPANHAS.find((item) => item.id === el.dataset.campanha)
    if (camp) go(`#ofertas/${slug(camp.nome)}`)
  },
  faixa(el) {
    state.faixa = el.dataset.faixa
    state.limite = 6
    mountOfertas()
    paintCommerce()
    document.querySelectorAll('[data-faixa]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.faixa === state.faixa))
    })
  },
  cidade(el) {
    state.cidade = el.dataset.cidade
    mountLojas()
  },
  servico(el) {
    state.servico = state.servico === el.dataset.servico ? '' : el.dataset.servico
    mountLojas()
  },
  aberto() {
    state.aberto = !state.aberto
    mountLojas()
  },
  pin(el) {
    const id = Number(el.dataset.id)
    if (el.classList.contains('dim')) {
      state.cidade = 'Todas'
      state.aberto = false
      state.servico = ''
      state.q = ''
      toast('Mostrando todas as unidades')
    }
    go(`#lojas/${id}`)
  },
  zoom(el) {
    state.zoom = Math.min(1.8, Math.max(1, state.zoom + Number(el.dataset.z) * 0.2))
    const inner = document.getElementById('mapaInner')
    if (inner) inner.style.transform = `scale(${state.zoom})`
  },
  room(el) {
    go(`#felita/${el.dataset.room}`)
  },
  'room-step'(el) {
    const index = ROOMS.findIndex((room) => room.id === state.room)
    const next = (index + Number(el.dataset.dir) + ROOMS.length) % ROOMS.length
    go(`#felita/${ROOMS[next].id}`)
  },
  momento(el) {
    state.momento = el.dataset.momento
    syncCena()
    paintCommerce()
  },
  npage(el) {
    go(`#noticias/${slug(state.noticiaCat)}/${el.dataset.page}`)
  },
  assunto(el) {
    state.assunto = el.dataset.assunto
    document.querySelectorAll('[data-assunto]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.assunto === state.assunto))
    })
  },
  faq(el) {
    const open = el.getAttribute('aria-expanded') === 'true'
    document.querySelectorAll('[data-act="faq"]').forEach((button) => {
      button.setAttribute('aria-expanded', 'false')
      const panel = document.getElementById(button.getAttribute('aria-controls'))
      if (panel) panel.hidden = true
    })
    if (!open) {
      el.setAttribute('aria-expanded', 'true')
      const panel = document.getElementById(el.getAttribute('aria-controls'))
      if (panel) panel.hidden = false
    }
  },
  scroll(el, event) {
    event.preventDefault()
    const alvo = document.getElementById(el.dataset.alvo)
    if (!alvo) return
    alvo.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  },
  'job-back'() {
    readJobForm(document.getElementById('jobForm'))
    state.jobStep = Math.max(1, state.jobStep - 1)
    forceRender()
    document.getElementById('curriculo')?.scrollIntoView({ block: 'start' })
  },
}

export function startInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#menu a, #menu button[data-act="card"]')) {
      if (event.target.closest('#menu a')) closeMenu()
    }
    if (event.target.id === 'dialog') {
      closeDialog()
      return
    }
    const el = event.target.closest('[data-act]')
    if (!el) return
    if (el.dataset.act === 'pin' && event.target.closest('a')) return
    actions[el.dataset.act]?.(el, event)
  })

  document.addEventListener('input', (event) => {
    if (event.target.id === 'qOferta') {
      state.busca = event.target.value
      state.limite = 6
      mountOfertas()
      paintCommerce()
    }
    if (event.target.id === 'qLoja') {
      state.q = event.target.value
      mountLojas()
    }
    if (event.target.id === 'diaRange') {
      state.momento = MOMENTOS[Number(event.target.value)].id
      syncCena()
      paintCommerce()
    }
    if (event.target.id === 'arquivo' && event.target.files?.[0]) {
      state.job.arquivo = event.target.files[0].name
      const note = document.getElementById('fileNote')
      if (note) note.textContent = `Arquivo selecionado: ${event.target.files[0].name}`
    }
  })

  document.addEventListener('change', (event) => {
    if (event.target.id === 'unidadeOferta') {
      setPreferredStore(event.target.value)
      state.pin = state.unidade
      toast(`Preços da ${lojaById(state.unidade).nome} (exemplo)`)
      forceRender()
    }
  })

  document.addEventListener('submit', (event) => {
    const form = event.target
    if (form.id === 'buscaHome') {
      event.preventDefault()
      state.busca = new FormData(form).get('q')?.toString() || ''
      state.limite = 6
      go('#ofertas')
    }
    if (form.id === 'contatoForm') {
      event.preventDefault()
      const error = validateContato(form)
      const box = document.getElementById('contatoErr')
      const ok = document.getElementById('contatoOk')
      if (error) {
        box.textContent = error
        ok.textContent = ''
        return
      }
      box.textContent = ''
      ok.textContent = 'Mensagem conferida. Nesta proposta nada saiu do seu navegador.'
      form.reset()
      state.assunto = 'Dúvida'
      document.querySelectorAll('[data-assunto]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.assunto === 'Dúvida'))
      })
    }
    if (form.id === 'newsForm') {
      event.preventDefault()
      const error = validateNews(form)
      const box = document.getElementById('newsErr')
      const ok = document.getElementById('newsOk')
      if (error) {
        box.textContent = error
        ok.textContent = ''
        return
      }
      box.textContent = ''
      ok.textContent = 'Inscrição conferida neste aparelho. O envio ainda é demonstrativo.'
      form.reset()
    }
    if (form.id === 'jobForm') {
      event.preventDefault()
      readJobForm(form)
      const error = validateJob(state.jobStep)
      if (error) {
        showJobError(error)
        return
      }
      if (state.jobStep < 3) {
        state.jobStep += 1
        forceRender()
        document.getElementById('curriculo')?.scrollIntoView({ block: 'start' })
        return
      }
      state.job = {}
      state.jobStep = 1
      state.jobOk = true
      forceRender()
      document.getElementById('curriculo')?.scrollIntoView({ block: 'start' })
    }
  })

  document.addEventListener('dragover', (event) => {
    if (event.target.closest('#dropCurriculo')) event.preventDefault()
  })
  document.addEventListener('drop', (event) => {
    const zone = event.target.closest('#dropCurriculo')
    if (!zone) return
    event.preventDefault()
    const file = event.dataTransfer?.files?.[0]
    const input = document.getElementById('arquivo')
    if (!file || !input) return
    const transfer = new DataTransfer()
    transfer.items.add(file)
    input.files = transfer.files
    state.job.arquivo = file.name
    const note = document.getElementById('fileNote')
    if (note) note.textContent = `Arquivo selecionado: ${file.name}`
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (!document.getElementById('dialog').hidden) closeDialog()
    else if (!document.getElementById('menu').hidden) closeMenu()
  })

  window.addEventListener('scroll', () => {
    document.getElementById('topo').classList.toggle('scrolled', window.scrollY > 4)
  }, { passive: true })
}
