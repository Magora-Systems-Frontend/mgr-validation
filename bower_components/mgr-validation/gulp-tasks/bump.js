'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');

module.exports = function (config) {
	return function () {
		var task = gulp.
			src(config.src).
			pipe(bump(config.params)).
			pipe(gulp.dest(config.dest));

		if (config.callback) { task.pipe(config.callback()); }

		return task;
	};
};

