// Retrieve cart data from local storage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart count in the navigation bar
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = itemCount;
}

// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemImageUrl) {
  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      size: "L", // Default size is L
      imageUrl: itemImageUrl, // Add image URL to cart item
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Bind "Add to Cart" buttons on the homepage
function initializeAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button, index) => {
    const itemElement = button.parentElement;
    const itemName = itemElement.querySelector("p").textContent; // Get product name
    const itemPrice = parseInt(
      itemElement.querySelector(".price").textContent.replace("₹", "")
    ); // Get product price
    const itemImageUrl = itemElement.querySelector("img").src; // Get product image URL

    button.addEventListener("click", () =>
      addToCart(itemName, itemPrice, itemImageUrl)
    );
  });
}

// Function to load cart items (for cart.html)
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
      <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image" />
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

  // Add event listeners for size buttons to manage highlighting
  const sizeButtons = document.querySelectorAll(".size-button");
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const siblingButtons =
        button.parentElement.querySelectorAll(".size-button");
      siblingButtons.forEach((sibling) => sibling.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// Function to update the size of an item
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

// Initialize the cart and "Add to Cart" buttons on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeAddToCartButtons();
  updateCartCount();
  if (document.body.contains(document.getElementById("cartItemsContainer"))) {
    loadCartItems();
  }
});
