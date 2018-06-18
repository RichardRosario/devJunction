const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //set field initial state
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';



    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'This is not a valid email.';
    }
    
    if (Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}