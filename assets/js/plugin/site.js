(function ($) {
    "use strict";
    
    $(function () {
        $(document.body).on('click', '.NavToggle', function(e) {
            e.preventDefault();
            
            $(document.body).toggleClass('NavOpen');
        });
    });
}(jQuery));