/// <binding />
"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    inject = require("gulp-inject"),
    watch = require("gulp-watch"),
    typescript = require("gulp-tsc"),
    del = require("del"),
    file = require('gulp-file'),
    tslint = require("gulp-tslint"),
    flatten = require('gulp-flatten');

var webroot = "./wwwroot/";
var paths = {
    appJs: [webroot + "app/extensions/Annotations.js",
        webroot + "app/App.js",
        webroot + "app/**/*.js",
        "!" + webroot + "app/AppModule.js",
        "!" + webroot + "app/Main.js",
        "!" + webroot + "app/AppRoutingModule.js",
        "!" + webroot + "app/MigrationUrlHandlingStrategy.js",
        "!" + webroot + "app/RootComponent.js",
        "!" + webroot + "app/UserComponent.js",
        "!" + webroot + "app/AppComponent.js"
],
    scriptsJs: [webroot + "scripts/jquery.js"
                    , webroot + "scripts/angular/angular.js"
                    , webroot + "scripts/angular/angular-messages.js"
                    , webroot + "scripts/angular/angular-animate.js"
                    , webroot + "scripts/angular/angular-aria.js"
                    , webroot + "scripts/angular/angular-material.js"
                    , webroot + "scripts/angular/angular-ui-router.js"
                    , webroot + "scripts/charting/d3.js"
                    , webroot + "scripts/charting/nv.d3.js"
                    , webroot + "scripts/charting/angular-nvd3.js"
                    , webroot + "scripts/charting/angular-gridster.js"
                    , webroot + "scripts/ui-grid.js"
                    , webroot + "scripts/moment.js"
                    , webroot + "scripts/toastr.js"
                    , webroot + "scripts/pdfmake/pdfmake.js"
                    , webroot + "scripts/pdfmake/vfs_fonts.js"
    ],
    appCss: [webroot + "content/ui-grid/ui-grid.css" 
                , webroot + "content/angular-material.css"
                , webroot + "content/charting/nv.d3.css"
                , webroot + "content/charting/angular-gridster.min.css"
                , webroot + "content/toastr.css"

                , webroot + "content/app.css"
                , webroot + "content/icons.css"
                , webroot + "content/app/layout.css"
                , webroot + "content/app/grid.css"
                , webroot + "content/app/dialog.css"
                , webroot + "content/app/loading.css"
                , webroot + "content/app/widget.css"
                , webroot + "content/app/chart.css"
                , webroot + "content/app/mdOverrides.css"
    ],

    destAppJs: webroot + "js/app.min.js",
    destScriptJs: webroot + "js/scripts.min.js",
    destCss: webroot + "css/app.min.css"
};

gulp.task('clean-js', function () {
    //del([webroot + "app/**/*.js*"]);
});

gulp.task("clean", ["clean-js"], function (cb) {
    del(paths.destAppJs);
    del(paths.destScriptJs);
    del(paths.destCss);
    del(webroot + "css/**/*", function (err) { });
});

gulp.task("copy", function (cb) {
    gulp.src([webroot + "content/images/**/*"], { base: webroot + "content" })
       .pipe(gulp.dest(webroot + "css"));
    gulp.src([webroot + "content/ui-grid/**/*", "!" + webroot + "content/ui-grid/**/*.css"], { base: webroot + "content/ui-grid" })
       .pipe(gulp.dest(webroot + "css"));
});

gulp.task("min", function () {
    gulp.src(paths.appJs, { base: "." })
            .pipe(concat(paths.destAppJs))
            .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest("."));
    gulp.src(paths.scriptsJs, { base: "." })
            .pipe(concat(paths.destScriptJs))
            .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest("."));
    gulp.src(paths.appCss)
            .pipe(concat(paths.destCss))
            .pipe(cssmin())
            .pipe(gulp.dest("."));
});

gulp.task("all", ["clean", "min", "copy"]);

gulp.task("injectJsFileCreate", function () {
    var str = '<!-- inject:js -->\n'
        + '<!-- endinject -->';

    return file('AppJsReferences.cshtml', str, { src: true })
    .pipe(gulp.dest('./views/home'));
});

gulp.task('injectJS', ["injectJsFileCreate"], function () {

    var target = gulp.src('./views/home/AppJsReferences.cshtml');
    var sources = gulp.src(paths.appJs, { read: false });
    return target.pipe(inject(sources, {
        transform: function (filepath, file, i, length) {
            return '<script src="' + filepath.replace('/wwwroot/', '~/') + '"></script>';
        }
    }))
    .pipe(gulp.dest('./views/home'));
});

gulp.task('default', ["injectJsFileCreate"], function () {
    watch(paths.appJs, function (file) {
        if (file.event === "add" || file.event === 'unlink') {
            gulp.start("injectJS");
        }
    });
});

gulp.task("tslint", function () {
    gulp.src(webroot + "/app/**/**.ts")
        .pipe(tslint({
            formatter: "msbuild"
        }))
        .pipe(tslint.report({
            emitError: false,
            reportLimit: 0,
            summarizeFailureOutput: true
        }));
});

gulp.task("SystemJS", function () {

    var files;

    // systemjs
    files = [
        "./node_modules/core-js/client/shim.min.js",
        "./node_modules/core-js/client/shim.min.js.map",
        "./node_modules/zone.js/dist/zone.js",
        "./node_modules/reflect-metadata/Reflect.js",
        "./node_modules/reflect-metadata/Reflect.js.map",
        "./node_modules/systemjs/dist/system.src.js"
    ];
    gulp.src(files, { base: "." })
        .pipe(flatten())
        .pipe(gulp.dest(webroot + "lib/js/systemjs"));

    files = [
        "./node_modules/@angular/core/bundles/core.umd.js",
        "./node_modules/@angular/core/bundles/core.umd.js.map",
        "./node_modules/@angular/common/bundles/common.umd.js",
        "./node_modules/@angular/common/bundles/common.umd.js.map",
        "./node_modules/@angular/compiler/bundles/compiler.umd.js",
        "./node_modules/@angular/compiler/bundles/compiler.umd.js.map",
        "./node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
        "./node_modules/@angular/platform-browser/bundles/platform-browser.umd.js.map",
        "./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
        "./node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js.map",
        "./node_modules/@angular/http/bundles/http.umd.js",
        "./node_modules/@angular/http/bundles/http.umd.js.map",
        "./node_modules/@angular/router/bundles/router.umd.js",
        "./node_modules/@angular/router/bundles/router.umd.js.map",
        "./node_modules/@angular/forms/bundles/forms.umd.js",
        "./node_modules/@angular/forms/bundles/forms.umd.js.map",
        "./node_modules/@angular/upgrade/bundles/upgrade-static.umd.js",
        "./node_modules/@angular/upgrade/bundles/upgrade-static.umd.js.map",
        "./node_modules/@angular/material/bundles/material.umd.js",
        "./node_modules/@angular/flex-layout/bundles/flex-layout.umd.js"
    ];
    gulp.src(files, { base: "." })
        .pipe(flatten())
        .pipe(gulp.dest(webroot + "lib/js/@angular"));

    // angular css
    files = [
        "./node_modules/@angular/material/core/theming/prebuilt/indigo-pink.css"
    ];
    gulp.src(files, { base: "." })
        .pipe(flatten())
        .pipe(gulp.dest(webroot + "lib/css/@angular"));


    // angularjs
    files = [
        "./node_modules/angular/angular.js",
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-ui-grid/ui-grid.js",
        "./node_modules/angular-ui-grid/ui-grid.min.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.min.js"
    ];
    gulp.src(files, { base: "." })
        .pipe(flatten())
        .pipe(gulp.dest(webroot + "lib/js/angularjs"));

    // angularjs css
    files = [
        "./node_modules/angular-ui-grid/ui-grid.css",
        "./node_modules/angular-ui-grid/ui-grid.svg",
        "./node_modules/angular-ui-grid/ui-grid.ttf",
        "./node_modules/angular-ui-grid/ui-grid.woff"
    ];
    gulp.src(files, { base: "." })
        .pipe(flatten())
        .pipe(gulp.dest(webroot + "lib/css/angularjs"));

    // copy rx
    gulp.src(["./node_modules/rxjs/**/*.js", "./node_modules/rxjs/**/*.js.map"], { base: "./node_modules/rxjs" })
        .pipe(gulp.dest(webroot + "lib/js/rxjs"));

    // copy hammerjs
    gulp.src(["./node_modules/hammerjs/hammer.js"], { base: "./node_modules/hammerjs" })
        .pipe(gulp.dest(webroot + "lib/js/hammerjs"));
});

