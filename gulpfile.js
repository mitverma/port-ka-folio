'use strict';
// declaration	
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify'); 
var uglifyjs = require('uglify-js'); 
var uglify = require('gulp-uglify');
var pump = require('pump');
var open = require('gulp-open');
var watch = require('gulp-watch');
var connect = require('gulp-connect');


// declaration
// sass compile task 
gulp.task('sass', function () {
	return gulp.src('sass/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('compiled/'));
});
// sass compile task complete 
// css minify task
gulp.task('minify-css', () => {
	return gulp.src('compiled/*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('css/'));
});
// css minify task complete
// js minify task
gulp.task('compress', function (cb) {
	pump([
		gulp.src('js/*.js'),
		uglify(),
		gulp.dest('compiled/')
		],
		cb
		);
});
// js minify task complete
// // gulp watch and gulp open task
// gulp.task('stream', function () {
//     // Endless stream mode
//     return watch('sass/*.scss','compiled/*.css','js/*.js', ['sass','minify-css','compress'])
//     .pipe(gulp.dest('build'));
// });
// gulp.task('callback', function () {
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
//     return watch('sass/*.scss','compiled/*.css','js/*.js',['sass','minify-css','compress'], function () {
//     	gulp.src('sass/*.scss'),
//     	gulp.src('compiled/*.css')
//     	.pipe(gulp.dest('build'));
//     });
// });
// gulp.task('open', function(){
// 	gulp.src('./index.html')
// 	.pipe(open());
// });

gulp.task('stream', function () {
	connect.server({
		root: './',
		livereload: true
	});
	gulp.src('./index.html')
	.pipe(open({
		uri: 'http://localhost:8080'
	}));
	// .pipe(open());
	gulp.watch(['./sass/*.scss','compiled/*.css', './js/*.js'], ['sass','minify-css','compress']);
});

// gulp watch and gulp open task end

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.watch('watch',function(){
	gulp.watch(['sass'],['minify-css'],['compress'])
})
gulp.task('default', function() {
	gulp.start('sass');
	gulp.start('minify-css');
	gulp.start('compress');
	gulp.start('stream');
	// gulp.start('open');
});