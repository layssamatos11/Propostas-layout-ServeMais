import { contatoPage, mountContato } from './contato.js'
import { felitaPage, mountFelita } from './felita.js'
import { inicioPage, mountInicio } from './inicio.js'
import { institucionalPage, mountInstitucional } from './institucional.js'
import { listaPage, mountLista } from './lista.js'
import { lojasPage, mountLojas } from './lojas.js'
import { mountNoticias, noticiasPage } from './noticias.js'
import { mountOfertas, ofertasPage } from './ofertas.js'
import { mountTrabalhe, trabalhePage } from './trabalhe.js'

export const views = {
  inicio: { render: inicioPage, mount: mountInicio },
  ofertas: { render: ofertasPage, mount: mountOfertas },
  felita: { render: felitaPage, mount: mountFelita },
  lojas: { render: lojasPage, mount: mountLojas },
  noticias: { render: noticiasPage, mount: mountNoticias },
  trabalhe: { render: trabalhePage, mount: mountTrabalhe },
  contato: { render: contatoPage, mount: mountContato },
  lista: { render: listaPage, mount: mountLista },
  institucional: { render: institucionalPage, mount: mountInstitucional },
}
