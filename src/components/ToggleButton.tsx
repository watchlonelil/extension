import { Icon } from './Icon';
import './ToggleButton.css';

export interface ToggleButtonProps {
  onClick?: () => void;
  active?: boolean;
}

export function ToggleButton(props: ToggleButtonProps) {
  const opacityStyle = {
    opacity: props.active ? 0 : 1,
  };

  return (
    <div className="button-container">
      <div className={['button-wrapper', props.active ? 'active' : ''].join(' ')}>
        <button
          type="button"
          onClick={props.onClick}
          aria-label="Toggle extension on/off"
          className="toggle-button"
          style={{
            color: props.active ? '#9B93CC' : '#4B4765',
          }}
        >
          <div className="actual-button-style" />
          <div className="actual-button-style active" style={opacityStyle} />
          <Icon name="power" />
          <div
            className="glow-thingie"
            style={{
              backgroundColor: props.active ? '#452D7C' : '#181724',
            }}
          />
        </button>
      </div>
      <p>
        Extension{props.active ? '' : ' not'} enabled on <strong>movie-web.app</strong>
      </p>
    </div>
  );
}
