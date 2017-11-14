var Timer = function(){

  var that = {};

  let second = 1000;
  let minute = 60 * second;
  let displayInterval;
  let timeout;

  // Activate timer on background
  function activateTimer(time){

    timeout = setTimeout(function(){

      clearInterval(displayInterval);
      chrome.tabs.create({url: chrome.extension.getURL('timeisup.html')});
      localStorage.removeItem('TaB');

    }, time);
  }

  // Interact with popup.html inorder to inform end user about count down
  function displayTimer(min){

      let sec = 0;
      let minutesStr;
      let secondsStr;

      displayInterval = setInterval(function(){

          if(sec > 0){
            --sec;
          }
          else if(min > 0){
              --min;
              sec = 59;
          }

          secondsStr = (sec < 10) ? ('0' + sec) : sec;
          minutesStr = (min < 10) ? ('0' + min) : min;

          chrome.runtime.sendMessage({
            'time':(minutesStr + ':' + secondsStr)
          });

      }, 1000);
  }

  that.setTimer = function(min){

      if(min){

        let time = (min * minute);

        activateTimer(time);
        displayTimer(min);
      }
      else{

        ErrorHandler.timerError();
      }
  };

  that.clearTimer = function(){

    localStorage.removeItem('TaB');
    clearInterval(displayInterval);
    clearTimeout(timeout);
  };

  return that;
}();
