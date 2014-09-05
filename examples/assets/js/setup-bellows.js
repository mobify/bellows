(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['bellows'], factory);
    } else {
        // Browser globals
        root.setupBellows = factory(window.Zepto || window.jQuery);
    }
}(this, function ($) {

    // Default bellows initialization (/examples/index.html)
    function init() {
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

        $('.bellows.inner-link').bellows();

        // Enable active states
        $(document).on('touchstart', function() {});
    }

    return {
        init: init
    };
}));
