import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { makeFullUrl } from '~utils/fetcher';
import { validateDomainWhiteList } from '~utils/storage';

export interface Request extends BaseRequest {
  baseUrl?: string;
  headers?: Record<string, string>;
  method?: string;
  query?: Record<string, string>;
  readHeaders?: Record<string, string>;
  url: string;
  body?: string | FormData | URLSearchParams;
}

type Response<T> = BaseResponse<{
  response: {
    statusCode: number;
    headers: Record<string, string>;
    finalUrl: string;
    body: T;
  };
}>;

const handler: PlasmoMessaging.MessageHandler<Request, Response<any>> = async (req, res) => {
  try {
    await validateDomainWhiteList(req.body.requestDomain);

    const response = await fetch(makeFullUrl(req.body.url, req.body), {
      method: req.body.method,
      headers: req.body.headers,
      body: req.body.body,
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
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
