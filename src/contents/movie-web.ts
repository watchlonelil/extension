import type { PlasmoCSConfig } from 'plasmo';

import { relayMessage } from '@plasmohq/messaging';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

relayMessage({
  name: 'proxy-request',
});

relayMessage({
  name: 'declarative-net-request',
});
