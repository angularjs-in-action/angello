module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-messages.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-route.js',
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.js',
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-mocks.js',
          'https://cdn.firebase.com/js/client/2.3.2/firebase.js',
          'https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js',
          'https://cdn.auth0.com/js/lock-7.min.js',
          'https://cdn.auth0.com/w2/auth0-angular-4.js',
          'vendor/sugar-1.4.1.min.js',
          'vendor/angular-storage.js',
          'vendor/angular-jwt.js',
          'src/angello/**/*.js',
          'tests/**/*.js',
          '**/*.html'
        ],

        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
