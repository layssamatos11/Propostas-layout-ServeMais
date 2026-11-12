import { mountContato, contatoPage } from './contato.js'
import { institucionalPage, mountInstitucional } from './institucional.js'
import { inicioPage, mountInicio } from './inicio.js'
import { lojasPage, mountLojas } from './lojas.js'
import { mountOfertas, ofertasPage } from './ofertas.js'
import { mountSetores, setoresPage } from './setores.js'

export const views = {
  inicio: { render: inicioPage, mount: mountInicio },
  ofertas: { render: ofertasPage, mount: mountOfertas },
  lojas: { render: lojasPage, mount: mountLojas },
  setores: { render: setoresPage, mount: mountSetores },
  institucional: { render: institucionalPage, mount: mountInstitucional },
  contato: { render: contatoPage, mount: mountContato },
}
