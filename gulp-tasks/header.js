'use strict';

var gulp = require('gulp');
var header = require('gulp-header');

module.exports = function (config) {
	return function () {
		var task = gulp.
			src(config.src).
			pipe(header(config.params)).
			pipe(gulp.dest(config.dest));

		if (config.callback) { task.pipe(config.callback()); }

		return task;
	};
};

