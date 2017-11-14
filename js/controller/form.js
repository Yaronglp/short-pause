var Form = function(){

  var that = {};

  // Change the ui after sumbit pressed
  function changeDisplay(){

    that.formDisplay();
    that.informTimerDisplay('display');
    that.clearTimerDisplay('display');
    that.instructionDisplay('hide');
  }

  function showElement(ele){

    ele.classList.remove('hide_element');
    ele.classList.add('display_element');
  }

  function hideElement(ele){

    ele.classList.remove('display_element');
    ele.classList.add('hide_element');
  }

  function showHideElement(id, state){

    let element = document.getElementById(id);

    if(element){
      state === 'display' ? showElement(element) : hideElement(element);
    }
  }

  that.formDisplay = function(state){

    showHideElement('timer_form', state);
  };

  that.informTimerDisplay = function(state){

    showHideElement('popup_timer', state);
  };

  that.clearTimerDisplay = function(state){

    showHideElement('clear_timer', state);
  };

  that.instructionDisplay = function(state){

    showHideElement('instruction', state);
  };

  that.onSubmit = function(){

    let minutesEle = document.getElementById('timer_mins');
    let isValid = false;
    let minValue;

    if(minutesEle){

      minValue = minutesEle.value;
      isValid = Validate.isInputValid(minValue);
    }

    if(isValid){

      localStorage.setItem('TaB', minValue);
      chrome.runtime.sendMessage({
        'minValue':minValue,
        'type':'setTimer'
      });
      changeDisplay(minValue);

    }
    else{
      ErrorHandler.timerError();
    }
  };

  that.resetInformTimer = function(){

    let timer = document.getElementById('popup_timer');

    if(timer){

      timer.innerText = 'Timer';
    }
  };

  return that;
}();
