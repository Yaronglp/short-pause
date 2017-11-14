var Validate = function(){

  var that = {};

  let maxNumber = 120;

  function isBelowOrEqualMaxNumber(value){

    return value <= maxNumber;
  }

  function isNumberInput(value){

    return value && !isNaN(value) && isBelowOrEqualMaxNumber(value);
  }

  // For now, there is only validation check for numbers
  that.isInputValid = function(value){

    // convert the value from string to number or to NaN
    value *= 1;

    return isNumberInput(value) && Number.isInteger(value);
  };

  that.isValueNotEmpty = function(value){

        return value !== undefined && value != null && value !== '';
  };

  return that;
}();
