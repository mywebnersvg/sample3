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
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenav").style.left = "40px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.left = "-20%";
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
});
document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("products")) || [];
  const bothProductsContainer = document.getElementById("bothProducts");
  const productCardTemplate = document.getElementById("productCardTemplate");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestionsBox");
  const searchInputOutside = document.getElementById("searchInputOutside");
  const suggestionsBoxOutside = document.getElementById("suggestionsBoxOutside");

  function displayProducts(filteredProducts = productData) {
      bothProductsContainer.innerHTML = "";

      if (filteredProducts.length > 0) {
          filteredProducts.forEach((product) => {
              const { name, price, images, discount, category } = product;

              // Only display products with category "Both"
              if (category === "Both") {
                  const productCard = productCardTemplate.content.cloneNode(true);

                  productCard.querySelector(".accessorieName").textContent = name;
                  productCard.querySelector(".accessoriePrice").textContent = price;
                  productCard.querySelector(".accessorieDiscount").textContent = discount ? `${discount}%` : "";

                  const imageContainer = productCard.querySelector(".acessorieImg");
                  if (images && images.length > 0) {
                      const img = document.createElement("img");
                      img.src = images[0];
                      img.alt = name;
                      imageContainer.appendChild(img);
                  }

                  const productButton = productCard.querySelector("button");
                  productButton.addEventListener("click", () => {
                      localStorage.setItem("selectedProduct", JSON.stringify(product));
                      window.location.href = "acessorieDetail.html";
                  });

                  // Append the product card to the container
                  bothProductsContainer.appendChild(productCard);
              }
          });
      } else {
          bothProductsContainer.innerHTML = `<p>No products available.</p>`;
      }
  }

  function showSuggestions(filteredProducts, suggestionsBox) {
      suggestionsBox.innerHTML = "";
      if (filteredProducts.length > 0) {
          filteredProducts.forEach(product => {
              const suggestion = document.createElement("div");
              suggestion.textContent = product.name;
              suggestion.classList.add("suggestion");
              suggestion.addEventListener("click", () => {
                  searchInput.value = product.name;
                  searchInputOutside.value = product.name;
                  displayProducts([product]);
                  suggestionsBox.classList.add("hidden");
                  suggestionsBoxOutside.classList.add("hidden");
              });
              suggestionsBox.appendChild(suggestion);
          });
          suggestionsBox.classList.remove("hidden");
      } else {
          suggestionsBox.classList.add("hidden");
      }
  }

  // Event listener for the search input inside the navbar
  searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      console.log("Search Term (inside):", searchTerm); // Debugging
      if (searchTerm === "") {
          displayProducts();
          suggestionsBox.classList.add("hidden");
      } else {
          const filteredProducts = productData.filter(product => 
              product.name.toLowerCase().includes(searchTerm)
          );
          console.log("Filtered Products (inside):", filteredProducts); // Debugging
          displayProducts(filteredProducts);
          showSuggestions(filteredProducts, suggestionsBox);
      }
  });

  // Event listener for the search input outside the navbar
  searchInputOutside.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      console.log("Search Term (outside):", searchTerm); // Debugging
      if (searchTerm === "") {
          displayProducts();
          suggestionsBoxOutside.classList.add("hidden");
      } else {
          const filteredProducts = productData.filter(product => 
              product.name.toLowerCase().includes(searchTerm)
          );
          console.log("Filtered Products (outside):", filteredProducts); // Debugging
          displayProducts(filteredProducts);
          showSuggestions(filteredProducts, suggestionsBoxOutside);
      }
  });

  displayProducts();
});



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

