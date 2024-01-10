import type { ReactNode } from 'react';

import './Frame.css';

export interface FrameProps {
  children?: ReactNode;
}

export function Frame(props: FrameProps) {
  return (
    <div className="frame" style={{ width: 300, height: 300 }}>
      {props.children}
    </div>
  );
}
