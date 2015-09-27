'use strict';

const path = require('path');

const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');

gulp.task('jsx', function() {
    return browserify('./client/app.jsx', {
            extensions: ['.jsx']
        })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('less', function() {
    gulp.src('src/less/main.less')
        .pipe(less({
            paths: [path.join(__dirname, 'src', 'less')]
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['jsx']);
