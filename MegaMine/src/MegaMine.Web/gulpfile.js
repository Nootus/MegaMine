/// <binding />
"use strict";

var gulp = require("gulp"),
        rimraf = require("rimraf"),
        concat = require("gulp-concat"),
        cssmin = require("gulp-cssmin"),
        uglify = require("gulp-uglify"),
        gutil = require('gulp-util'),
        inject = require('gulp-inject'),
        sourcemaps = require('gulp-sourcemaps'),
        tsc = require('gulp-typescript');

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


gulp.task('InjectJS', function () {
    //console.log(allJsRefs);
    var target = gulp.src('./views/home/index.cshtml');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(paths.appJs, { read: false });
    return target.pipe(inject(sources, {
        transform: function (filepath, file, i, length) {
            return '<script src="' + filepath.replace('/wwwroot/','') + '"></script>';
        }
    }))
      .pipe(gulp.dest('./views/home'));
});

var config = require('./gulp.config')(),
    tsProject = require(webroot + 'app/tsconfig.json');

gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        config.allTs
    ];

    var tsResult = gulp
        .src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});


gulp.task('watch', ['compile-ts'], function () {

    gulp.watch([config.allTs], ['compile-ts']);

});

gulp.task('default', ['watch']);


gulp.task("all", ["clean", "min", "copy"]);
