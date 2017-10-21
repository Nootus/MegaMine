(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            "scripts:": "lib/js/",
            "ngScripts:": "lib/js/@angular/"
        },
        map: {
            // our app is within the app folder
            app: "app",

            // angular bundles
            "@angular/core": "ngScripts:core.umd.js",
            "@angular/common": "ngScripts:common.umd.js",
            "@angular/compiler": "ngScripts:compiler.umd.js",
            "@angular/platform-browser": "ngScripts:platform-browser.umd.js",
            "@angular/platform-browser-dynamic": "ngScripts:platform-browser-dynamic.umd.js",
            "@angular/http": "ngScripts:http.umd.js",
            "@angular/router": "ngScripts:router.umd.js",
            "@angular/forms": "ngScripts:forms.umd.js",
            "@angular/upgrade/static": "ngScripts:upgrade-static.umd.js",

            // other libraries
            "rxjs": "scripts:rxjs",
            "hammerjs": "scripts:hammerjs/hammer.js",
            "angular-in-memory-web-api": "ngScripts:in-memory-web-api.umd.js"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: "./main.js",
                defaultExtension: "js"
            },
            rxjs: {
                defaultExtension: "js"
            }
        }
    });
})(this);
