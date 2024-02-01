import { relayMessage } from '@plasmohq/messaging';
import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {};

relayMessage({
  name: 'hello',
});

relayMessage({
  name: 'makeRequest',
});

relayMessage({
  name: 'prepareStream',
});

relayMessage({
  name: 'openPage',
});
