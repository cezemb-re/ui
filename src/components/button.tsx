import React, {
  ReactElement,
  MouseEvent,
  FocusEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  CSSProperties,
} from 'react';
import Loader from './loader';
import Icon, { IconName } from './icon';

export interface Props {
  children?: ReactNode;
  href?: string | null;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  shape?: 'round' | 'square';
  size?: 'small' | 'medium' | 'large';
  buttonStyle?: 'filled' | 'outlined' | 'text';
  theme?: 'dark' | 'light';
  disabled?: boolean;
  pending?: boolean;
  active?: boolean;
  success?: boolean;
  errored?: boolean;
  leftIcon?: ReactNode | IconName;
  rightIcon?: ReactNode | IconName;
  style?: CSSProperties;
}

function Wrapper({
  children,
  href = null,
  onClick = undefined,
  onFocus = undefined,
  shape = 'square',
  size = 'medium',
  buttonStyle = 'filled',
  theme = 'dark',
  type = 'button',
  disabled = false,
  pending = false,
  active = false,
  success = false,
  errored = false,
  style = {},
}: Props): ReactElement {
  const [autoPending, setAutoPending] = useState<boolean>(false);
  const [autoErrored, setAutoErrored] = useState<boolean>(false);
  const [className, setClassName] = useState<string[]>([
    'cezembre-ui-button',
    shape,
    size,
    buttonStyle,
    theme,
  ]);

  useEffect(() => {
    const nextClasses = ['cezembre-ui-button', shape, size, buttonStyle, theme];

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

    setClassName(nextClasses);
  }, [
    active,
    success,
    errored,
    disabled,
    shape,
    size,
    buttonStyle,
    pending,
    autoPending,
    autoErrored,
    theme,
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
    [onClick]
  );

  if (!disabled && !pending && !autoPending && href && href.length) {
    return (
      <a
        className={className.join(' ')}
        href={href}
        onFocus={onFocus}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={className.join(' ')}
      onClick={onButtonClick}
      onFocus={onFocus}
      type={type}
      disabled={(disabled || pending || autoPending) as boolean}
      style={style}
    >
      {children}
    </button>
  );
}

export default function Button({
  children = null,
  href = null,
  onClick = undefined,
  shape = 'square',
  size = 'medium',
  buttonStyle = 'filled',
  type = 'button',
  theme = 'dark',
  active = false,
  pending = false,
  success = false,
  errored = false,
  disabled = false,
  leftIcon = undefined,
  rightIcon = undefined,
  style = {},
}: Props): ReactElement {
  return (
    <Wrapper
      href={href}
      onClick={onClick}
      pending={pending}
      disabled={disabled}
      type={type}
      shape={shape}
      size={size}
      theme={theme}
      buttonStyle={buttonStyle}
      active={active}
      success={success}
      errored={errored}
      style={style}
    >
      <div className="container">
        <div className="body">
          {leftIcon ? (
            <div className="left-icon">
              {typeof leftIcon === 'string' ? (
                <Icon name={leftIcon as IconName} size={20} />
              ) : (
                leftIcon
              )}
            </div>
          ) : null}

          {children ? <span>{children}</span> : null}
        </div>

        {rightIcon ? (
          <div className="right-icon">
            {typeof rightIcon === 'string' ? (
              <Icon name={rightIcon as IconName} size={17} />
            ) : (
              rightIcon
            )}
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
