import { renderContato, mountContato } from './contato.js'
import { renderFelita, mountFelita } from './felita.js'
import { renderInicio, mountInicio } from './inicio.js'
import { renderLegal, mountLegal } from './legal.js'
import { renderLista, mountLista } from './lista.js'
import { renderLojas, mountLojas } from './lojas.js'
import { renderNoticias, mountNoticias } from './noticias.js'
import { renderOfertas, mountOfertas } from './ofertas.js'
import { renderTrabalhe, mountTrabalhe } from './trabalhe.js'

export const views = {
  inicio: { render: renderInicio, mount: mountInicio },
  ofertas: { render: renderOfertas, mount: mountOfertas },
  lista: { render: renderLista, mount: mountLista },
  felita: { render: renderFelita, mount: mountFelita },
  lojas: { render: renderLojas, mount: mountLojas },
  noticias: { render: renderNoticias, mount: mountNoticias },
  trabalhe: { render: renderTrabalhe, mount: mountTrabalhe },
  contato: { render: renderContato, mount: mountContato },
  privacidade: { render: () => renderLegal('privacidade'), mount: mountLegal },
  cookies: { render: () => renderLegal('cookies'), mount: mountLegal },
}
