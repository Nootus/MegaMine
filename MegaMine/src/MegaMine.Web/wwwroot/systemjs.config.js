/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'scripts:': 'scripts/angular2/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'scripts:core.umd.js',
            '@angular/common': 'scripts:common.umd.js',
            '@angular/compiler': 'scripts:compiler.umd.js',
            '@angular/platform-browser': 'scripts:platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'scripts:platform-browser-dynamic.umd.js',
            '@angular/http': 'scripts:http.umd.js',
            '@angular/router': 'scripts:router.umd.js',
            '@angular/forms': 'scripts:forms.umd.js',
            '@angular/upgrade/static': 'scripts:upgrade-static.umd.js',

            // other libraries
            'rxjs': 'scripts/rxjs',
            'angular-in-memory-web-api': 'scripts:in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);
