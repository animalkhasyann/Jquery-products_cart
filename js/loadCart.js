function loadCart() {
    $(function () {
        if ($.cookie("cartItems") && !$.cookie("items")) {
            const oldCart = $.cookie("cartItems");
            $.cookie("items", oldCart, { expires: 7, path: "/" });
            $.removeCookie("cartItems", { path: "/" });
        }
    });
    $(document).ready(function () {
       
        $('#cartContents').on('click', '.btn-close-cart', function () {
            const index = $(this).data('index');
            $('#delete-cart-input').val(index);
            $('.modal').show();
        });
        $('#cartContents').on('change', '.qty-input', function () {
            const index = $(this).data('index');
            const newQty = parseInt($(this).val());

            if (!isNaN(newQty) && newQty >= 1) {
                updateQty(index, 0, newQty);
            } else {
                $(this).val(1);
                updateQty(index, 0, 1);
            }
        });
        loadCartData();

        $('#deletecart .btn-checkout').on('click', function () {
            $('.modal').hide();
        });

        $('#deletecart .btn-gocheckout').on('click', function () {
            const index = parseInt($('#delete-cart-input').val());
            let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];

            if (cart[index]) {
                cart.splice(index, 1);
                if (cart.length === 0) {
                    $.removeCookie("items", { path: '/' });
                } else {
                    $.cookie("items", JSON.stringify(cart), { path: '/' });
                }
            }
            $('#deletecart').hide();
            loadCartData();
        });
    });

    function loadCartData() {
        const cartStr = $.cookie("items");
        const cart = cartStr ? JSON.parse(cartStr) : [];
        let subtotal = 0;
        let totalQty = 0;

        $('#cartContents').empty();

        if (cart.length === 0) {
            $('#cartContents').text('Cart is empty.');
            $('.bordered-block span').text('$0.00');
            $('.cart-badge').text(0);
        } else {
            $.get('cart_item.html', function (templateHTML) {
                cart.forEach((p, index) => {
                    const $item = $(templateHTML);
                    const qty = p.qty;
                    const price = parseFloat(p.price);
                    const itemTotal = qty * price;
                    subtotal += itemTotal;
                    totalQty += qty
                    $('.cart-badge').text(totalQty);
                    $item.find('.img-cart').attr('src', p.image).attr('alt', p.name);
                    $item.find('.heading-product').text(p.name);
                    $item.find('.brand-title').text(p.manufacturer).attr('href', `https://hvhindustrial.com/brand/${p.manufacturer}`);
                    $item.find('.brand-info span p').text(p.mpn);
                    $item.find('.product-price').text(`$${p.price}`);
                    $item.find('.product-stock').text(p.stock);
                    $item.find('.shipping').text(p.shipping);
                    $item.find('.qty-input').val(p.qty);
                    $item.find('.plus, .minus, .qty-input').attr('data-index', index);
                    $item.find('.btn-close-cart').attr('data-index', index);
                    $('#cartContents').append($item);

                      $item.find('.minus').on('click', function () {
                        updateQty(index, -1);
                    });

                    $item.find('.plus').on('click', function () {
                        updateQty(index, 1);
                    });

                });
                $('.bordered-block span').text(`$${subtotal.toFixed(2)}`);
                updateCartBadge();
            });
            updateCartBadge();
            
        }
    }
    function updateCartBadge() {
        let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
        let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        $('.cart-badge').text(totalQty);
    }
    function updateCartSubtotal() {
    let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.qty * item.price;
    });
    $('.bordered-block span').text(`$${subtotal.toFixed(2)}`);
    }
    function updateCartInputs() {
  
    let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
    $('.qty-input').each(function(index) {
        if (cart[index]) {
            $(this).val(cart[index].qty);
        }
    });
    }
    function updateQty(index, change, force = null) {

        let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
        if (!cart[index]) return;
        if (force !== null) {
            cart[index].qty = force;
        } else {
            cart[index].qty = Math.max(1, (cart[index].qty ?? 1) + change);
        }
        $.cookie("items", JSON.stringify(cart), { path: '/' });
        updateCartBadge();
        updateCartSubtotal();
         updateCartInputs();
    }
   
}

loadCart();



// function loadCart() {
//     $(function () {
//         if ($.cookie("cartItems") && !$.cookie("items")) {
//             const oldCart = $.cookie("cartItems");
//             $.cookie("items", oldCart, { expires: 7, path: "/" });
//             $.removeCookie("cartItems", { path: "/" });
//         }
//     });
//     $(document).ready(function () {


//         $('#cartContents').on('click', '.btn-close-cart', function () {
//             const index = $(this).data('index');
//             $('#delete-cart-input').val(index);
//             $('.modal').show();
//         });
//         $('#cartContents').on('change', '.qty-input', function () {
//             const index = $(this).data('index');
//             const newQty = parseInt($(this).val());

//             if (!isNaN(newQty) && newQty >= 1) {
//                 updateQty(index, 0, newQty);
//             } else {
//                 $(this).val(1);
//                 updateQty(index, 0, 1);
//             }
//         });
//         loadCartData();

//         $('#deletecart .btn-checkout').on('click', function () {
//             $('.modal').hide();
//         });

//         $('#deletecart .btn-gocheckout').on('click', function () {
//             const index = parseInt($('#delete-cart-input').val());
//             let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];

//             if (cart[index]) {
//                 cart.splice(index, 1);
//                 if (cart.length === 0) {
//                     $.removeCookie("items", { path: '/' });
//                 } else {
//                     $.cookie("items", JSON.stringify(cart), { path: '/' });
//                 }
//             }
//             $('#deletecart').hide();
//             loadCartData();
//         });
//     });

//     function loadCartData() {
//         const cartStr = $.cookie("items");
//         const cart = cartStr ? JSON.parse(cartStr) : [];
//         let subtotal = 0;
//         let totalQty = 0;
//         let qty;
//         $('#cartContents').empty();

//         if (cart.length === 0) {
//             $('#cartContents').text('Cart is empty.');
//             $('.bordered-block span').text('$0.00');
//             $('.cart-badge').text(0);
//         } else {
//             $.get('cart_item.html', function (templateHTML) {
//                 cart.forEach((p, index) => {
//                     const $item = $(templateHTML);
//                     qty = parseFloat(p.qty);
//                     const price = parseFloat(p.price);
//                     const itemTotal = qty * price;
//                     subtotal += itemTotal;
//                     totalQty += qty
//                     $('.cart-badge').text(totalQty);
//                     $item.find('.img-cart').attr('src', p.image).attr('alt', p.name);
//                     $item.find('.heading-product').text(p.name);
//                     $item.find('.brand-title').text(p.manufacturer).attr('href', `https://hvhindustrial.com/brand/${p.manufacturer}`);
//                     $item.find('.brand-info span p').text(p.mpn);
//                     $item.find('.product-price').text(`$${p.price}`);
//                     $item.find('.product-stock').text(p.stock);
//                     $item.find('.shipping').text(p.shipping);
//                     $item.find('.qty-input').val(p.qty);
//                     $item.find('.plus, .minus, .qty-input').attr('data-index', index);
//                     $item.find('.btn-close-cart').attr('data-index', index);
//                     $item.find('.plus, .minus').attr('type', 'button');
//                     $('#cartContents').append($item);
//                 });

//                 $('.bordered-block span').text(`$${subtotal.toFixed(2)}`);
//                 updateCartBadge();
//                 function updateQty(index, change, force = null) {

//                     // let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
//                     if (!cart[index]) return;
//                     if (force !== null) {
//                         cart[index].qty = force;
//                     } else {
//                         cart[index].qty = Math.max(1, (cart[index].qty ?? 1) + change);
//                         if(change===1){
//                             qty++;
//                         }else{
//                             qty--;
//                         }
//                         totalQty += change;
//                         // qty+=change
//                     }
//                     $.cookie("items", JSON.stringify(cart), { path: '/' });
//                     $('.bordered-block span').text(`$${subtotal.toFixed(2)}`);
//                     $('.cart-badge').text(totalQty);
//                     $('.qty-input').val(qty);
//                 }
//                 $('#cartContents').on('click', '.plus', function (e) {
//                     e.preventDefault();
//                     const index = $(this).data('index');
//                     updateQty(index, 1);
//                 });

//                 $('#cartContents').on('click', '.minus', function (e) {
//                     e.preventDefault();
//                     const index = $(this).data('index');
//                     updateQty(index, -1);
//                 });


//             });
//             updateCartBadge();
//         }
//     }
//     function updateCartBadge() {
//         let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
//         let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
//         $('.cart-badge').text(totalQty);
//     }

// }

// loadCart();







// function loadCart() {
//     $(function () {
//         if ($.cookie("cartItems") && !$.cookie("items")) {
//             const oldCart = $.cookie("cartItems");
//             $.cookie("items", oldCart, { expires: 7, path: "/" });
//             $.removeCookie("cartItems", { path: "/" });
//         }
//     });
//     $(document).ready(function () {
       
//         $('#cartContents').on('click', '.btn-close-cart', function () {
//             const index = $(this).data('index');
//             $('#delete-cart-input').val(index);
//             $('.modal').show();
//         });
//         $('#cartContents').on('change', '.qty-input', function () {
//             const index = $(this).data('index');
//             const newQty = parseInt($(this).val());

//             if (!isNaN(newQty) && newQty >= 1) {
//                 updateQty(index, 0, newQty);
//             } else {
//                 $(this).val(1);
//                 updateQty(index, 0, 1);
//             }
//         });
//         loadCartData();

//         $('#deletecart .btn-checkout').on('click', function () {
//             $('.modal').hide();
//         });

//         $('#deletecart .btn-gocheckout').on('click', function () {
//             const index = parseInt($('#delete-cart-input').val());
//             let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];

//             if (cart[index]) {
//                 cart.splice(index, 1);
//                 if (cart.length === 0) {
//                     $.removeCookie("items", { path: '/' });
//                 } else {
//                     $.cookie("items", JSON.stringify(cart), { path: '/' });
//                 }
//             }
//             $('#deletecart').hide();
//             loadCartData();
//         });
//     });

//     function loadCartData() {
//         const cartStr = $.cookie("items");
//         const cart = cartStr ? JSON.parse(cartStr) : [];
//         let subtotal = 0;
//         let totalQty = 0;

//         $('#cartContents').empty();

//         if (cart.length === 0) {
//             $('#cartContents').text('Cart is empty.');
//             $('.bordered-block span').text('$0.00');
//             $('.cart-badge').text(0);
//         } else {
//             $.get('cart_item.html', function (templateHTML) {
//                 cart.forEach((p, index) => {
//                     const $item = $(templateHTML);
//                     const qty = p.qty;
//                     const price = parseFloat(p.price);
//                     const itemTotal = qty * price;
//                     subtotal += itemTotal;
//                     totalQty += qty
                   
//                     $item.find('.img-cart').attr('src', p.image).attr('alt', p.name);
//                     $item.find('.heading-product').text(p.name);
//                     $item.find('.brand-title').text(p.manufacturer).attr('href', `https://hvhindustrial.com/brand/${p.manufacturer}`);
//                     $item.find('.brand-info span p').text(p.mpn);
//                     $item.find('.product-price').text(`$${p.price}`);
//                     $item.find('.product-stock').text(p.stock);
//                     $item.find('.shipping').text(p.shipping);
//                     $item.find('.qty-input').val(p.qty);
//                     $item.find('.plus, .minus, .qty-input').attr('data-index', index);
//                     $item.find('.btn-close-cart').attr('data-index', index);
               
//                     $item.find('.minus').on('click', function () {
//                         updateQty(index, -1, $(this));
                   
//                     });

//                     // Event: Plus button
//                     $item.find('.plus').on('click', function () {
//                         updateQty(index, 1, $(this));
//                     });

//                     $('#cartContents').append($item);
//                 });

//                 $('.bordered-block span').text(`$${subtotal.toFixed(2)}`);
//                  $('.cart-badge').text(totalQty);
//                 updateCartBadge();

//             });
//             updateCartBadge();
//         }
//     }
//     function updateQty(index, change, $btn) {
//     let cart = JSON.parse(getCookie("items") || "[]");
   
//     let item = cart[index];
//     item.qty = Math.max(1, (item.qty ?? 1) + change);

//     // Save updated cart to cookie
//     document.cookie = `items=${encodeURIComponent(JSON.stringify(cart))}; path=/`;

//     // Update only this item in the DOM
//     const $cartItem = $btn.closest('.cart-item'); // Make sure your item template has class `.cart-item`
//     $cartItem.find('.qty-input').val(item.qty);
//     $cartItem.find('.product-price').text(`$${(item.price * item.qty).toFixed(2)}`);

//     // Update subtotal and badge
//     let subtotal = 0;
//     let totalQty = 0;
//     cart.forEach(p => {
//         subtotal += p.price * p.qty;
//         totalQty += p.qty;
//     });

//     $('.bordered-block span').text(`$${subtotal.toFixed(2)}`);
//     $('.cart-badge').text(totalQty);

// }

//     function updateCartBadge() {
//         let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
//         let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
//         $('.cart-badge').text(totalQty);
//     }

// }

// loadCart();