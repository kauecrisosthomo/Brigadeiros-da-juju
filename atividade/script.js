document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const cart = document.querySelector('.cart');
    const toggleCartButton = document.getElementById('toggle-cart');

    toggleCartButton.addEventListener('click', function () {
        cart.classList.toggle('cart-visible');
    });

    let cartItemsList = {}; // Objeto para armazenar os itens do carrinho

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        for (const itemName in cartItemsList) {
            const item = cartItemsList[itemName];
            const itemPrice = parseFloat(item.price);
            const itemQuantity = parseInt(item.quantity);

            let itemTotalPrice = itemPrice * itemQuantity;

            if (!isNaN(itemPrice) && itemPrice > 0) {
                total += itemTotalPrice;
            } else {
                if (itemName.toLowerCase().includes('casamento')) {
                    itemTotalPrice = 150 * itemQuantity;
                    total += itemTotalPrice; // Adiciona o valor do item de casamento ao total
                } else if (itemName.toLowerCase().includes('festas')) {
                    itemTotalPrice = 100 * itemQuantity;
                    total += itemTotalPrice; // Adiciona o valor do item de festas ao total
                } else {
                    itemTotalPrice = 0; // Define um valor zero para itens inválidos
                }
            }

            if (itemTotalPrice > 0) {
                const cartItem = document.createElement('li');
                cartItem.textContent = `${itemName} - Quantidade: ${itemQuantity} - Total: R$ ${itemTotalPrice.toFixed(2)}`;
                cartItems.appendChild(cartItem);
            }
        }

        totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;

        if (Object.keys(cartItemsList).length > 0) {
            cart.classList.add('cart-visible');
        } else {
            cart.classList.remove('cart-visible');
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const parentItem = this.parentElement;
            const itemName = parentItem.querySelector('h2').textContent;
            const itemPrice = parseFloat(parentItem.getAttribute('data-price'));
            const quantity = parseInt(parentItem.querySelector('input').value);

            if (!isNaN(itemPrice) && quantity > 0) {
                if (cartItemsList[itemName]) {
                    cartItemsList[itemName].quantity += quantity;
                } else {
                    cartItemsList[itemName] = {
                        price: itemPrice,
                        quantity: quantity
                    };
                }

                updateCart();
            }
        });
    });
});