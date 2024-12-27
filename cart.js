// Variables to hold cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1, size: "L" }); // Default size L
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Function to load cart items into the cart.html page
function loadCartItems() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartTotalElement = document.getElementById("cartTotal");

  cartItemsContainer.innerHTML = ""; // Clear current items
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
      <div class="size-buttons">
        <button class="size-button ${
          item.size === "L" ? "active" : ""
        }" onclick="updateSize(${index}, 'L')">L</button>
        <button class="size-button ${
          item.size === "XL" ? "active" : ""
        }" onclick="updateSize(${index}, 'XL')">XL</button>
        <button class="size-button ${
          item.size === "XXL" ? "active" : ""
        }" onclick="updateSize(${index}, 'XXL')">XXL</button>
      </div>
      <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = total;
}

// Function to update size
function updateSize(index, newSize) {
  cart[index].size = newSize;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
  updateCartCount();
}

// Event listeners for adding items
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const itemElement = button.closest(".cart-item");
    const itemName = itemElement.querySelector("p").textContent;
    const itemPrice = parseInt(
      itemElement.querySelector(".price").textContent.replace("₹", "")
    );
    addToCart(itemName, itemPrice);
  });
});

// Initialize cart on page load
if (document.body.contains(document.getElementById("cartItemsContainer"))) {
  loadCartItems();
}
updateCartCount();
