# mgr.validation

Kind of a wrapper for standard Angular validation logic. Basically, what it does, it binds to a certain field (and form if needed) and shows/hide nicely (and consistently) styled validation messages.

The reason this thing was made is that standard form validation in Angular often gets way too verbose and hard to maintain.

## Installation

```
bower install mgr-validation
```

## Usage

```html
<!doctype html>
<html lang="en">
	<head>
		<!-- ... -->
		<link rel="stylesheet" href="./path/to/mgr-validation.css" />
		<!-- ... -->
	</head>
	<body ng-app="someApp">
		<!-- ... -->
		<form name="someController.form" novalidate ng-submit="someController.submit()">
			<input name="field" ng-model="someController.something" required type="text" />
			<mgr-validation form="someController.form" field="someController.form.field" validators="someController.validators.field"></mgr-validation>
			<button type="submit">Submit!</button>
		</form>
		<!-- ... -->
		<script src="./path/to/mgr-validation.js" />
	</body>
</html>
```

```js
(function () {
	'use strict';

	angular
		.module('someModule', [
			'mgr.validation'
		]);

	// ...

})();
```

## Directive parameters

### `form`

Reference to the form, used in a controller.

### `field`

Reference to the field, used in a controller.

### `validators`

An array of validators, also used in a controller. Validator is a simple object that looks somewhat like this:

```javascript
var someValidator = {
  type: 'invalid',
  message: 'You are doing it wrong',
  rule: function (form, field) { return field.$invalid; }
};
```

## Validator object parameters

### `message`

Required. Message to display when the `rule` returns `true`.

### `rule`

Required. A function that accepts references to the `form` and/or the `field`, and performs the validation.

### `type`

Optional, by default set to `invalid`. Message type, purely decorative. Available predefined styling:

- `invalid` - Default type, no need to specify it explicitly
- `valid`
- `warning`

Since the `type` value is a CSS class, you can add your own types, just mind the `mgr-` prefix that is going to be added automatically (so `your-fancy-type` becomes `mgr-your-fancy-type`).

## Controller

A bit more detailed example of the controller logic:

```javascript
// Define the validators object
someController.validators = {};

// Define an array of validators for the 'field' field
someController.validators.field = [
  {
    // Show this message on attempt to submit the form with with an empty required field
    message: 'Please fill in the field.',
    rule: function (form, field) { return form.$submitted && field.$error.required; }
  },
  {
    // Make sure the field matched the pattern
    message: 'The field must contain a number.',
    rule: function (form, field) { return field.$error.pattern; }
  },
  {
    // The field is filled in properly, congratulate the user
    message: 'Yay, all good!',
    type: 'valid',
    rule: function (form, field) { return field.$valid; }
  }
];
```

## See also

Working demo can be found in `demo/` or [demo](http://magora-systems-frontend.github.io/mgr-validation/).
