import { useCallback } from 'react';

import { Button } from '~components/Button';

import './SetupScreen.css';

export function SetupScreen() {
  const open = useCallback(() => {
    const url = (chrome || browser).runtime.getURL(`/tabs/PermissionRequest.html`);
    (chrome || browser).tabs.create({ url });
  }, []);

  return (
    <div className="disabled">
      <h1 className="title">Le&apos;s get this set up!</h1>
      <p style={{ paddingBottom: 25, paddingTop: 10 }}>
        To get started, we need to setup some things first. Click the button below to continue.
      </p>
      <Button onClick={open} full>
        Continue
      </Button>
    </div>
  );
}
