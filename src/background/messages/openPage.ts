import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { isChrome } from '~utils/extension';

type Request = BaseRequest & {
  page: string;
  redirectUrl: string;
};

const handler: PlasmoMessaging.MessageHandler<Request, BaseResponse> = async (req, res) => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('redirectUrl', req.body.redirectUrl);
    const url = (chrome || browser).runtime.getURL(`/tabs/${req.body.page}.html?${searchParams.toString()}`);

    if (isChrome()) {
      await chrome.tabs.update(req.sender.tab.id, {
        url,
      });
    } else {
      await browser.tabs.update(req.sender.tab.id, { url });
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
