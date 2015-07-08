(function () {
	// jshint latedef: false
	'use strict';

	angular
		.module('mgr.validation', [])
		.directive('mgrValidation', [
			mgrValidation
		]);

	function mgrValidation() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'mgr-validation.html',
			scope: {
				form: '=',
				field: '=',
				validators: '='
			},
			bindToController: true,
			controller: ValidationController,
			controllerAs: 'validation'
		};

		function ValidationController() {
			var validation = this;
		}
	}

})();
