import {
  ReactElement,
  MouseEvent,
  FocusEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  CSSProperties,
} from 'react';
import { NavLink } from 'react-router-dom';
import Loader from './loader';
import Icon, { IconName } from './icon';

export interface Props {
  children?: ReactNode;
  href?: string;
  to?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  shape?: 'square' | 'rounded' | 'round';
  size?: 'small' | 'medium' | 'large';
  style?: 'filled' | 'outlined' | 'text' | 'link' | 'namespace';
  theme?: 'dark' | 'light';
  fullWidth?: boolean;
  centered?: boolean;
  paddingLeft?: number;
  disabled?: boolean;
  pending?: boolean;
  active?: boolean;
  success?: boolean;
  errored?: boolean;
  leftIcon?: IconName;
  leftIconSize?: number;
  rightIcon?: IconName;
  rightIconSize?: number;
  nativeStyle?: CSSProperties;
}

function Wrapper({
  children,
  href = undefined,
  to = undefined,
  onClick = undefined,
  onFocus = undefined,
  shape = 'square',
  size = 'medium',
  style = 'filled',
  theme = 'dark',
  fullWidth = false,
  centered = false,
  paddingLeft = undefined,
  type = 'button',
  disabled = false,
  pending = false,
  active = false,
  success = false,
  errored = false,
}: Props): ReactElement {
  const [autoPending, setAutoPending] = useState<boolean>(false);
  const [autoErrored, setAutoErrored] = useState<boolean>(false);
  const [className, setClassName] = useState<(string | undefined)[]>([
    'cezembre-ui-button',
    shape,
    size,
    style,
    theme,
    active ? 'active' : undefined,
    success ? 'success' : undefined,
    pending || autoPending ? 'pending' : undefined,
    errored || autoErrored ? 'errored' : undefined,
    disabled ? 'disabled' : undefined,
    fullWidth ? 'full-width' : undefined,
    centered ? 'centered' : undefined,
  ]);

  useEffect(() => {
    const nextClasses = ['cezembre-ui-button', shape, size, style, theme];

    if (active) {
      nextClasses.push('active');
    }

    if (success) {
      nextClasses.push('success');
    }

    if (pending || autoPending) {
      nextClasses.push('pending');
    }

    if (errored || autoErrored) {
      nextClasses.push('errored');
    }

    if (disabled) {
      nextClasses.push('disabled');
    }

    if (fullWidth) {
      nextClasses.push('full-width');
    }

    if (centered) {
      nextClasses.push('centered');
    }

    setClassName(nextClasses);
  }, [
    active,
    success,
    errored,
    disabled,
    shape,
    size,
    style,
    pending,
    autoPending,
    autoErrored,
    theme,
    fullWidth,
    centered,
  ]);

  const onButtonClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        const response = onClick(event);

        if (
          typeof response === 'object' &&
          response &&
          'then' in response &&
          response.then &&
          typeof response.then === 'function'
        ) {
          setAutoPending(true);
          try {
            await response;
            setAutoPending(false);
          } catch (e) {
            setAutoPending(false);
            setAutoErrored(true);
          }
        }
      }
    },
    [onClick],
  );

  if (!disabled && !pending && !autoPending && href && href.length) {
    return (
      <a className={className.join(' ')} href={href} onFocus={onFocus} style={{ paddingLeft }}>
        {children}
      </a>
    );
  }

  if (!disabled && !pending && !autoPending && to && to.length) {
    return (
      <NavLink
        className={className.join(' ')}
        to={to}
        exact
        onFocus={onFocus}
        style={{ paddingLeft }}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={className.filter(String).join(' ')}
      onClick={onButtonClick}
      onFocus={onFocus}
      type={type}
      disabled={(disabled || pending || autoPending) as boolean}
      style={{ paddingLeft }}>
      {children}
    </button>
  );
}

export default function Button({
  children = null,
  href = undefined,
  to = undefined,
  onClick = undefined,
  shape = 'square',
  size = 'medium',
  style = 'filled',
  type = 'button',
  theme = 'dark',
  fullWidth = false,
  centered = false,
  paddingLeft = undefined,
  active = false,
  pending = false,
  success = false,
  errored = false,
  disabled = false,
  leftIcon = undefined,
  leftIconSize = 15,
  rightIcon = undefined,
  rightIconSize = 15,
}: Props): ReactElement {
  return (
    <Wrapper
      href={href}
      to={to}
      onClick={onClick}
      pending={pending}
      disabled={disabled}
      type={type}
      shape={shape}
      size={size}
      theme={theme}
      fullWidth={fullWidth}
      centered={centered}
      paddingLeft={paddingLeft}
      active={active}
      success={success}
      errored={errored}
      style={style}>
      <div className="container">
        <div className="body">
          {leftIcon ? (
            <div className="left-icon">
              <Icon name={leftIcon} size={leftIconSize} />
            </div>
          ) : null}

          {children ? <span>{children}</span> : null}
        </div>

        {rightIcon ? (
          <div className="right-icon">
            <Icon name={rightIcon} size={rightIconSize} />
          </div>
        ) : null}
      </div>

      <div className="pending">
        <Loader size={15} />
      </div>

      {/* <div className="error"> */}
      {/*  <Icon type={IconType.ALERT} color="white" size={20} /> */}
      {/* </div> */}
    </Wrapper>
  );
}
