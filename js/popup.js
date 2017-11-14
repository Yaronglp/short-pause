document.addEventListener('DOMContentLoaded', function() {

  let submitEle = document.getElementById('key_submit');
  let submitWrapper = document.getElementById('submit_wrapper');
  let clearTimer = document.getElementById('clear_timer');
  let minsInput = document.getElementById('timer_mins');
  let storageValue = localStorage.getItem('TaB');

  // Checks if storage value exists (if the timer is already started)
  if(storageValue){

    document.getElementById('popup_timer').classList.add('display_element');
    Form.formDisplay('hide');
    Form.instructionDisplay('hide');
    Form.clearTimerDisplay('display');
  }

  let submitBtnHandler = function(){

    let minutesEle = document.getElementById('timer_mins');
    let valueExist = Validate.isValueNotEmpty(minutesEle.value);

    if(valueExist){
        submitEle.classList.add('clickable_item');
        submitEle.disabled = false;
    }
    else{
        submitEle.classList.remove('clickable_item');
        submitEle.disabled = true;
    }
  };

  let clearTimerHandler = function(){

      new Promise((resolve, reject) => {

        try {
            chrome.runtime.sendMessage({
                'type': 'clearTimer'
            });
            resolve(true);
        }
        catch(e){
          reject();
        }

      }).then((value) => {

        if(value === true){

          Form.formDisplay('display');
          Form.informTimerDisplay();
          Form.clearTimerDisplay();
          Form.instructionDisplay('display');
          Form.resetInformTimer();
        }

      }).catch((reason) => {

          ErrorHandler.generalError(reason);
      });
  };

  let validateInputHandler = function(){
      minsInput.classList.remove('error_indication');
  };

  let inputEnterHandler = function(e){

      if(e.keyCode === 13){
          e.preventDefault();
      }
  };

  // listening to background timer
  chrome.runtime.onMessage.addListener(function(message){

    let informTimer = document.getElementById('popup_timer');

    if(informTimer){
      informTimer.innerText = message.time;
    }
  });

  if(submitEle){
    submitEle.addEventListener('click', Form.onSubmit);
  }

  minsInput.addEventListener('keypress', inputEnterHandler);
  minsInput.addEventListener("change", validateInputHandler);
  submitWrapper.addEventListener('mouseenter', submitBtnHandler);
  // Adding event listener for clear timer button
  clearTimer.addEventListener('click', clearTimerHandler);
});
