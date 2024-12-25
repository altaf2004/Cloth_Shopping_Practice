// Initialize the cart (use localStorage to persist cart items)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update the cart count in the header
function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

// Add item to cart functionality for each product
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const itemName =
      this.previousElementSibling.previousElementSibling.innerText; // Get item name
    const itemPrice = this.previousElementSibling.innerText; // Get item price

    cart.push({ name: itemName, price: itemPrice });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
});

// Update cart count when page loads
updateCartCount();
