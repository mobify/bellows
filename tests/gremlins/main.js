require(['config'], function() {
    require([
        'gremlins',
        '$',
        'bellows'
    ],
    function(gremlins, $) {
        $('.bellows.default').bellows();

        // Enable active states
        $(document).on('touchstart', function() {});

        gremlins
            .createHorde()
            .gremlin(gremlins.species.clicker().clickTypes(['click'])
            .canClick(function(element) {
                return $(element).parents('.bellows').length;
            }))
            .unleash({ nb: 10000 });
    });
});
