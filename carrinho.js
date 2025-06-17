document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar produto ao carrinho
    function adicionarAoCarrinho(event) {
        event.preventDefault();
        
        // Obtém o botão clicado
        const botao = event.currentTarget;
        
        // Cria objeto do produto
        const produto = {
            id: botao.getAttribute('data-id'),
            name: botao.getAttribute('data-name'),
            price: `R$ ${parseFloat(botao.getAttribute('data-price')).toFixed(2).replace('.', ',')}`,
            image: botao.getAttribute('data-image'),
            quantity: 1
        };
        
        // Recupera o carrinho existente ou cria um novo
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Verifica se o produto já está no carrinho
        const produtoExistenteIndex = carrinho.findIndex(item => item.id === produto.id);
        
        if (produtoExistenteIndex !== -1) {
            // Se já existe, aumenta a quantidade
            carrinho[produtoExistenteIndex].quantity += 1;
        } else {
            // Se não existe, adiciona novo produto
            carrinho.push(produto);
        }
        
        // Salva no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // Feedback visual
        botao.innerHTML = '<i class="fas fa-check"></i> Adicionado';
        botao.classList.add('btn-success');
        botao.classList.remove('btn-primary');
        
        // Redireciona para o carrinho após 1 segundo
        setTimeout(() => {
            window.location.href = 'carrinho.html';
        }, 1000);
    }
    
    // Adiciona evento de clique a todos os botões
    document.querySelectorAll('.btn-adicionar').forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });
    
    // Atualiza contador do carrinho
    function atualizarContador() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const totalItens = carrinho.reduce((total, item) => total + item.quantity, 0);
        
        // Atualiza no ícone do carrinho
        const contador = document.querySelector('.carrinho-count');
        if (contador) {
            contador.textContent = totalItens;
            contador.style.display = totalItens > 0 ? 'inline-block' : 'none';
        }
    }
    
    // Chama a função ao carregar a página
    atualizarContador();
});