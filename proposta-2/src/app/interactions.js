import { storeOptions } from '../components/chrome.js'
import { closeDialog, closeMenu, openDialog, openMenu } from '../components/overlays.js'
import { paintCommerce } from '../components/receipt.js'
import { toast } from '../components/toast.js'
import { lojaById } from '../data/lojas.js'
import { slug } from '../lib/format.js'
import { syncCena } from '../pages/felita.js'
import { mountLojas } from '../pages/lojas.js'
import { mountNoticias } from '../pages/noticias.js'
import { mountOfertas } from '../pages/ofertas.js'
import { readJobForm, validateJob } from '../pages/trabalhe.js'
import { validateContato } from '../pages/contato.js'
import { forceRender } from './router.js'
import { MOMENTOS } from '../data/felita.js'
import { dialOrCopy, openDirections } from '../domain/hours.js'
import { qtyOf, removeItem, setPreferredStore, setQty, state, storeFromCoords } from '../state/store.js'

function go(hash) {
  if (location.hash !== hash) location.hash = hash
  else forceRender()
}

function showJobError(message) {
  const node = document.getElementById('jobErr')
  if (node) node.textContent = message
}

const actions = {
  'dismiss-demo'() {
    document.getElementById('demo').hidden = true
    sessionStorage.setItem('sm2-demo', 'off')
  },
  'open-menu': openMenu,
  'close-menu': closeMenu,
  'close-dialog': closeDialog,
  alterar() {
    openDialog(
      'Escolha a unidade',
      `<p>Os preços ilustrativos passam a usar esta loja. O endereço continua demonstrativo.</p>
       <label class="dlg-field">Unidade<select id="pickLoja">${storeOptions(state.loja)}</select></label>
       <button class="btn btn-red" type="button" data-act="confirmar-loja">Usar esta unidade</button>`,
    )
  },
  'confirmar-loja'() {
    const select = document.getElementById('pickLoja')
    setPreferredStore(select.value)
    state.pin = state.loja || state.pin
    closeDialog()
    const loja = state.loja ? lojaById(state.loja) : null
    toast(loja ? `Preços da ${loja.nome} (exemplo)` : 'Preço base ilustrativo')
    forceRender()
  },
  card() {
    openDialog('Serve Mais Card', '<p>Área demonstrativa do cartão da rede. O cadastro, os benefícios e o regulamento serão publicados pela Serve Mais.</p>')
  },
  app(el) {
    toast(`${el.dataset.loja} ainda não está publicado. Este botão é um exemplo.`)
  },
  politica(el) {
    const title = el.dataset.qual === 'cookies' ? 'Política de cookies' : 'Política de privacidade'
    openDialog(title, '<p>Texto demonstrativo. A política oficial, com a base legal e os contatos da rede, entra antes da publicação do site.</p>')
  },
  social() {
    toast('O perfil oficial da rede ainda será informado.')
  },
  acoes() {
    openDialog('Ações especiais', '<p>Dias de desconto e parcerias da rede. O calendário oficial será publicado aqui. Este texto é um exemplo.</p>')
  },
  regulamento() {
    openDialog('Regulamento · Fecha Mês', '<p>Regulamento ilustrativo. As regras, o período e as lojas participantes serão informados pela Rede Serve Mais. Nada aqui é uma oferta válida.</p>')
  },
  ligar(el) {
    const label = el.dataset.label || el.dataset.tel
    dialOrCopy(el.dataset.digits || el.dataset.tel, label).then((mode) => {
      if (mode === 'copy') toast(`Número copiado: ${label}`)
      else if (mode === 'fail') toast(`Número: ${label}`)
    })
  },
  rota(el) {
    const loja = lojaById(el.dataset.id)
    if (!loja) return
    openDirections(loja).then((mode) => {
      if (mode === 'ok') toast('Rota a partir da sua localização.')
      else toast('Não lemos a localização. A rota abre até a unidade.')
    })
  },
  qtd(el) {
    const id = el.dataset.id
    setQty(id, qtyOf(id) + Number(el.dataset.d))
    paintCommerce()
  },
  geo() {
    if (!navigator.geolocation) {
      toast('Este navegador não informou a localização.')
      go('#lojas')
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const loja = storeFromCoords(position.coords.latitude, position.coords.longitude)
      setPreferredStore(loja.id)
      state.pin = loja.id
      toast(`Unidade ilustrativa mais próxima: ${loja.nome}`)
      go(`#lojas/${loja.id}`)
    }, () => {
      toast('Não foi possível usar a localização. Escolha a unidade em Alterar.')
    })
  },
  add(el) {
    const id = el.dataset.add
    setQty(id, qtyOf(id) + 1)
    paintCommerce()
    toast(`${el.dataset.name} na lista`)
  },
  tirar(el) {
    removeItem(el.dataset.id)
    paintCommerce()
  },
  imprimir() {
    window.print()
  },
  mais() {
    state.limite += 6
    mountOfertas()
  },
  corredor(el) {
    go(`#ofertas/${slug(el.dataset.corredor)}`)
  },
  campanha(el) {
    go(`#ofertas/${slug(el.dataset.campanha)}`)
  },
  marca() {
    go('#ofertas/felita')
  },
  'limpar-filtros'() {
    state.faixa = 'todas'
    state.oq = ''
    go('#ofertas')
  },
  faixa(el) {
    state.faixa = el.dataset.faixa
    state.limite = 6
    mountOfertas()
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
  room(el) {
    go(`#felita/${el.dataset.room}`)
  },
  momento(el) {
    state.momento = el.dataset.momento
    syncCena()
  },
  'news-cat'(el) {
    state.newsCat = el.dataset.cat
    state.newsPage = 1
    state.artigo = ''
    go('#noticias')
  },
  'news-page'(el) {
    state.newsPage = Number(el.dataset.page)
    mountNoticias()
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
  'job-next'() {
    const form = document.getElementById('jobForm')
    readJobForm(form)
    const error = validateJob(state.jobStep)
    if (error) {
      showJobError(error)
      return
    }
    state.jobStep = Math.min(3, state.jobStep + 1)
    forceRender()
  },
  'job-back'() {
    readJobForm(document.getElementById('jobForm'))
    state.jobStep = Math.max(1, state.jobStep - 1)
    forceRender()
  },
}

export function startInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#menu a')) closeMenu()
    if (event.target.id === 'dialog') {
      closeDialog()
      return
    }
    const el = event.target.closest('[data-act]')
    if (!el) return
    actions[el.dataset.act]?.(el)
  })

  document.addEventListener('input', (event) => {
    if (event.target.id === 'qOferta') {
      state.oq = event.target.value
      state.limite = 6
      mountOfertas()
    }
    if (event.target.id === 'qLoja') {
      state.q = event.target.value
      mountLojas()
    }
    if (event.target.id === 'diaRange') {
      state.momento = MOMENTOS[Number(event.target.value)].id
      syncCena()
    }
    if (event.target.id === 'arquivo' && event.target.files?.[0]) {
      state.job.arquivo = event.target.files[0].name
      const note = document.getElementById('fileNote')
      if (note) note.textContent = `Arquivo selecionado: ${event.target.files[0].name}`
    }
  })

  document.addEventListener('change', (event) => {
    if (event.target.id === 'unidade') {
      setPreferredStore(event.target.value)
      toast(state.loja ? `Preços da ${lojaById(state.loja).nome}` : 'Preço base ilustrativo')
      forceRender()
    }
  })

  document.addEventListener('submit', (event) => {
    if (event.target.id === 'buscaHome') {
      event.preventDefault()
      state.oq = new FormData(event.target).get('q')?.toString() || ''
      go('#ofertas')
    }
    if (event.target.id === 'contatoForm') {
      event.preventDefault()
      const error = validateContato(event.target)
      const box = document.getElementById('contatoErr')
      const ok = document.getElementById('contatoOk')
      if (error) {
        box.textContent = error
        ok.textContent = ''
        return
      }
      box.textContent = ''
      ok.innerHTML = '<span class="success">Mensagem conferida. Nesta proposta nada saiu do seu navegador.</span>'
      event.target.reset()
      state.assunto = 'Dúvida'
    }
    if (event.target.id === 'newsForm') {
      event.preventDefault()
      const email = event.target.email.value.trim()
      const ok = document.getElementById('newsOk')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        ok.textContent = 'Digite um e-mail válido.'
        return
      }
      ok.innerHTML = '<span class="success">Inscrição conferida. O envio ainda é demonstrativo.</span>'
      event.target.reset()
    }
    if (event.target.id === 'jobForm') {
      event.preventDefault()
      readJobForm(event.target)
      if (state.jobStep < 3) {
        const error = validateJob(state.jobStep)
        if (error) {
          showJobError(error)
          return
        }
        state.jobStep += 1
        forceRender()
        return
      }
      const error = validateJob(3)
      if (error) {
        showJobError(error)
        return
      }
      state.job = {}
      state.jobStep = 1
      state.jobOk = true
      forceRender()
    }
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
