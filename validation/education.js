const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    //set field initial state
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required.';
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree/Course field is required.';
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study is required.';
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date is required.';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}