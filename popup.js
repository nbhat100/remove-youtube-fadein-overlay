function refreshMetrics() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ type: 'GET_METRICS', tabId }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error getting metrics:', chrome.runtime.lastError);
          return;
        }
        const added = response?.added || 0;
        const removed = response?.removed || 0;
        document.getElementById('added').textContent = added;
        document.getElementById('removed').textContent = removed;
      });
    }
  });
}

function resetMetrics() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ type: 'RESET_METRICS', tabId }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error resetting metrics:', chrome.runtime.lastError);
          return;
        }
        refreshMetrics();
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  refreshMetrics();
  document.getElementById('refresh').addEventListener('click', resetMetrics);
});
