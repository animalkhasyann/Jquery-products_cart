$(document).ready(function () {
$(function () {
  if ($.cookie("cartItems") && !$.cookie("items")) {
    const oldCart = $.cookie("cartItems");
    $.cookie("items", oldCart, { expires: 7, path: "/" });
    $.removeCookie("cartItems", { path: "/" });
    console.log('✅ Migrated cartItems → items');
  }
});
  function updateCartBadge() {
    let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    $('.cart-badge').text(totalQty);
  }
  updateCartBadge();

  $(window).on('pageshow', function () {
    updateCartBadge();
  });

  $('.add-cart').click(function () {
    const $btn = $(this);
    const $product = $btn.closest('.product');
    const id = $product.data('id');
    const image = $product.data('image');
    const name = $product.data('name');
    const price = parseFloat($product.data('price'));
    const qty = parseInt($product.find('.number-count').val());
    const mpn = $product.data('mpn');
    const shipping = $product.data('shipping');
    const stock = $product.data('stock')
    const manufacturer = $product.data('manufacturer')

    const product = { id, image, name, manufacturer, mpn, price, qty, shipping, stock };

    let cart = [];
    if ($.cookie("items")) {
      cart = JSON.parse($.cookie("items"));
    }
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart[index].qty += qty;
    } else {
      cart.push(product);
    }
    $.cookie("items", JSON.stringify(cart), { expires: 7, path: "/" });
    updateCartBadge();
    $btn.text('ADDED').addClass('added-btn').prop('disabled', true);
    setTimeout(() => {
      $btn.text('ADD TO CART').removeClass('added-btn').prop('disabled', false);
    }, 3000);
  });

});
