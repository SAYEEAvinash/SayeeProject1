// Function to add items to the cart
function addToCart(itemName, itemPrice, itemImage, quantity) {
    // Validate input data (ensure none of the essential fields are null or empty)
    if (!itemName || !itemPrice || !itemImage || isNaN(quantity) || quantity <= 0) {
        console.error("Invalid item data, cannot add to cart");
        return; // Prevent adding invalid data
    }

    // Retrieve cart from localStorage or initialize an empty array if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === itemName);

    if (existingItemIndex > -1) {
        // If item exists, update the quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If item doesn't exist, create a new item and add to the cart
        const item = {
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: quantity
        };
        cart.push(item);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the cart page after adding the item
    window.location.href = 'cart.html';
}

// Function to display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear existing items

    let totalPrice = 0;

    // Filter out invalid items (null, undefined, empty object, etc.)
    const validCartItems = cart.filter(item => item && item.name && item.price && item.image && item.quantity > 0);

    // If no valid items are found, display an empty cart message
    if (validCartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Iterate over valid items and display them in the cart
        validCartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            `;

            cartContainer.appendChild(cartItemDiv);
            totalPrice += item.price * item.quantity; // Add to total price
        });
    }

    // Update cart summary
    const serviceCharge = 5; // Static service charge
    const grandTotal = totalPrice + serviceCharge;

    document.getElementById('total-price').innerText = `₹${totalPrice.toFixed(2)}`;
    document.getElementById('service-charge').innerText = `₹${serviceCharge}`;
    document.getElementById('grand-total').innerText = `₹${grandTotal.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the cart view after removal
}

// Event listener for Add to Cart button
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.getElementById('add-to-cart-button');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission

            // Get the values from the data attributes and quantity input
            const quantity = parseInt(document.getElementById('quantity').value, 10); // Get quantity value
            const itemId = document.querySelector('#add-to-cart').getAttribute('data-item-id');
            const itemName = document.querySelector('#add-to-cart').getAttribute('data-item-name');
            const itemPrice = parseFloat(document.querySelector('#add-to-cart').getAttribute('data-item-price'));
            const itemImage = document.querySelector('#add-to-cart').getAttribute('data-item-image');

            // Add the item to the cart
            addToCart(itemName, itemPrice, itemImage, quantity);
        });
    }

    
    displayCart();
});

// Function to display the checkout summary
function displayCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutContainer = document.getElementById('checkout-summary');
    checkoutContainer.innerHTML = ''; // Clear existing items

    let totalPrice = 0;

    // Filter out invalid items
    const validCartItems = cart.filter(item => item && item.name && item.price && item.image && item.quantity > 0);

    // If no valid items, display a message
    if (validCartItems.length === 0) {
        checkoutContainer.innerHTML = '<p>Your cart is empty. Please add items to proceed.</p>';
    } else {
        // Iterate over valid items and add them to the summary
        validCartItems.forEach(item => {
            const summaryItemDiv = document.createElement('div');
            summaryItemDiv.classList.add('summary-item');

            summaryItemDiv.innerHTML = `
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;

            checkoutContainer.appendChild(summaryItemDiv);
            totalPrice += item.price * item.quantity;
        });

        // Update total price and service charge
        const serviceCharge = 5; // Static service charge
        const grandTotal = totalPrice + serviceCharge;

        document.getElementById('total-price').innerText = `₹${totalPrice.toFixed(2)}`;
        document.getElementById('service-charge').innerText = `₹${serviceCharge}`;
        document.getElementById('grand-total').innerText = `₹${grandTotal.toFixed(2)}`;
    }
}

// Call this function on the checkout page load
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('checkout-summary')) {
        displayCheckoutSummary();
    }
});

function proceedToCheckout() {
    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    } else {
        // Show alert if user is not logged in
        alert('You are not logged in! Please log in to proceed.');
    }
}
