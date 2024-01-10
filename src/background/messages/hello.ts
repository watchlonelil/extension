import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { assertDomainWhitelist } from '~utils/storage';

type Response = BaseResponse<{
  version: string;
}>;

const handler: PlasmoMessaging.MessageHandler<BaseRequest, Response> = async (req, res) => {
  try {
    await assertDomainWhitelist(req.body.requestDomain);

    const version = chrome.runtime.getManifest().version;

    res.send({
      success: true,
      version,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
