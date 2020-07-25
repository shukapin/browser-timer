function save_options() {
    var clientId = document.getElementById("clientId").value;
    var apiKey = document.getElementById('apiKey').value;
    
    chrome.storage.sync.set({
      clientId: clientId,
      apiKey: apiKey
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  function restore_options() {
    chrome.storage.sync.get({
      clientId: 'red',
      apiKey: true
    }, function(items) {
      document.getElementById('clientId').value = items.clientId;
      document.getElementById('apiKey').value = items.apiKey;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);