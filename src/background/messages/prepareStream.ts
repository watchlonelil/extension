import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { assertDomainWhitelist } from '~utils/storage';

interface Request extends BaseRequest {
  ruleId: number;
  targetDomains: [string, ...string[]];
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
}

const mapHeadersToDeclarativeNetRequestHeaders = (
  headers: Record<string, string>,
  op: string,
): { header: string; operation: any; value: string }[] => {
  return Object.entries(headers).map(([name, value]) => ({
    header: name,
    operation: op,
    value,
  }));
};

const handler: PlasmoMessaging.MessageHandler<Request, BaseResponse> = async (req, res) => {
  try {
    await assertDomainWhitelist(req.body.requestDomain);

    if (chrome) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [req.body.ruleId],
        addRules: [
          {
            id: req.body.ruleId,
            condition: {
              requestDomains: req.body.targetDomains,
            },
            action: {
              type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
              ...(req.body.requestHeaders
                ? {
                    requestHeaders: mapHeadersToDeclarativeNetRequestHeaders(
                      req.body.requestHeaders,
                      chrome.declarativeNetRequest.HeaderOperation.SET,
                    ),
                  }
                : {}),
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
                ...mapHeadersToDeclarativeNetRequestHeaders(
                  req.body.responseHeaders ?? {},
                  chrome.declarativeNetRequest.HeaderOperation.SET,
                ),
              ],
            },
          },
        ],
      });
      if (chrome.runtime.lastError?.message) throw new Error(chrome.runtime.lastError.message);
    } else {
      browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [req.body.ruleId],
        addRules: [
          {
            id: req.body.ruleId,
            condition: {
              requestDomains: req.body.targetDomains,
            },
            action: {
              type: 'modifyHeaders',
              ...(req.body.requestHeaders
                ? {
                    requestHeaders: mapHeadersToDeclarativeNetRequestHeaders(req.body.requestHeaders, 'set'),
                  }
                : {}),
              responseHeaders: [
                {
                  header: 'Access-Control-Allow-Origin',
                  operation: 'set',
                  value: '*',
                },
                {
                  header: 'Access-Control-Allow-Methods',
                  operation: 'set',
                  value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                },
                {
                  header: 'Access-Control-Allow-Headers',
                  operation: 'set',
                  value: '*',
                },
                ...mapHeadersToDeclarativeNetRequestHeaders(req.body.responseHeaders ?? {}, 'set'),
              ],
            },
          },
        ],
      });
      if (browser.runtime.lastError?.message) throw new Error(browser.runtime.lastError.message);
    }

    res.send({
      success: true,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
