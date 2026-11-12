import { applyZoom } from '../components/map-panel.js'
import { closeDialog, closeLista, closeMenu, openDialog, openLista, openMenu } from '../components/overlays.js'
import { changeQty, paintQty, renderLista } from '../components/shopping-list.js'
import { toast } from '../components/toast.js'
import { lojaById } from '../data/lojas.js'
import { dialOrCopy, openDirections } from '../domain/hours.js'
import { slug } from '../lib/format.js'
import { mountInicio } from '../pages/inicio.js'
import { mountLojas } from '../pages/lojas.js'
import { mountOfertas } from '../pages/ofertas.js'
import { handleContatoSubmit } from '../pages/contato.js'
import { clearList, qtyOf, setPreferredStore, state } from '../state/store.js'

function refreshPrices() {
  if (document.getElementById('homeLojas')) mountInicio()
  if (document.getElementById('offerGrid')) mountOfertas()
  if (document.getElementById('lojaList')) mountLojas()
}

const actions = {
  'dismiss-demo'() {
    document.getElementById('demo').hidden = true
    sessionStorage.setItem('sm-demo', 'off')
  },
  'open-menu': openMenu,
  'close-menu': closeMenu,
  'open-lista': openLista,
  'close-lista': closeLista,
  'close-dialog': closeDialog,
  home(el) {
    state.homeCat = el.dataset.home
    mountInicio()
  },
  filtro(el) {
    state.filtro = el.dataset.filtro
    state.limite = 8
    const next = `#ofertas${state.filtro === 'Todas' ? '' : `/${slug(state.filtro)}`}`
    if (location.hash !== next) location.hash = next
    else mountOfertas()
  },
  add(el) {
    changeQty(el.dataset.add, qtyOf(el.dataset.add) + 1, { bump: true })
    toast(`${el.dataset.name} na lista`)
  },
  mais() {
    state.limite += 8
    mountOfertas()
  },
  cidade(el) {
    state.cidade = el.dataset.cidade
    mountLojas()
  },
  aberto() {
    state.aberto = !state.aberto
    mountLojas()
  },
  zoom(el) {
    state.zoom = Math.min(1.6, Math.max(1, state.zoom + Number(el.dataset.dir) * 0.15))
    applyZoom()
  },
  pin(el) {
    const id = Number(el.dataset.id)
    if (el.classList.contains('dim')) {
      state.cidade = 'Todas'
      state.aberto = false
      state.q = ''
      const input = document.getElementById('qLoja')
      if (input) input.value = ''
      toast('Mostrando todas as unidades')
    }
    const next = `#lojas/${id}`
    if (location.hash !== next) location.hash = next
    else {
      state.pin = id
      mountLojas()
    }
  },
  detalhe(el) {
    const card = document.getElementById(`loja-${el.dataset.id}`)
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
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
  'usar-loja'(el) {
    setPreferredStore(el.dataset.id)
    toast(`Preços da ${lojaById(state.loja).nome} (exemplo)`)
    if ((location.hash || '') !== '#ofertas') location.hash = '#ofertas'
    else refreshPrices()
  },
  social() {
    toast('O perfil oficial da rede ainda será informado.')
  },
  acoes() {
    openDialog(
      'Ações especiais',
      '<p>Dias de desconto e parcerias da rede. O calendário oficial será publicado aqui. Este texto é um exemplo.</p>',
    )
  },
  regulamento(el) {
    openDialog(
      `Regulamento · ${el.dataset.camp}`,
      '<p>Regulamento ilustrativo. As regras, o período e as lojas participantes serão informados pela Rede Serve Mais em cada campanha. Nada aqui é uma oferta válida.</p>',
    )
  },
  qtd(el) {
    changeQty(el.dataset.id, qtyOf(el.dataset.id) + Number(el.dataset.d))
  },
  limpar() {
    clearList()
    renderLista()
    paintQty()
  },
  canal(el) {
    state.assunto = el.dataset.assunto
    if ((location.hash || '') !== '#contato') location.hash = '#contato'
    else {
      const select = document.getElementById('assunto')
      if (select) {
        select.value = state.assunto
        select.focus()
      }
    }
  },
}

export function startInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#menu a')) closeMenu()
    const el = event.target.closest('[data-act]')
    if (event.target.id === 'dialog') {
      closeDialog()
      return
    }
    if (!el) return
    actions[el.dataset.act]?.(el)
  })

  document.addEventListener('input', (event) => {
    if (event.target.id === 'qOferta') {
      state.oq = event.target.value
      state.limite = 8
      mountOfertas()
    }
    if (event.target.id === 'qLoja') {
      state.q = event.target.value
      mountLojas()
    }
  })

  document.addEventListener('change', (event) => {
    if (event.target.id === 'unidade') {
      setPreferredStore(event.target.value)
      mountOfertas()
      toast(state.loja ? `Preços da ${lojaById(state.loja).nome}` : 'Preço base ilustrativo')
    }
    if (event.target.id === 'ordem') {
      state.ordem = event.target.value
      state.limite = 8
      mountOfertas()
    }
    if (event.target.id === 'assunto') state.assunto = event.target.value
  })

  document.addEventListener('submit', handleContatoSubmit)
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (!document.getElementById('dialog').hidden) closeDialog()
    else if (!document.getElementById('lista').hidden) closeLista()
    else if (!document.getElementById('menu').hidden) closeMenu()
  })

  window.addEventListener('scroll', () => {
    document.getElementById('topo').classList.toggle('scrolled', window.scrollY > 4)
  }, { passive: true })
}
