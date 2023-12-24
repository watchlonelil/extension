chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [666],
  addRules: [
    {
      id: 666,
      priority: 1,
      condition: {
        initiatorDomains: ['movie-web.app'],
      },
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
        requestHeaders: [
          {
            header: 'X-Test',
            operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            value: 'Hello world',
          },
        ],
        responseHeaders: [
          {
            header: 'Access-Control-Allow-Origin',
            operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            value: '*',
          },
          {
            header: 'Access-Control-Allow-Methods',
            operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            value: 'POST,GET,OPTIONS,PUT',
          },
        ],
      },
    },
  ],
});

console.log('loaded extension');
