function chat() {
    $(document).on('click', '.chatLive', function (e) {
        e.preventDefault();

        if ($('#tawkScript').length) {
            if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
                Tawk_API.maximize();
            }
            return;
        }

        var s1 = document.createElement("script");
        s1.id = "tawkScript";
        s1.async = true;
        s1.src = 'https://embed.tawk.to/688c7eef7058a01927380369/1j1icvlsv';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        document.body.appendChild(s1);

        s1.onload = function () {
            if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
                Tawk_API.maximize();
            }
        };
    });
}
