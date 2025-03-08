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
  document.getElementById("mySidenav").style.width = "195px";
  document.getElementById("mySidenav").style.left = "16px";
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
        </svg> <p> Logout </p>
      `;
    } else {
      profileLink.href = "./login.html";
      profileLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="iconNav" id="loginIcon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg> <p> Login </p>
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

  const productsPerPage = 15;
  let currentPage = 1;

  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  function displayProducts(filteredProducts = productData) {
    bothProductsContainer.innerHTML = "";

      // Filter products by category "Girls"
      const bothProducts = filteredProducts.filter(product => product.category === "Both");
      console.log("Both Products:", bothProducts); // Debugging

      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const paginatedProducts = bothProducts.slice(startIndex, endIndex);

      if (paginatedProducts.length > 0) {
          paginatedProducts.forEach((product) => {
              const { name, price, images, discount } = product;

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

              bothProductsContainer.appendChild(productCard);
          });
      } else {
          bothProductsContainer.innerHTML = `<p>No products available.</p>`;
      }

      updatePaginationControls(bothProducts.length);
  }

  function updatePaginationControls(totalProducts) {
      const totalPages = Math.ceil(totalProducts / productsPerPage);
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

      prevPageButton.disabled = currentPage === 1;
      nextPageButton.disabled = currentPage === totalPages;
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
                  displayProducts([product]);
                  suggestionsBox.classList.add("hidden");
              });
              suggestionsBox.appendChild(suggestion);
          });
          suggestionsBox.classList.remove("hidden");
      } else {
          suggestionsBox.classList.add("hidden");
      }
  }

  searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm === "") {
          displayProducts();
          suggestionsBox.classList.add("hidden");
      } else {
          const filteredProducts = productData.filter(product => 
              product.name.toLowerCase().includes(searchTerm)
          );
          displayProducts(filteredProducts);
          showSuggestions(filteredProducts, suggestionsBox);
      }
  });

  searchInputOutside.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm === "") {
          displayProducts();
          suggestionsBoxOutside.classList.add("hidden");
      } else {
          const filteredProducts = productData.filter(product => 
              product.name.toLowerCase().includes(searchTerm)
          );
          displayProducts(filteredProducts);
          showSuggestions(filteredProducts, suggestionsBoxOutside);
      }
  });

  prevPageButton.addEventListener("click", () => {
      if (currentPage > 1) {
          currentPage--;
          displayProducts();
      }
  });

  nextPageButton.addEventListener("click", () => {
      const totalPages = Math.ceil(productData.filter(product => product.category === "Both").length / productsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          displayProducts();
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

