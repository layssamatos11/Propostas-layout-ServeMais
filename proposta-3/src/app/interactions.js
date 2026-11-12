import { paintQty } from '../components/product-card.js'
import { closeDialog, closeMenu, openDialog, openMenu } from '../components/overlays.js'
import { toast } from '../components/toast.js'
import { lojaById } from '../data/lojas.js'
import { dialOrCopy, openDirections } from '../domain/hours.js'
import { qtyOf, setQty } from '../state/store.js'
import { slug } from '../lib/format.js'
import { campanhaById } from '../pages/ofertas.js'
import { validateContato } from '../pages/contato.js'
import { validateJob } from '../pages/trabalhe.js'
import { forceRender } from './router.js'

function go(hash) {
  if (location.hash !== hash) location.hash = hash
  else forceRender()
}

const actions = {
  'open-menu': openMenu,
  'close-menu': closeMenu,
  'close-dialog': closeDialog,
  social() {
    toast('O perfil oficial da rede ainda será informado.')
  },
  canal(el) {
    const copy = {
      telefone: 'O telefone oficial ainda será informado.',
      email: 'O e-mail oficial ainda será informado.',
      redes: 'Os perfis oficiais ainda serão informados.',
    }
    toast(copy[el.dataset.canal] || 'Canal a informar.')
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
  qtd(el) {
    const id = el.dataset.id
    setQty(id, qtyOf(id) + Number(el.dataset.d))
    paintQty()
  },
  campanha(el) {
    const camp = campanhaById(el.dataset.campanha)
    if (!camp) return
    openDialog(camp.nome, `<p>${camp.texto}</p>`)
  },
  cat(el) {
    const cat = el.dataset.cat
    go(cat === 'Todas' ? '#ofertas' : `#ofertas/${slug(cat)}`)
  },
  cidade(el) {
    const cidade = el.dataset.cidade
    go(cidade === 'Todas' ? '#lojas' : `#lojas/${slug(cidade)}`)
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
}

export function startInteractions() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#menu a')) closeMenu()
    if (event.target.id === 'dialog') {
      closeDialog()
      return
    }
    const el = event.target.closest('[data-act]')
    if (!el || !actions[el.dataset.act]) return
    actions[el.dataset.act](el)
  })

  document.addEventListener('submit', (event) => {
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
    }
    if (event.target.id === 'jobForm') {
      event.preventDefault()
      const error = validateJob(event.target)
      const box = document.getElementById('jobErr')
      const ok = document.getElementById('jobOk')
      if (error) {
        box.textContent = error
        ok.textContent = ''
        return
      }
      box.textContent = ''
      ok.innerHTML = '<span class="success">Currículo conferido neste aparelho. O envio ainda é demonstrativo.</span>'
      event.target.reset()
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
