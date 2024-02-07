import { useCallback } from 'react';

import { usePermission } from '~hooks/usePermission';

import './font.css';
import './PermissionRequest.css';

export default function PermissionRequest() {
  const { grantPermission } = usePermission();

  const grant = useCallback(() => {
    grantPermission().then(() => window.close());
  }, [grantPermission]);

  return (
    <div className="container">
      <div className="inner-container">
        <h1 className="color-white">Permission</h1>
        <p className="text-color" style={{ fontSize: 13 }}>
          Websites need to ask for permission <br /> before they can use this extension
        </p>
        <div className="permission-card">
          <p className="text-color" style={{ textAlign: 'center' }}>
            The website <span className="color-white">hello world</span> wants to <br /> use the extension on their
            page.
          </p>
        </div>
        <div className="footer">
          <button type="button" className="grant-permission-btn" onClick={grant}>
            Grant Permission
          </button>
        </div>
      </div>
    </div>
  );
}
