(function ($) {
    $(function () {
        window.onresize = resizeBody;
        function resizeBody() {
            $('main#wrapper').css('margin-top', $(window).height());
        }
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        resizeBody();

        $("#nav-mobile").find("li a").each(function (i, e) {
            $(e).click(function (evt) {
                evt.preventDefault();
                var href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(href).position().top -79}, 500);
                return false;
            })
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space