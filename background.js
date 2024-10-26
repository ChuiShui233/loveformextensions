chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.storage.local.get(['refreshCount'], function (result) {
        let count = result.refreshCount || 0;
        count += 1;
        chrome.storage.local.set({ refreshCount: count });
      });
    }
  });
  