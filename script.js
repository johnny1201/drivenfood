function adicionaSelecao(seletor) {
    const elementos = document.querySelectorAll(seletor);
    const botaoPedido = document.querySelector('button');

    elementos.forEach(elemento => {
        elemento.addEventListener('click', function() {
            // Remova a classe 'selecionado' de todos os elementos dentro do grupo
            elementos.forEach(el => {
                el.classList.remove('selecionado');
                el.querySelector('ion-icon').style.display = 'none';
            });

            // Adicione a classe 'selecionado' ao elemento clicado
            elemento.classList.add('selecionado');
            elemento.querySelector('ion-icon').style.display = 'block';
            const primeiroSelecionado = document.querySelector('.primeiro .pratos .prato.selecionado');
            const bebidaSelecionada = document.querySelector('.bebida .pratos .prato.selecionado');
            const sobremesaSelecionada = document.querySelector('.sobremesa .pratos .prato.selecionado');
            if (primeiroSelecionado && bebidaSelecionada && sobremesaSelecionada) {
                botaoPedido.disabled = false;
                botaoPedido.classList.add('botaoverde');
                botaoPedido.innerHTML = "Fechar pedido";
            } else {
                botaoPedido.disabled = true;
                botaoPedido.classList.remove('botaoverde');
                botaoPedido.style.backgroundColor = '';
            }
        });
    });
}
adicionaSelecao('.primeiro .pratos .prato');
adicionaSelecao('.bebida .pratos .prato');
adicionaSelecao('.sobremesa .pratos .prato');

function montaCard(){
    // Seleciona os itens selecionados em cada categoria
    const primeiroSelecionado = document.querySelector('.primeiro .pratos .prato.selecionado');
    const bebidaSelecionada = document.querySelector('.bebida .pratos .prato.selecionado');
    const sobremesaSelecionada = document.querySelector('.sobremesa .pratos .prato.selecionado');
    
    // Seleciona o card e torna visível
    const ligarCard = document.querySelector('.dados');
    ligarCard.style.display = 'flex';
    
    // Função para extrair informações do prato selecionado
    function extrairInformacoes(itens) {
        if (itens) {
            const nomePrato = itens.querySelector('h3').textContent;
            const preco = itens.querySelector('h4').textContent.replace('R$ ', '');
            return { nomePrato, preco: parseFloat(preco.replace(',', '.')) };
        } else {
            console.log('Nenhum item selecionado.');
            return null;
        }
    }
    
    // Extrai informações dos itens selecionados
    const primeiroInfo = extrairInformacoes(primeiroSelecionado);
    const bebidaInfo = extrairInformacoes(bebidaSelecionada);
    const sobremesaInfo = extrairInformacoes(sobremesaSelecionada);
    
    // Atualiza o conteúdo do card
    if (primeiroInfo) {
        document.querySelector('.card .comida').textContent = primeiroInfo.nomePrato;
        document.querySelector('.card .precocomida').textContent = `R$ ${primeiroInfo.preco.toFixed(2)}`;
    }
    if (bebidaInfo) {
        document.querySelector('.card .liquido').textContent = bebidaInfo.nomePrato;
        document.querySelector('.card .precobebida').textContent = `R$ ${bebidaInfo.preco.toFixed(2)}`;
    }
    if (sobremesaInfo) {
        document.querySelector('.card .doce').textContent = sobremesaInfo.nomePrato;
        document.querySelector('.card .precodoce').textContent = `R$ ${sobremesaInfo.preco.toFixed(2)}`;
    }
    
    // Calcula o preço total
    const totalPreco = (primeiroInfo?.preco || 0) + (bebidaInfo?.preco || 0) + (sobremesaInfo?.preco || 0);
    document.querySelector('.card .total p').textContent = `R$ ${totalPreco.toFixed(2)}`;
}


function retorna (){
    const ligarCard = document.querySelector('.dados');
    ligarCard.style.display = 'none';
}


function enviarMensagem(){
    const comida = document.querySelector('.comida').textContent;
    const bebida = document.querySelector('.liquido').textContent;
    const sobremesa = document.querySelector('.doce').textContent;
    const total = document.querySelector('.total p').textContent
    const mensagem = 'Olá, gostaria de fazer o pedido:\n - Prato: ${comida} \n - Bebida: ${bebida} \n - Sobremesa: ${sobremesa} \n TOTAL: R$ ${total}';
    const mensagemCodificada = encodeURIComponent(mensagem);
    const urlWhatsApp = `https://wa.me/5512982849463?text=${mensagemCodificada}`;
    window.location.href = urlWhatsApp;
}
