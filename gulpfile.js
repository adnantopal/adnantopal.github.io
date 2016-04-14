var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('compress', function() {
    return gulp.src(['./assets/js/lib/*.js', './assets/js/plugin/*.js'])
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./assets/js'));
});