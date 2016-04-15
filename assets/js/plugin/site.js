(function( $ ) {
    "use strict";

    var siteData = JSON.parse( localStorage.getItem( 'adnanco' ) );

    init();

    function changeLanguage( lang ) {
        if ( lang ) {
            $( document.body ).attr( 'data-site-language', lang );
            setData( 'language', lang );
        } else {
            $( document.body ).attr( 'data-site-language', getData( 'language' ) );
        }
    }

    window.changeLang = changeLanguage;

    function getLanguage() {
        return window.navigator.languages.indexOf( 'tr' ) > -1 ? 'tr' : 'en';
    }

    function getData( key ) {
        return siteData[ key ];
    }

    function setData( key, value ) {
        if ( !siteData ) {
            siteData = {
                'language': getLanguage()
            };
            localStorage.setItem( 'adnanco', JSON.stringify( siteData ) );
            return;
        } else if ( !key ) {
            return;
        }

        siteData[ key ] = value;
        localStorage.setItem( 'adnanco', JSON.stringify( siteData ) );
    }

    function init() {
        setData();
        changeLanguage();
    }

    $( function() {
        $( '.NavToggle' ).on( 'click', function( e ) {
            e.preventDefault();
            $( document.body ).toggleClass( 'NavOpen' );
        } );

        $( '.SelectLanguage' ).on( 'click', 'a', function( e ) {
            e.preventDefault();
            changeLanguage( $( this ).data( 'active-lang' ) );
        } );
    } );
}( jQuery ));