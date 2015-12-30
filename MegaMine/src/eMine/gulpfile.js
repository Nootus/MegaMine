/// <binding />
"use strict";

var gulp = require("gulp"),
        rimraf = require("rimraf"),
        concat = require("gulp-concat"),
        cssmin = require("gulp-cssmin"),
        uglify = require("gulp-uglify"),
        gutil = require('gulp-util');

var webroot = "./wwwroot/";
var paths = {
    appJs: [webroot + "app/app.js", webroot + "app/**/*.js"],
    scriptsJs: [webroot + "scripts/jquery.js"
                    , webroot + "scripts/angular/angular.js"
                    , webroot + "scripts/angular/angular-messages.js"
                    , webroot + "scripts/angular/angular-animate.js"
                    , webroot + "scripts/angular/angular-aria.js"
                    , webroot + "scripts/angular/angular-material.js"
                    , webroot + "scripts/angular/angular-ui-router.js"
                    , webroot + "scripts/pdfmake/pdfmake.js"
                    , webroot + "scripts/pdfmake/vfs_fonts.js"
                    , webroot + "scripts/ui-grid.js"
                    , webroot + "scripts/moment.js"
                    , webroot + "scripts/toastr.js"
    ],
    appCss: [webroot + "content/ui-grid/ui-grid.css" 
                , webroot + "content/angular-material.css"
                , webroot + "content/toastr.css"
                , webroot + "content/app.css"
                , webroot + "content/icons.css"
    ],

    destAppJs: webroot + "js/app.min.js",
    destScriptJs: webroot + "js/scripts.min.js",
    destCss: webroot + "css/app.min.css",
};

gulp.task("clean", function (cb) {
    rimraf(paths.destAppJs, function (err) { });
    rimraf(paths.destScriptJs, function (err) { });
    rimraf(paths.destCss, function (err) { });
    rimraf(webroot + "css/**/*", function (err) { });
});

gulp.task("copy", function (cb) {
    gulp.src([webroot + "content/images/**/*"], { base: webroot + "content" })
       .pipe(gulp.dest(webroot + "css"));
    gulp.src([webroot + "content/ui-grid/**/*", "!" + webroot + "content/ui-grid/**/*.css"], { base: webroot + "content/ui-grid" })
       .pipe(gulp.dest(webroot + "css"));
})

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
