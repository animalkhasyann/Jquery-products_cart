function loadCart(){
     function getCookie(name) {
            const cookieArr = document.cookie.split(";");
            for (let i = 0; i < cookieArr.length; i++) {
                const cookiePair = cookieArr[i].split("=");
                if (cookiePair[0].trim() === name) {
                    return decodeURIComponent(cookiePair[1]);
                }
            }
            return null;
        }

        $(function () {
            const cartStr = getCookie("cart");
            const cart = cartStr ? JSON.parse(cartStr) : [];

            if (cart.length === 0) {
                $('#cartContents').text('Cart is empty.');
            } else {
                $.get('cart_item.html', function (templateHTML) {
                     console.log(templateHTML);
                    cart.forEach(p => {
                        const $item = $(templateHTML);

                        $item.find('.img-cart').attr('src', p.image).attr('alt', p.name);
                        $item.find('.heading-product').text(p.name);
                        $item.find('.brand-title').text(p.manufacturer).attr('href', `https://example.com/brand/${p.manufacturer}`);
                        $item.find('.brand-info span p').text(p.mpn);
                        $item.find('.product-price').text(`$${p.price}`);
                        $item.find('.product-stock').text(p.stock);
                        $item.find('.shipping').text(p.shipping);
                        $item.find('.qty-input').val(p.qty ?? 1);

                        console.log("Rendering product:", p);
                        $('#cartContents').append($item);
                    });
                });
            }
        });
}