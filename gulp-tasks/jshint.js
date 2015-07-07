'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function (config) {
	return function () {
		return gulp.
			src(config.src).
			pipe(jshint(config.params)).
			pipe(jshint.reporter('default'));
	}
};
