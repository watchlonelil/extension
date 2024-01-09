import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { BaseRequestBody } from '~types/request';
import { validateDomainWhiteList } from '~utils/storage';

const handler: PlasmoMessaging.MessageHandler<BaseRequestBody> = async (req, res) => {
  try {
    await validateDomainWhiteList(req.body.requestDomain);

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
