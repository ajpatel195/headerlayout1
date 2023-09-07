// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      jasmineHtmlReporter: {
        suppressAll: true // removes the duplicated traces
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage/headerlayout1'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ],
        fixWebpackSourcePaths: true,
        check: {
          global: {
            lines: 90,
          },
        },
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['MyHeadlessChrome'],
  
      customLaunchers: {
        MyHeadlessChrome: {
          base: 'ChromeHeadless',
          flags: ['--disable-translate', '--disable-extensions', '--remote-debugging-port=9223', '--no-sandbox']
        }
      },
      singleRun: true,
      restartOnFileChange: true
    });
  };
  