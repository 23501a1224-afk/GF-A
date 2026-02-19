let categories = [
    "bangle","bracelet","chain","earring","ring",
    "footwear","makeup","skincare","western","ethnic"
];

let productsContainer = document.getElementById("products");
let cart = [];

categories.forEach(category => {

    createProduct(category.toUpperCase(), category + ".jpg", category);

    for (let i = 1; i <= 10; i++) {
        createProduct(
            category + " Model " + i,
            category + "-model" + i + ".jpg",
            category
        );
    }
});

function createProduct(name, image, category) {

    let price = Math.floor(Math.random() * 2000) + 300;

    let card = document.createElement("div");
    card.className = "card " + category;

    card.innerHTML = `
        <img src="images/${image}">
        <h3>${name}</h3>
        <p class="price">₹${price}</p>
        <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
}

function addToCart(name, price) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCart();
}

function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `
            <p>
                ${item.name} 
                (₹${item.price}) 
                x ${item.qty}
                <button onclick="increaseQty('${item.name}')">+</button>
                <button onclick="decreaseQty('${item.name}')">-</button>
            </p>
        `;
    });

    cartTotal.innerText = total;
    cartCount.innerText = count;
}

function increaseQty(name) {
    let item = cart.find(p => p.name === name);
    item.qty++;
    updateCart();
}

function decreaseQty(name) {
    let item = cart.find(p => p.name === name);
    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.name !== name);
    }

    updateCart();
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function filterCategory(category) {

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else {
            card.style.display = card.classList.contains(category) ? "block" : "none";
        }
    });
}

function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let total = document.getElementById("cart-total").innerText;
    document.getElementById("final-amount").innerText = total;

    document.getElementById("payment-section").style.display = "block";
}

function finishPayment() {

    let name = document.getElementById("cust-name").value;
    let address = document.getElementById("cust-address").value;
    let phone = document.getElementById("cust-phone").value;

    if (name === "" || address === "" || phone === "") {
        alert("Please fill all customer details!");
        return;
    }

    alert("Payment Successful!\n\nOrder Confirmed!\n\nThank you " + name + "!");

    cart = [];
    updateCart();

    document.getElementById("payment-section").style.display = "none";

    document.getElementById("cust-name").value = "";
    document.getElementById("cust-address").value = "";
    document.getElementById("cust-phone").value = "";

    toggleCart();
}
