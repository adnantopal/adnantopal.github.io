(function( $ ) {
    "use strict";

    $( function() {
        $( '.NavToggle' ).on( 'click', function( e ) {
            e.preventDefault();
            $( document.body ).toggleClass( 'NavOpen' );
        } );
    } );
}( jQuery ));