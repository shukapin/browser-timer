'use strict';

var myNotificationID = null;

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});

  function getTime() {
    var now = new Date();
    var Hour = now.getHours();
    var Min = now.getMinutes();
    return Hour + ":" + Min;
  }

  chrome.notifications.create("", {
    type:     'basic',
    iconUrl:  'timer-icon.png',
    title:    'Time to finish',
    message:  'Current time: '+ getTime(),
    requireInteraction: true,
    buttons: [
      {title: 'Extend the time'},
      {title: 'Save at Calendar'}
    ],
    priority: 0
  },
  function(id) {
    myNotificationID = id;
  });
});

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
  if (notifId === myNotificationID) {

    // For "Extend the time" button
    if (btnIdx === 0) {
      chrome.storage.sync.get(['remainMinutes'], function(item) {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.alarms.create({delayInMinutes: item.remainMinutes});
      });

    // For "Save at Calendar" button
    } else if (btnIdx === 1) {
        //
    }
  }
});
