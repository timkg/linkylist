var twitter = require('ntwitter');
var credentials = require('./api-keys.js').twitter;

var t = new twitter(credentials);

t.stream(
    'statuses/filter',
    { 
        track: ['frontend', 'html5', 'css3', 'javascript'],
        follow: ['timkg']
    },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet);
        });
    }
);