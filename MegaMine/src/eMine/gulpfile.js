"use strict";

var gulp = require("gulp"),
        rimraf = require("rimraf"),
        concat = require("gulp-concat"),
        cssmin = require("gulp-cssmin"),
        uglify = require("gulp-uglify"),
        gutil = require('gulp-util');

var webroot = "./wwwroot/";
var paths = {
    appJs: webroot + "app/**/*.js",
    scriptsJs: webroot + "scripts/**/*.js",
    ignoreJs: webroot + "scripts/**/*.min.js",
    appCss: webroot + "content/**/*.css",
    ignoreCss: webroot + "content/**/*.min.css",
    destAppJs: webroot + "js/app.min.js",
    destScriptJs: webroot + "js/scripts.min.js",
    destCss: webroot + "css/app.min.css"
};
    
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
    return gulp.src([paths.appJs], { base: "." })
            .pipe(concat(paths.destAppJs))
            //.pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest("."));
});

gulp.task("scripts:min:js", function () {
    return gulp.src([paths.scriptsJs, "!" + paths.ignoreJs], { base: "." })
            .pipe(concat(paths.destScriptJs))
            .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest("."));
});

gulp.task("min:css", function () { 
    return gulp.src([paths.appCss, "!" + paths.ignoreCss])
            .pipe(concat(paths.destCss))
            .pipe(cssmin())
            .pipe(gulp.dest("."));
});

gulp.task("min", ["app:min:js", "scripts:min:js", "min:css"]);
gulp.task("all", ["clean", "min"]);
