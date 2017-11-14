var ErrorHandler = function(){

  var that = {};

  that.timerError = function(){

      document.getElementById('timer_mins').classList.add('error_indication');
  };

  that.generalError = function(msg){

      alert(msg);
      console.error(msg);
  };

  return that;

}();
