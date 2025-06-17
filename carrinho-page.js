document.addEventListener('DOMContentLoaded', function() {
    // Carrega os itens do carrinho
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaCarrinho = document.getElementById('lista-carrinho');
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    
    // Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        return;
    }
    
    carrinhoVazio.style.display = 'none';
    
    // Variáveis para cálculo do total
    let subtotal = 0;
    
    // Cria os elementos para cada item do carrinho
    listaCarrinho.innerHTML = carrinho.map(item => {
        const preco = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        const totalItem = preco * item.quantity;
        subtotal += totalItem;
        
        return `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.price}</p>
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary diminuir" data-id="${item.id}">-</button>
                                <input type="text" class="form-control text-center quantidade" value="${item.quantity}" data-id="${item.id}">
                                <button class="btn btn-outline-secondary aumentar" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center justify-content-center">
                        <button class="btn btn-danger remover" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Atualiza os totais
    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('total').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    // Adiciona eventos aos botões
    document.querySelectorAll('.diminuir').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            atualizarQuantidade(id, -1);
        });
    });
    
    document.querySelectorAll('.aumentar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            atualizarQuantidade(id, 1);
        });
    });
    
    document.querySelectorAll('.remover').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            removerItem(id);
        });
    });
    
    // Função para atualizar quantidade
    function atualizarQuantidade(id, mudanca) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemIndex = carrinho.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            carrinho[itemIndex].quantity += mudanca;
            
            // Remove se quantidade for menor que 1
            if (carrinho[itemIndex].quantity < 1) {
                carrinho.splice(itemIndex, 1);
            }
            
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            location.reload(); // Recarrega a página para atualizar
        }
    }
    
    // Função para remover item
    function removerItem(id) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const novoCarrinho = carrinho.filter(item => item.id !== id);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        location.reload();
    }
    
    // Finalizar compra
    document.getElementById('finalizar-compra').addEventListener('click', function() {
        alert('Compra finalizada com sucesso!');
        localStorage.removeItem('carrinho');
        location.reload();
    });
});