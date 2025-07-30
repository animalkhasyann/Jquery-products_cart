$(document).ready(function () {
  updateCartCount();

  $('.add-cart').click(function () {
    const $btn = $(this);
    const $product = $btn.closest('.product');
    const id = $product.data('id');
    const image=$product.data('image');
    const name = $product.data('name');
    const price = parseFloat($product.data('price'));
    const qty = parseInt($product.find('.number-count').val());

    const product = { id, image, name, price, qty };

    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart[index].qty += qty;
    } else {
      cart.push(product);
    } 
    sessionStorage.setItem('cart', JSON.stringify(cart));
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=86400`;
    updateCartCount();
    $btn.text('ADDED') .addClass('added-btn').prop('disabled', true);
    setTimeout(() => {
      $btn.text('ADD TO CART').removeClass('added-btn').prop('disabled', false);
    }, 3000);
  });
  function updateCartCount() {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    $('.cart-badge').text(totalQty);
  }
});
