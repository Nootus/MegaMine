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

//gulp.task("clean:all", function (cb) {
//    rimraf([paths.destAppJs, paths.destScriptJs, paths.destCss], cb);
//    //return gulp.src([paths.destAppJs, paths.destScriptJs, paths.destCss], { read: false })
//    //   .pipe(rimraf());
//})

gulp.task("clean:app:js", function (cb) {
    rimraf(paths.destAppJs, cb);
});

gulp.task("clean:scripts:js", function (cb) {
    rimraf(paths.destScriptJs, cb);
});

gulp.task("clean:js", ["clean:app:js", "clean:scripts:js"]);


gulp.task("clean:css", function (cb) {
    rimraf(paths.destCss, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("app:min:js", function () {
    return gulp.src(paths.appJs, { base: "." })
            .pipe(concat(paths.destAppJs))
            .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest("."));
});

gulp.task("scripts:min:js", function () {
    return gulp.src(paths.scriptsJs, { base: "." })
            .pipe(concat(paths.destScriptJs))
            .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest("."));
});

gulp.task("min:css", function () { 
    return gulp.src(paths.appCss)
            .pipe(concat(paths.destCss))
            .pipe(cssmin())
            .pipe(gulp.dest("."));
});

gulp.task("min", ["app:min:js", "scripts:min:js", "min:css"]);
gulp.task("all", ["clean", "min"]);
