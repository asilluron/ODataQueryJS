var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('odq', function () {
	gulp.src(['./templates/header.js', './src/util/**/*.js', './src/queries/**/*.js', './templates/footer.js'])
		.pipe(watch(function () {
			return gulp.src(['./templates/header.js', './src/util/**/*.js', './src/queries/**/*.js', './templates/footer.js']).pipe(concat('odq.js'))
				.pipe(gulp.dest('./'));
		}));


});

gulp.task('compress', function () {
	gulp.src('odq.js')
		.pipe(uglify({
			outSourceMap: false,
			preserveComments: "some"
		}))
		.pipe(rename("odq.min.js"))
		.pipe(gulp.dest('dist'));
});

gulp.task('export', function () {
	gulp.src('odq.js')
		.pipe(rename("odq.js"))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
	// place code for your default task here
});