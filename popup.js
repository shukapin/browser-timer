'use strict';

function startTimer(event) {
  let remainMinutes = parseFloat(event.target.value);
  chrome.storage.sync.set({remainMinutes: remainMinutes}, function () {});

  console.log("get remainMinites: " + remainMinutes );
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: remainMinutes});
  window.close();

 chrome.tabs.create({
   url: 'timer.html',
   active: false
  },(tab) => {
      chrome.storage.sync.set({timerTabId: tab.id}, function () {});
  });
}

function clearTimer() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  chrome.storage.sync.get(['timerTabId'], function (item) {
    chrome.tabs.remove(item.timerTabId);
  });
  window.close();
}

var items = document.getElementsByClassName('startTimer');
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('click', startTimer);
}
document.getElementById('cancelTimer').addEventListener('click', clearTimer);