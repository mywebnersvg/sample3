// Modal Logic
window.onclick = function (event) {
  const loginModal = document.getElementById("loginModal");
  const signUpModal = document.getElementById("signUpModal");

  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === signUpModal) {
    signUpModal.style.display = "none";
  }
};

// Open and Close Navigation
const mainHome = document.getElementById("mainHome");
console.log(mainHome); // Should log the mainHome element

function openNav() {
  document.getElementById("mySidenav").style.width = "195px";
  document.getElementById("mySidenav").style.left = "16px";
  document.getElementById("mainHome").style.zIndex = "-1"; // Ensure it's visible
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.left = "-20%";
  document.getElementById("mainHome").style.zIndex = "auto";
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Update the profile link based on login status
  const profileLink = document.querySelector("#profileLink");
  if (profileLink) {
    if (isLoggedIn) {
      profileLink.href = "./logout.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> Logout
      `;
    } else {
      profileLink.href = "./login.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> Login
      `;
    }
  }

  // Load and display products
  const productData = JSON.parse(localStorage.getItem("products")) || [];
  const boysProductsContainer = document.getElementById("boysProducts");
  const girlsProductsContainer = document.getElementById("girlsProducts");
  const bothProductsContainer = document.getElementById("bothProducts");
  const productCardTemplate = document.getElementById("productCardTemplate");

  function displayProducts() {
    // Clear all containers before displaying products
    boysProductsContainer.innerHTML = "";
    girlsProductsContainer.innerHTML = "";
    bothProductsContainer.innerHTML = "";
  
    // Sort products by timestamp in descending order (latest first)

  
    // Reverse the sortedProducts array to display in reverse order
    const reversedProducts = productData.reverse();
  
    if (reversedProducts.length > 0) {
      reversedProducts.forEach((product, index) => {
        const { name, price, images, discount, category, description } = product;
        const productCard = productCardTemplate.content.cloneNode(true);
  
        // Populate the product card
        productCard.querySelector(".product-name").textContent = name;
        productCard.querySelector(".product-price").textContent = price;
        const discountElement = productCard.querySelector(".product-discount");
        discountElement.textContent = discount ? `${discount}%` : "No";
        productCard.querySelector(".product-description").textContent = description || "No description available";
  
        const imageContainer = productCard.querySelector(".image-container");
        images.forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = "Product Image";
          imageContainer.appendChild(img);
        });
  
        // Add delete functionality
        const deleteButton = productCard.querySelector("svg");
        deleteButton.addEventListener("click", () => {
          const updatedProducts = productData.filter((_, i) => i !== index);
          productData.length = 0;
          productData.push(...updatedProducts);
          localStorage.setItem("products", JSON.stringify(updatedProducts));
          displayProducts(); // Refresh the display
        });
  
        // Append the product card to the correct container based on category
        if (category === "Boys") {
          boysProductsContainer.appendChild(productCard);
        } else if (category === "Girls") {
          girlsProductsContainer.appendChild(productCard);
        } else if (category === "Both") {
          bothProductsContainer.appendChild(productCard);
        }
      });
    } else {
      // If no products are found, display a message in all containers
      boysProductsContainer.innerHTML = `<p>No products found for Boys.</p>`;
      girlsProductsContainer.innerHTML = `<p>No products found for Girls.</p>`;
      bothProductsContainer.innerHTML = `<p>No products found for Both.</p>`;
    }
  }

  // Initial display of products
  displayProducts();

  // Load and display orders
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersContainer = document.createElement("div");
  ordersContainer.id = "ordersContainer";
  document.body.appendChild(ordersContainer);

  function displayOrders() {
    ordersContainer.innerHTML = ""; // Clear previous orders

    if (orders.length > 0) {
      orders.forEach((order, index) => {
        const orderCard = document.createElement("div");
        orderCard.className = "order-card";
        orderCard.innerHTML = `
          <h2>Order #${index + 1}</h2>
          <p><strong>Name:</strong> ${order.name}</p>
          <p><strong>Phone:</strong> ${order.phoneNumber}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>City:</strong> ${order.city}</p>
          <p><strong>Address:</strong> ${order.address}</p>
          <p><strong>Product:</strong> ${order.productName}</p>
          <p><strong>Quantity:</strong> ${order.quantity}</p>
          <p><strong>Color:</strong> ${order.selectedColor}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice}</p>
          <div class="order-images"></div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="delete-icon" style="width: 24px; height: 24px; cursor: pointer;">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        `;

        const imagesContainer = orderCard.querySelector(".order-images");
        order.productImages.forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = "Order Image";
          img.style.width = "100px"; // Adjust as needed
          imagesContainer.appendChild(img);
        });

        // Add delete functionality
        const deleteIcon = orderCard.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", () => {
          deleteOrder(index);
        });

        ordersContainer.appendChild(orderCard);
      });
    } else {
      ordersContainer.innerHTML = `<p>No orders found.</p>`;
    }
  }

  function deleteOrder(index) {
    // Remove the order at the specified index
    orders.splice(index, 1);

    // Update localStorage with the new orders array
    localStorage.setItem("orders", JSON.stringify(orders));

    // Refresh the orders display
    displayOrders();
  }

  // Initial display of orders
  displayOrders();
});

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("input[type='search']");
  const suggestionsBox = document.getElementById("suggestionsBox");
  const searchButton = document.getElementById("searchButton");

  // Load products from localStorage
  const productData = JSON.parse(localStorage.getItem("products")) || [];

  // Function to filter products based on search query
  function filterProducts(query) {
    if (!query) {
      suggestionsBox.innerHTML = ""; // Clear when input is empty
      suggestionsBox.classList.add("hidden");
      return;
    }

    const filteredProducts = productData.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    // Display results
    displaySuggestions(filteredProducts);
  }

  // Function to display filtered products
  function displaySuggestions(products) {
    suggestionsBox.innerHTML = ""; // Clear previous suggestions

    if (products.length === 0) {
      suggestionsBox.innerHTML = "<p>No matching products found.</p>";
    } else {
      products.forEach(product => {
        const suggestion = document.createElement("div");
        suggestion.classList.add("suggestionItem");
        suggestion.textContent = product.name;
        suggestion.addEventListener("click", () => {
          searchInput.value = product.name; // Set input to selected product
          suggestionsBox.innerHTML = ""; // Clear suggestions
          suggestionsBox.classList.add("hidden");
        });
        suggestionsBox.appendChild(suggestion);
      });
    }

    suggestionsBox.classList.remove("hidden"); // Show suggestions
  }

  // Attach event listeners
  searchInput.addEventListener("input", (e) => {
    filterProducts(e.target.value);
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.add("hidden");
    }
  });

  // Enable search button click functionality
  searchButton.addEventListener("click", () => {
    filterProducts(searchInput.value);
  });
});

// Marquee animation
const marqueeText = document.querySelector('.marquee-text');
let position = window.innerWidth;

function animateMarquee() {
    position -= 2; // Adjust speed by changing the decrement value
    if (position < -marqueeText.offsetWidth) {
        position = window.innerWidth; // Reset position after it moves out
    }
    marqueeText.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateMarquee);
}

animateMarquee();

// Cart count functionality
document.addEventListener("DOMContentLoaded", () => {
  // Function to update the cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;
  }

  // Update cart count on page load
  updateCartCount();

  // Optionally, you can listen for changes in localStorage to update the cart count dynamically
  window.addEventListener("storage", (event) => {
    if (event.key === "cart") {
      updateCartCount();
    }
  });
});