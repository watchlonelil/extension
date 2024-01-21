import { relayMessage } from '@plasmohq/messaging';
import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  // <all_urls> works for chrome, but not for firefox, so we add explicit domains for firefox
  matches: ['<all_urls>', 'https://dev.movie-web.app/*', 'https://movie-web.app/*'],
};

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
