export const validatePassword = (password) => {
  if (!password.match(/^((?!\s).)*$/)) {
    return 'Password should not have spaces';
  } else if (!password.match(/[A-Z]/)) {
    return 'Password must have atleast one capital case letter';
  } else if (!password.match(/[a-z]/)) {
    return 'Password must have atleast one lower case letter';
  } else if (!password.match(/[0-9]/)) {
    return 'Password must have atleast one number';
  } else if (!password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) {
    return 'Password must have atleast one special character';
  } else if (password.length < 6) {
    return 'Password must have atleast six letters';
  } else {
    return '';
  }
};
