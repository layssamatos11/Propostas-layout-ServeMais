import './styles/main.css'
import { startInteractions } from './app/interactions.js'
import { startRouter } from './app/router.js'

if (sessionStorage.getItem('sm2-demo') === 'off') {
  document.getElementById('demo').hidden = true
}

startInteractions()
startRouter()
