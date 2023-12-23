chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    console.log(details);
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders'],
);

console.log('loaded extension');
