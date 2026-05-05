const tabMetrics = new Map();

chrome.tabs.onRemoved.addListener((tabId) => {
  tabMetrics.delete(tabId);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = message.tabId || sender.tab?.id;

  if (message.type === 'UPDATE_METRICS') {
    const metrics = tabMetrics.get(tabId) || { added: 0, removed: 0 };
    if (message.addedDelta) metrics.added += message.addedDelta;
    if (message.removedDelta) metrics.removed += message.removedDelta;
    tabMetrics.set(tabId, metrics);
  } else if (message.type === 'GET_METRICS') {
    const metrics = tabMetrics.get(tabId) || { added: 0, removed: 0 };
    sendResponse(metrics);
  } else if (message.type === 'RESET_METRICS') {
    tabMetrics.set(tabId, { added: 0, removed: 0 });
    sendResponse({ success: true });
  }
});
