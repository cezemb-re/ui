import {
  ReactElement,
  MouseEvent,
  FocusEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
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
  shape?: 'rounded' | 'square' | 'round';
  size?: 'small' | 'medium' | 'large';
  styleType?: 'filled' | 'outlined' | 'text' | 'link' | 'namespace';
  theme?: 'default' | 'lead' | 'alert';
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
}

function Wrapper({
  children,
  href,
  to,
  onClick,
  onFocus,
  shape = 'rounded',
  size = 'medium',
  styleType = 'filled',
  theme = 'default',
  fullWidth = false,
  centered = false,
  paddingLeft,
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
    styleType,
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
    const nextClasses = ['cezembre-ui-button', shape, size, styleType, theme];

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
    styleType,
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
          response !== undefined &&
          response !== null &&
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
      disabled={disabled || pending || autoPending}
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
  shape = 'rounded',
  size = 'medium',
  styleType = 'filled',
  type = 'button',
  theme = 'default',
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
      styleType={styleType}>
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
