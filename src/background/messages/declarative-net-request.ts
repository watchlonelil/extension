import type { PlasmoMessaging } from '@plasmohq/messaging';

interface RequestBody {
  ruleId: number;
  domain: string;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
}

const mapHeadersToDeclarativeNetRequestHeaders = (
  headers: Record<string, string>,
): chrome.declarativeNetRequest.ModifyHeaderInfo[] => {
  return Object.entries(headers).map(([name, value]) => ({
    header: name,
    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
    value,
  }));
};

const handler: PlasmoMessaging.MessageHandler<RequestBody> = async (req, res) => {
  console.log('declarative-net-request: ', req.body);
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [req.body.ruleId],
      addRules: [
        {
          id: req.body.ruleId,
          condition: {
            initiatorDomains: [req.body.domain],
          },
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: mapHeadersToDeclarativeNetRequestHeaders(req.body.requestHeaders ?? {}),
            responseHeaders: [
              {
                header: 'Access-Control-Allow-Origin',
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                value: '*',
              },
              {
                header: 'Access-Control-Allow-Methods',
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
              },
              {
                header: 'Access-Control-Allow-Headers',
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                value: '*',
              },
              ...mapHeadersToDeclarativeNetRequestHeaders(req.body.responseHeaders ?? {}),
            ],
          },
        },
      ],
    });

    if (chrome.runtime.lastError?.message) throw new Error(chrome.runtime.lastError.message);

    res.send({
      success: true,
      body: req.body,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
