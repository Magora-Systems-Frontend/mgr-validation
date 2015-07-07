'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');

module.exports = function (config) {
	return function () {
		return gulp.
			src(config.src).
			pipe(bump(config.params)).
			pipe(gulp.dest(config.dest));
	};
};

