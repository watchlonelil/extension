import { useVersion } from '~hooks/useVersion';
import './BottomLabel.css';

export function BottomLabel() {
  const version = useVersion({ prefixed: true });

  return (
    <h3 className="bottom-label">
      {version}
      <div className="dot" />
      watch.lonelil.com
    </h3>
  );
}

export function TopRightLabel() {
  const version = useVersion({ prefixed: true });

  return <h3 className="top-right-label">{version}</h3>;
}
