
window.addEventListener("load", () => {
    chrome.storage.sync.get(['remainMinutes'], function(item) {
      console.log("get remainMinites: " + item.remainMinutes );
      countdown(item.remainMinutes*60);
    });
});

function countdown(cnt){
  var id = setInterval(function(){
    cnt--;
    var min = Math.floor(cnt / 60);
    var sec = cnt % 60;
    document.title = min + ':' + sec;
    if(cnt == 0) window.close();
  }, 1000);
}