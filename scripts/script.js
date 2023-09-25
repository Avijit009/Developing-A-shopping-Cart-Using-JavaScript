// List of product
const products = [
    {
      id: 'product-1',
      image: 'images/men-chino-pants-beige.jpg',
      name: 'Men chino pants beige',
      priceCents: 1090,
    },
    {
      id: 'product-2',
      image: 'images/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      name: 'Adults plain cotton tshirt',
      priceCents: 790,
    },
    {
      id: 'product-3',
      image: 'images/men-athletic-shoes-green.jpg',
      name: 'Men athletic shoes',
      priceCents: 890,
    },
    {
      id: 'product-4',
      image: 'images/athletic-cotton-socks-6-pairs.jpg',
      name: 'Athletic cotton socks 6 pairs',
      priceCents: 699,
    },
    {
      id: 'product-5',
      image: 'images/men-cozy-fleece-zip-up-hoodie-red.jpg',
      name: 'Men chino pants beige',
      priceCents: 1199,
    },
    {
      id: 'product-6',
      image: 'images/men-navigator-sunglasses-brown.jpg',
      name: 'Men navigator sunglasses',
      priceCents: 1599,
    },
  ];
  
  // Check if localStorage is available
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  
  //Load product on the page
  let productsHTML = '';
  
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product">
          <img class="product-image" src="${product.image}" alt="men-pant">
        </div>
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-price">
          $${((product.priceCents) / 100).toFixed(2)}
        </div>
        <div class="cart-manager">
          <button class="cart-btn add-to-cart" data-product-id="${product.id}">Add to cart</button>
        </div>
      </div> `;
  });
  
  document.querySelector('.product-grid').innerHTML = productsHTML;
  
  function addToCart(productId) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }
  
    saveToStorage();
  }
  
  function updateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector('.added-cart-quantity').innerHTML = cartQuantity;
  }
  
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
  
  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function deleteCartItem(productId) {
    const newCart = [];
  
    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    cart = newCart;
  
    saveToStorage();
  }
  
  //Load product into the cart after adding
  let cartSummaryHTML = '';
  
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
  
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
  
    cartSummaryHTML += `
      <div class="cart-item-container cart-item-container-${matchingProduct.id}">
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${((matchingProduct.priceCents) / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="delete-quantity-link link-primary delete-link" data-product-id='${matchingProduct.id}'>
                Remove
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  document.querySelector('.list-cart').innerHTML = cartSummaryHTML;
  
  document.querySelectorAll('.delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      deleteCartItem(productId);
  
      const container = document.querySelector(`.cart-item-container-${productId}`);
      container.remove();
    });
  });
  
// Update cart quantity on page load
updateCartQuantity(); 

// Function to update and show cart content
function updateCartContent() {
    let cartContentHTML = '';
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
      
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
      
        cartContentHTML += `
            <div class="cart-item-container cart-item-container-${matchingProduct.id}">
                <!-- Cart item details here -->
            </div>
        `;
    });
    
    const cartContentContainer = document.querySelector('.cart-content');
    cartContentContainer.innerHTML = cartContentHTML;
    
    // Show the cart content
    cartContentContainer.style.display = 'block';
}

// Add a click event listener to the cart icon
cartIcon.addEventListener('click', () => {
    // Toggle the display property of the cart content
    const cartContentContainer = document.querySelector('.cart-content');
    if (cartContentContainer.style.display === 'none') {
        // If the cart content is hidden, update and show it
        updateCartContent();
    } else {
        // If the cart content is visible, hide it
        cartContentContainer.style.display = 'none';
    }
});
