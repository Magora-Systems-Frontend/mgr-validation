'use strict';

var gulp = require('gulp');
var config = require('./gulp.config.json');

var connect = require('gulp-connect');

var clean = require('./gulp-tasks/clean.js');
var copy = require('./gulp-tasks/copy.js');
var jade = require('./gulp-tasks/jade.js');
var stylus = require('./gulp-tasks/stylus.js');
var minifyCss = require('./gulp-tasks/minify-css.js');
var uglify = require('./gulp-tasks/uglify.js');
var templateCache = require('./gulp-tasks/template-cache.js');
var concat = require('./gulp-tasks/concat.js');
//var bump = require('./gulp-tasks/bump.js');

gulp.task('default', [ 'watch' ]);

gulp.task('build', [
	'clean',
	'compress-css',
	'compress-js'
]);

gulp.task('watch', [
	'build',
	'serve',
	'watch-stylus',
	'watch-js',
	'watch-dist',
	'watch-demo'
]);

gulp.task('serve', function () {
	return connect.server({
		root: './',
		fallback: config.demo.root + config.demo.filenames.html,
		livereload: true
	});
});

gulp.task('clean', clean({
	src: [
		config.tmp.root,
		config.dist.root
	]
}));

// process stylesheets

gulp.task('compile-stylus', stylus({
	src:  config.src.styl,
	dest: config.tmp.root
}));

gulp.task('concat-css', ['compile-stylus'], concat({
	src: config.tmp.css,
	dest: config.tmp.root,
	filename: config.dist.filenames.css
}));

gulp.task('compress-css', ['concat-css'], minifyCss({
	src: config.tmp.root + config.dist.filenames.css,
	dest: config.dist.root
}));

gulp.task('watch-stylus', function () {
	return gulp.watch(config.src.styl, ['compress-css']);
});

// process templates

gulp.task('compile-jade', jade({
	src: config.src.jade,
	dest: config.tmp.root
}));

gulp.task('compile-ng-templates', ['compile-jade'], templateCache({
	src: config.tmp.html,
	dest: config.tmp.root,
	params: {
		module: 'mgr.validation',
		filename: 'mgr.validation.templates.js'
	}
}));

// process js

gulp.task('copy-js', copy({
	src: config.src.js,
	dest: config.tmp.root
}));

gulp.task('concat-js', ['compile-ng-templates', 'copy-js'], concat({
	src: config.tmp.js,
	dest: config.tmp.root,
	filename: config.dist.filenames.js
}));

gulp.task('compress-js', ['concat-js'], uglify({
	src: config.tmp.root + config.dist.filenames.js,
	dest: config.dist.root
}));

gulp.task('watch-js', function () {
	return gulp.watch([config.src.js, config.src.jade], ['compress-js']);
});

// misc

gulp.task('watch-dist', function () {
	gulp.watch(config.dist.css, function () { return gulp.src(config.dist.css).pipe(connect.reload()); });
	gulp.watch(config.dist.js, function () { return gulp.src(config.dist.js).pipe(connect.reload()); });
});

gulp.task('watch-demo', function () {
	gulp.watch(config.demo.html, function () { return gulp.src(config.demo.html).pipe(connect.reload()); })
	gulp.watch(config.demo.css, function () { return gulp.src(config.demo.css).pipe(connect.reload()); })
	gulp.watch(config.demo.js, function () { return gulp.src(config.demo.js).pipe(connect.reload()); })
});

