import { mountInicio, renderInicio } from './inicio.js'
import { mountOfertas, renderOfertas } from './ofertas.js'
import { mountFelita, renderFelita } from './felita.js'
import { mountLojas, renderLojas } from './lojas.js'
import { mountNoticias, renderNoticias } from './noticias.js'
import { mountTrabalhe, renderTrabalhe } from './trabalhe.js'
import { mountContato, renderContato } from './contato.js'
import { mountInstitucional, renderInstitucional } from './institucional.js'
import { mountLegal, renderLegal } from './legal.js'

export const views = {
  inicio: { render: renderInicio, mount: mountInicio },
  ofertas: { render: renderOfertas, mount: mountOfertas },
  felita: { render: renderFelita, mount: mountFelita },
  lojas: { render: renderLojas, mount: mountLojas },
  noticias: { render: renderNoticias, mount: mountNoticias },
  trabalhe: { render: renderTrabalhe, mount: mountTrabalhe },
  contato: { render: renderContato, mount: mountContato },
  institucional: { render: renderInstitucional, mount: mountInstitucional },
  privacidade: { render: () => renderLegal('privacidade'), mount: mountLegal },
  cookies: { render: () => renderLegal('cookies'), mount: mountLegal },
}
