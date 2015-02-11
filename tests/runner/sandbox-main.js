
require(['sandbox-config'], function() {
    require([
        '$',
        'velocity',
        'plugin',
        'bellows'
    ],
        function($) {
            window.dependencies = {
                $: $
            };

            window.parent.postMessage('loaded', '*');
        });
});
