function loadCart() {
    $(function () {
        if ($.cookie("cartItems") && !$.cookie("items")) {
            const oldCart = $.cookie("cartItems");
            $.cookie("items", oldCart, { expires: 7, path: "/" });
            $.removeCookie("cartItems", { path: "/" });
            console.log('✅ Migrated cartItems → items');
        }
    });
    $(document).ready(function () {
        $('#cartContents').on('click', '.plus', function () {
            const index = $(this).data('index');
            updateQty(index, 1);
        });

        $('#cartContents').on('click', '.minus', function () {
            const index = $(this).data('index');
            updateQty(index, -1);
        });

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
                    $item.find('.brand-title').text(p.manufacturer).attr('href', `https://example.com/brand/${p.manufacturer}`);
                    $item.find('.brand-info span p').text(p.mpn);
                    $item.find('.product-price').text(`$${p.price}`);
                    $item.find('.product-stock').text(p.stock);
                    $item.find('.shipping').text(p.shipping);
                    $item.find('.qty-input').val(p.qty);

                    $item.find('.plus, .minus, .qty-input').attr('data-index', index);
                    $item.find('.btn-close-cart').attr('data-index', index);
                    $('#cartContents').append($item);
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
    function updateQty(index, change, force = null) {
        let cart = $.cookie("items") ? JSON.parse($.cookie("items")) : [];
        if (!cart[index]) return;
        if (force !== null) {
            cart[index].qty = force;
        } else {
            cart[index].qty = Math.max(1, (cart[index].qty ?? 1) + change);
        }

        $.cookie("items", JSON.stringify(cart), { path: '/' });
        loadCartData();
    }
}
