import { useCallback } from 'react';

import { Icon } from '~components/Icon';

import '~tabs/PermissionGrant.css';

export function PermissionMissingScreen() {
  const open = useCallback(() => {
    const url = (chrome || browser).runtime.getURL(`/tabs/PermissionRequest.html`);
    (chrome || browser).tabs.create({ url });
  }, []);

  return (
    <div className="disabled">
      <Icon name="warningCircle" />
      <p style={{ paddingBottom: 25, paddingTop: 10 }}>The extension is missing permissions it needs to function</p>
      <button type="button" className="grant-permission-btn" onClick={open}>
        Grant Permission
      </button>
    </div>
  );
}
