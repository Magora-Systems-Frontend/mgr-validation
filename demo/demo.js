(function () {
	// jshint latedef: false
	'use strict';

	angular
		.module('demo', [
			'mgr.validation',
			'demo.validation'
		])
		.directive('demo', [
			'validationFactory',
			demo
		]);

	function demo(validationFactory) {
		return {
			restrict: 'AE',
			scope: true,
			bindToController: true,
			controller: DemoController,
			controllerAs: 'demo'
		};

		function DemoController() {
			var demo = this;

			// Properties

			demo.profile = {};
			demo.validationFactory = validationFactory;

			// Methods

			demo.doPasswordsMatch = doPasswordsMatch;
			demo.isPasswordTooWeak = isPasswordTooWeak;
			demo.submit = submit;

			// Logic

			function doPasswordsMatch() {
				return demo.profile.password === demo.profile.passwordConfirm;
			}
			
			function isPasswordTooWeak() {
				return /^[a-z-A-Z]+$/.test(demo.profile.password);
			}

			function submit() {
				alert('Yay!');
			}

			// Some custom validation rules for password validation

			// Passwords are valid and matched
			validationFactory.password.push({
				type: 'valid',
				message: 'Password is alright!',
				rule: function (form, field) { return field.$valid && demo.doPasswordsMatch(); }
			});

			// Weak password warning (non critical)
			validationFactory.password.push({
				type: 'warning',
				message: 'Well, although this password is valid, it is rather weak.',
				rule: function (form, field) {
					return field.$valid && demo.doPasswordsMatch() && demo.isPasswordTooWeak();
				}
			});

			// Passwords do not match
			validationFactory.password.push({
				message: 'Passwords do not match.',
				rule: function (form, field) { return !demo.doPasswordsMatch(); }
			});
		}
	}

})();
