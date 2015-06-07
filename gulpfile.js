const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("babel", function() {
    return gulp.src("src/js/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/js"));
})
