(function ($) {
    $(function () {
        var texts = [];

        $('.PostBody').find('h2, h3').waypoint(function(direction) {
            var $current = $(this.element);

            if ("down" === direction) {
                $('.ActiveSection').fadeOut(function() {
                    texts.push($(".ActiveSection").text());
                    $(this).text($current.text()).fadeIn();
                });
            } else if ("up" === direction) {
                $('.ActiveSection').fadeOut(function() {
                    $(this).text(texts.pop()).fadeIn();
                });
            }
        }, {
            offset: '35%'
        });
    });
}(jQuery));