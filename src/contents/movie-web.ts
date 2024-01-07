import type { PlasmoCSConfig } from 'plasmo';

import { relayMessage } from '@plasmohq/messaging';

export const config: PlasmoCSConfig = {
  matches: ['https://movie-web.app/*', 'https://dev.movie-web.app/*', 'http://localhost:5173/*'],
};

relayMessage({
  name: 'proxy',
});
