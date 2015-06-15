"use strict";

const path = require("path");

const gulp = require("gulp");
const hbs = require("gulp-handlebars");
const defineModule = require("gulp-define-module");
const less = require("gulp-less");

gulp.task('templates', function() {
    // Load templates from the templates/ folder relative to where gulp was executed
    gulp.src('src/templates/*.hbs')
        // Compile each Handlebars template source file to a template function
        .pipe(hbs())
        // Define templates as AMD modules
        .pipe(defineModule('amd'))
        // Write the output into the templates folder
        .pipe(gulp.dest('src/templates/compiled'));
});

gulp.task("less", function() {
    gulp.src("src/less/main.less")
        .pipe(less({
            paths: [path.join(__dirname, "src", "less")]
        }))
        .pipe(gulp.dest("public/css"));
});

gulp.task("watch", function() {
    gulp.watch("src/templates/*.hbs", ["templates"]);
    gulp.watch("src/less/*.less", ["less"]);
});

gulp.task("default", ["templates", "less"]);
