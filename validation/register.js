const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //set field initial state
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if(!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'This is not a valid email.';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    
    if (!Validator.isLength(data.password, {min: 6, max: 15})) {
        errors.password = 'Password must be between 6 and 10 characters';
    }
    if (Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.password2, {min: 6, max: 15})) {
        errors.password2 = 'Password must be between 6 and 10 characters';
    }
    if (Validator.isEmpty(data.password2)){
        errors.password2 = 'Password2 is required';
    } 
        
    if(!Validator.equals(data.password, data.password2)) {
            errors.password2 = 'Passwords does not match! Please type correctly';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}