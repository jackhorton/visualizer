'use strict';

const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');

gulp.task('jsx', function() {
    return browserify('./client/app.jsx', {
            extensions: ['.jsx'],
            debug: true
        })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('less', function() {
    gulp.src('client/styles/app.less')
        .pipe(less({
            paths: [path.join(__dirname, 'client', 'styles')]
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', ['default'], () => {
    gulp.watch(['./client/**/*.jsx', './client/**/*.js'], ['jsx']);
    gulp.watch(['./client/styles/**/*.less'], ['less']);
});

gulp.task('default', ['jsx', 'less']);
