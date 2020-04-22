'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});

function getTime() {
  var now = new Date();
  var Hour = now.getHours();
  var Min = now.getMinutes();
  return Hour + ":" + Min;
}

  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'timer-icon.png',
      title:    'Time to finish',
      message:  'Current time: '+ getTime(),
      requireInteraction: true,
      buttons: [
        {title: 'Keep it Flowing.'}
      ],
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});
