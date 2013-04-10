// Karma configuration
// Generated on Thu Apr 04 2013 23:13:58 GMT+0100 (WEST)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
// included: false means that they will be served/accessible,
// but not directly loaded via <script> tags
files = [
  'http://localhost:5000/socket.io/socket.io.js',
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  'node_modules/expect.js/expect.js',

  // files that should be accessible, but not loaded directly via script tags - needed for requirejs
  {pattern: 'client/vendors/jquery.js', included: false},
  {pattern: 'client/vendors/lo-dash.js', included: false},
  {pattern: 'client/vendors/backbone.js', included: false},
  {pattern: 'client/src/**/**.js', included: false},
  {pattern: 'client/src/**/**/**.js', included: false},

  'client/test/main-test.js'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = [];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
