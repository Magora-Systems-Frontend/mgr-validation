(function () {
	// jshint latedef: false
	'use strict';

	angular
		.module('demo.validation', [])
		.factory('validationFactory', [
			validationFactory
		]);

	function validationFactory() {
		var factory = {};

		// Validation rules for username
		factory.username = [
			{
				message: 'Only latin letters please.',
				rule: function (form, field) { return field.$error.pattern; }
			},
			{
				message: 'Username cannot be longer than 8 characters.',
				rule: function (form, field) { return field.$error.maxlength; }
			},
			{
				message: 'Username is totally required.',
				rule: function (form, field) { return (field.$dirty || form.$submitted) && field.$error.required; }
			},
			{
				type: 'valid',
				message: 'Nice username!',
				rule: function (form, field) { return field.$valid; }
			}
		];

		// Validation rules for password
		factory.password = [
			{
				message: 'No password - no cookie.',
				rule: function (form, field) { return (field.$dirty || form.$submitted) && field.$error.required; }
			},
			{
				message: 'Password must be longer than 8 characters.',
				rule: function (form, field) { return field.$error.minlength; }
			},
			{
				message: 'Slow down a bit, 16 characters is enough.',
				rule: function (form, field) { return field.$error.maxlength; }
			}
		];

		return factory;
	}

})();
