export function renderLista() {
  return `<header class="page-head">
    <p class="kicker">Minha lista</p>
    <h1>Sua lista, pronta para a gôndola.</h1>
    <p class="lead">O total é ilustrativo e acompanha a unidade escolhida. Nada sai deste aparelho até você enviar pelo seu WhatsApp.</p>
  </header>
  <section class="lista-page">
    <ol class="passos">
      <li><b>1</b><span>Adicione os produtos</span></li>
      <li><b>2</b><span>Compare o total</span></li>
      <li><b>3</b><span>Envie para você ou para a família</span></li>
    </ol>
    <div class="cupom cupom-grande" data-receipt></div>
    <p><a class="btn btn-line" href="#ofertas">Ver ofertas combinadas</a></p>
  </section>`
}

export function mountLista() {}
