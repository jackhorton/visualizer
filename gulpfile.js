"use strict";

const gulp = require("gulp");
const hbs = require("gulp-handlebars");
const defineModule = require("gulp-define-module");

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

gulp.task("watch", function() {
    gulp.watch("src/templates/*.hbs", ["templates"]);
});

gulp.task("default", ["templates"]);
