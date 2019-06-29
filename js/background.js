chrome.windows.onRemoved.addListener(function(winId){
  localStorage.removeItem('time');
});

chrome.runtime.onMessage.addListener(function(message, sender){
  if(message.type === 'setTimer'){
      Timer.setTimer(message.minValue);
  }
  else if(message.type === 'clearTimer'){
      Timer.clearTimer();
  }
});
