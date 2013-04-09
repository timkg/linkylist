var dev = {
	domain: 'http://localhost',
	port: 5000,
};
dev.url = dev.domain + ':' + dev.port;

var prod = {
	domain: 'http://hidden-retreat-7932.herokuapp.com',
	port: process.env.PORT || 0
};
prod.url = prod.domain + ':' + prod.port;

if(process.argv[2] === 'PRODUCTION') {
	exports.host = prod;
} else {
	exports.host = dev;
}