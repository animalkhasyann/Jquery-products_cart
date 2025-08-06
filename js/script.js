$(document).ready(function () {
$(function () {
  if ($.cookie("cartItems") && !$.cookie("items")) {
    const oldCart = $.cookie("cartItems");
    $.cookie("items", oldCart, { expires: 7, path: "/" });
    $.removeCookie("cartItems", { path: "/" });
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
    let $btn = $(this);
    let $product = $btn.closest('.product');
    let id = $product.data('id');
    let image = $product.data('image');
    let name = $product.data('name');
    let price = parseFloat($product.data('price'));
    let qty = parseInt($product.find('.number-count').val());
    let mpn = $product.data('mpn');
    let shipping = $product.data('shipping');
    let stock = $product.data('stock')
    let manufacturer = $product.data('manufacturer')

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
