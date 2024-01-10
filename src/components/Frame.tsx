import type { ReactNode } from 'react';

export interface FrameProps {
  children?: ReactNode;
}

export function Frame(props: FrameProps) {
  return <div style={{ width: 300, height: 300 }}>{props.children}</div>;
}
