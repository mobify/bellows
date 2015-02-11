define([
    '$'
], function($) {

    var $body = $(document.body);

    var setUp = function(fixture, setUpComplete) {
        var $frame = $('<iframe />').attr('src', '/tests/fixtures/' + fixture + '.html');

        var $oldiFrame = $body.find('iframe');

        if ($oldiFrame.length) {
            $oldiFrame.replaceWith($frame);
        } else {
            $body.append($frame);
        }

        // listen for messages from the loaded iframe
        $(window).one('message', function() {
            var frameWindow = $frame[0].contentWindow;

            // once the iframe is loaded, call back to the parent,
            // passing through the required dependencies
            setUpComplete(frameWindow.$, frameWindow.dependencies);
        });
    };

    return {
        setUp: setUp
    }
});