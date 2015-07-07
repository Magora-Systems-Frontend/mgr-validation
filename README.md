# mgr.validation

Kind of a wrapper for standard Angular validation logic. Basically, what it does, it binds to a certain field (and form if needed) and shows/hide nicely (and consistently) styled validation messages.

## Usage

```javascript
<form name="someController.form" novalidate ng-submit="someController.submit()">
  <input name="field" ng-model="someController.something" ng-pattern="[0-9]+" required type="text" />
  <mgr-validation form="someController.form" field="someController.form.field" validators="someController.validators.field"></mgr-validation>
  <button type="submit">Submit!</button>
</form>
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

Since the `type` vlaue is a name for a CSS class, you can add your own types, just mind a `mgr-` prefix that is going to be added automatically (so `your-fancy-type` becomes `mgr-your-fancy-type`).

## Controller

A bit more detailed example in a controller:

```javascript
// Define the validators object
someController.validators = {};

// Define an array of validators for the 'field' field
someController.validators.field = [
  {
    // Show this message on attempt to submit the form with no value in the field
    message: 'Please fill in the field.',
    rule: function (form, field) { return form.$submitted && field.$error.required; }
  },
  {
    // Make sure the field contains a number
    message: 'The field must contain a number.',
    rule: function (form, field) { return field.$error.pattern; }
  },
  {
    // The field is valid, congratulate the user
    message: 'Yay, all good!',
    type: 'valid',
    rule: function (form, field) { return field.$valid; }
  }
];
```

## See also

For proper examples check out `demo/`.
