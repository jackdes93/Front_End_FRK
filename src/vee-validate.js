import { extend, configure } from "vee-validate";
import { required, email, min, confirmed, regex } from "vee-validate/dist/rules";
import i18n from "./lang/i18n";

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`fields.${field}`)[values._rule_]
  }
});

// Install required rule and message.
extend("required", required);

// Install email rule and message.
extend("email", email);

// Install min rule and message.
extend("min", {
    validate(value, {min}) {
      return value.length >= min
    },
    params: ['min'],
    message: (field, values) => {
      return i18n.t(`fields.${field}`)[values._rule_]
    }
});

extend('max', {
  validate(value, {max}) {
    return value.length <= max
  },
  params: ['max'],
  message: (field, values) => {
    return i18n.t(`fields.${field}`)[values._rule_]
  }
})

extend('confirmed', confirmed);
extend('regex', regex);

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: (field, values) => {
    return  i18n.t(`fields.${field}`)[values._rule_]
  }
});