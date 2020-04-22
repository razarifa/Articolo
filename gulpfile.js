const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
gulp.task('sass', () => {
    return gulp.src(['Bootstrap/scss/bootstrap.scss'])
        .pipe(sass())
        .pipe(gulp.dest('Bootstrap/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch('Bootstrap/scss/*.scss', gulp.series('sass'));
})