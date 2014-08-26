require(['config'], function() {
    require([
        '$',
        'setup-bellows'
    ],
    function($, setupBellows) {
        setupBellows.init();
    });
});
