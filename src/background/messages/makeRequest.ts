import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { setDynamicRules } from '~utils/declarativeNetRequest';
import { makeFullUrl } from '~utils/fetcher';
import { assertDomainWhitelist } from '~utils/storage';

type Body =
  | {
      bodyType: 'string';
      value: string;
    }
  | {
      bodyType: 'FormData' | 'URLSearchParams' | 'Object';
      value: Record<string, string>;
    };

export interface Request extends BaseRequest {
  baseUrl?: string;
  headers?: Record<string, string>;
  method?: string;
  query?: Record<string, string>;
  readHeaders?: Record<string, string>;
  url: string;
  body?: Body;
}

type Response<T> = BaseResponse<{
  response: {
    statusCode: number;
    headers: Record<string, string>;
    finalUrl: string;
    body: T;
  };
}>;

const mapBodyToFetchBody = (body: Request['body']): BodyInit => {
  if (body?.bodyType === 'FormData') {
    const formData = new FormData();
    Object.entries(body.value).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }
  if (body?.bodyType === 'URLSearchParams') {
    const searchParams = new URLSearchParams();
    Object.entries(body.value).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    return searchParams;
  }
  if (body?.bodyType === 'Object') {
    return JSON.stringify(body.value);
  }
  if (body?.bodyType === 'string') {
    return body.value;
  }
  return undefined;
};

const handler: PlasmoMessaging.MessageHandler<Request, Response<any>> = async (req, res) => {
  try {
    await assertDomainWhitelist(req.sender.tab.url);

    console.log(req.body.headers['User-Agent']);
    if (req.body.headers['User-Agent']) {
      console.log('preparing stream');
      await setDynamicRules({
        ruleId: 23498,
        targetDomains: [req.body.url],
        requestHeaders: {
          'User-Agent': req.body.headers['User-Agent'],
        },
      });
      const rules = await chrome.declarativeNetRequest.getDynamicRules();
      console.log(rules);
    }

    const response = await fetch(makeFullUrl(req.body.url, req.body), {
      method: req.body.method,
      headers: req.body.headers,
      body: mapBodyToFetchBody(req.body.body),
    });
    const contentType = response.headers.get('content-type');
    const body = contentType?.includes('application/json') ? await response.json() : await response.text();

    res.send({
      success: true,
      response: {
        statusCode: response.status,
        headers: Object.fromEntries(response.headers.entries()), // Headers object isn't serializable
        body,
        finalUrl: response.url,
      },
    });
  } catch (err) {
    console.log('error');
    console.log(err);
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
