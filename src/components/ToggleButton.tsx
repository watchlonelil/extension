export interface ToggleButtonProps {
  onClick?: () => void;
  active?: boolean;
}

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.active ? 'ON' : 'OFF'}
    </button>
  );
}
