import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { validateDomainWhiteList } from '~utils/storage';

interface Request extends BaseRequest {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string | FormData | URLSearchParams;
}

type Response = BaseResponse<{
  status: number;
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  data: string | Record<string, unknown>;
}>;

const handler: PlasmoMessaging.MessageHandler<Request, Response> = async (req, res) => {
  try {
    await validateDomainWhiteList(req.body.requestDomain);

    const response = await fetch(req.body.url, {
      method: req.body.method,
      headers: req.body.headers,
      body: req.body.body,
    });
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') ? await response.json() : await response.text();

    res.send({
      success: true,
      status: response.status,
      requestHeaders: req.body.headers,
      responseHeaders: Object.fromEntries(response.headers.entries()),
      data,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
