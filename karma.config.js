// karma.conf.js  --  karma configuration

// if you import your existing 'webpack.config.js' setup here,
// be sure to read the note about 'entry' below.

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            // all files ending in "_test"
            'src/*.js',
            'src/**/*.js'
            // each file acts as entry point for the webpack configuration
        ],
        preprocessors: {
            'src/*.js': ['webpack'],
            'src/**/*.js': ['webpack']
        },
        webpack: {
            // you don't need to specify the entry option because
            // karma watches the test entry points
            // webpack watches dependencies
            devtool: 'inline-source-map'
            // ... remainder of webpack configuration (or import)
        },

        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },
        browsers : ['PhantomJS', 'PhantomJS_custom'],
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    },
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },
        plugins: [
            require("karma-webpack"),
            require("karma-phantomjs-launcher"),
            require("jasmine-webpack-plugin"),
            require("karma-jasmine")
        ]

    });
};