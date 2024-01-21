import { Icon } from '~components/Icon';

import '~tabs/PermissionGrant.css';

export interface PermissionMissingProps {
  onGrant?: () => void;
}

export function PermissionMissingScreen(props: PermissionMissingProps) {
  return (
    <div className="disabled">
      <Icon name="warningCircle" />
      <p style={{ paddingBottom: 25, paddingTop: 10 }}>The extension is missing permissions it needs to function</p>
      <button type="button" className="grant-permission-btn" onClick={props.onGrant}>
        Grant Permission
      </button>
    </div>
  );
}
