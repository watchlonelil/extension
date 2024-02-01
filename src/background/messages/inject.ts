import type { PlasmoMessaging } from '@plasmohq/messaging';

import { injectScript } from '~utils/injection';

const handler: PlasmoMessaging.MessageHandler = async (_req, res) => {
  injectScript();
  res.send({});
};

export default handler;
