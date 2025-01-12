let cartItems = document.querySelector(".cart-items");

function toggleCart() {
    let cart = document.querySelector(".cart");
    cart.classList.toggle("collapse");
}

function addToCart(productTitle, productPrice) {

    // Convert NodeList of cart items into an array
    // let cartItemTitles = Array.from(cartItems.querySelectorAll(".cart-item-title"));

    let cartItemTitles = cartItems.querySelectorAll(".cart-item-title");
    let list = Array.from(cartItemTitles);

    // Check if the product is already in the cart
    // let isPresent = cartItemTitles.some(item => item.textContent === productTitle);
    let isPresent = list.some(item => item.textContent === productTitle);


    if (!isPresent) {
        // Create new cart item
        let cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <span class="cart-item-title">${productTitle}</span>
            <span class="cart-item-price">${productPrice}</span>
            <div class="cart-item-qty">
                <button class="qty-btn">-</button>
                <span>1</span>
                <button class="qty-btn">+</button>
            </div>
        `;

        // Append to the cart
        cartItems.appendChild(cartItem);
    } else {
        alert("This product is already in the cart!");
    }
}
