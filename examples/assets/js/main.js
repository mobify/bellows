require(['config'], function() {
    require([
        '$',
        'bellows'
    ],
    function($) {
        // Default bellows initialization (/examples/default.html)
        $('.bellows.default').bellows();

        // Bellows with custom animation duration and easing (/examples/animation.html)
        $('.bellows.animation').bellows({
            duration: 1000,
            easing: "easeInOutCubic"
        });

        // Bellows within bellows within bellows... (/examples/inception.html)
        $('.bellows.inception, .bellows.inception .bellows').bellows();

        // Bellows with single item open (/examples/single.html)
        $('.bellows.single').bellows({
            singleItemOpen: true
        });

        // Enable active states
        $(document).on('touchstart', function() {});
    });
});
