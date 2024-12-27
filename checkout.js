// Load cart data from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to display cart items in the order summary
function loadOrderSummary() {
  const orderSummaryItems = document.getElementById("orderSummaryItems");
  const orderTotalElement = document.getElementById("orderTotal");

  orderSummaryItems.innerHTML = ""; // Clear current items
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");

    orderItem.innerHTML = `
      <div class="item-details">
        <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
        <p>Size: ${item.size}</p>
      </div>
    `;
    orderSummaryItems.appendChild(orderItem);
  });

  orderTotalElement.textContent = total;
}

// Update the cart count in the navigation bar
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = itemCount;
}

// Initialize the checkout page
document.addEventListener("DOMContentLoaded", () => {
  loadOrderSummary();
  updateCartCount();

  // Handle form submission
  const checkoutForm = document.getElementById("checkoutForm");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you for your order!");

    // Clear the cart after successful checkout
    localStorage.removeItem("cart");
    updateCartCount();
    window.location.href = "index.html"; // Redirect to homepage
  });
});
