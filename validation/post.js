const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
    let errors = {};

    //set field initial state
    data.text = !isEmpty(data.text) ? data.text : '';
  
    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    if(!Validator.isLength(data.text, { min: 10, max: 300 })){
        errors.text = 'Post must be betweem 10 to 300 characters';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}