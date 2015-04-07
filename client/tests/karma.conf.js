module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'vendor/angular.js',
            'vendor/angular-route.js',
            'vendor/angular-animate.js',
            'vendor/angular-mocks.js',
            'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular-messages.min.js',
            'https://cdn.firebase.com/v0/firebase.js',
            'https://cdn.firebase.com/libs/angularfire/0.6.0/angularfire.min.js',
            'https://cdn.auth0.com/js/lock-6.js',
            'vendor/angular-storage.js',
            'https://cdn.auth0.com/w2/auth0-angular-4.js',
            'vendor/angular-jwt.js',
            'src/angello/**/*.js',
            'tests/**/*.js',
            '**/*.html'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            //stripPrefix: 'public/',
            //stripSufix: '.ext',
            // prepend this to the
            //prependPrefix: 'served/',

            moduleName: 'Angello.Templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
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


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
