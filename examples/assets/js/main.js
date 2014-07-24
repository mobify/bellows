require(['config'], function() {
    require([
        'selectorEngine',
        'bellows'
    ],
    function($) {
        $('.bellows.default').bellows();

        $('.bellows.animation').bellows({
            duration: 1000,
            easing: "easeInOutCubic"
        });

        $('.bellows.inception, .bellows.inception .bellows').bellows();

        $('.bellows.single').bellows({
            singleItemOpen: true
        });

        // Enable active states
        $(document).on('touchstart', function() {});
    });
});
