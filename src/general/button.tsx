import { ReactElement, MouseEvent, ReactNode, useCallback, useState, useMemo } from 'react';
import { Wrapper, WrapperProps } from '@cezembre/fronts';
import Loader from './loader';
import Icon, { IconName } from './icon';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonShape = 'text' | 'filled';

export type ButtonTheme =
  | 'default'
  | 'light'
  | 'darker'
  | 'lighter'
  | 'submit'
  | 'action'
  | 'action-discreet';

export interface Props extends WrapperProps {
  children?: ReactNode;
  size?: ButtonSize;
  shape?: ButtonShape;
  theme?: ButtonTheme;
  disabled?: boolean;
  pending?: boolean;
  active?: boolean;
  success?: boolean;
  errored?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

export default function Button({
  children,
  href,
  to,
  onClick,
  onFocus,
  onBlur,
  size = 'medium',
  shape = 'text',
  type = 'button',
  theme = 'default',
  active = false,
  pending = false,
  success = false,
  errored = false,
  disabled = false,
  leftIcon,
  rightIcon,
}: Props): ReactElement {
  const [autoPending, setAutoPending] = useState<boolean>(false);
  const [autoSuccess, setAutoSuccess] = useState<boolean>(false);
  const [autoErrored, setAutoErrored] = useState<boolean>(false);

  const className = useMemo<string>(() => {
    let res = `cezembre-ui-button ${size} ${shape} ${theme}`;

    if (active) {
      res += ' active';
    }
    if (pending || autoPending) {
      res += ' pending';
    }
    if (success || autoSuccess) {
      res += ' success';
    }
    if (errored || autoErrored) {
      res += ' errored';
    }
    if (disabled) {
      res += ' disabled';
    }

    return res;
  }, [
    active,
    autoErrored,
    autoPending,
    autoSuccess,
    disabled,
    errored,
    pending,
    shape,
    size,
    success,
    theme,
  ]);

  const onButtonClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        const response = onClick(event);

        if (typeof response === 'object' && response?.then && typeof response.then === 'function') {
          setAutoPending(true);
          try {
            await response;
            setAutoPending(false);
            setAutoSuccess(true);
          } catch (e) {
            setAutoPending(false);
            setAutoErrored(true);
          }
        }
      }
    },
    [onClick],
  );

  return (
    <Wrapper
      href={href}
      to={to}
      onClick={onButtonClick}
      disabled={disabled || pending || autoPending}
      type={type}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}>
      <div className="container">
        <div className="body">
          {leftIcon ? (
            <div className="left-icon">
              <Icon name={leftIcon} />
            </div>
          ) : null}

          {typeof children === 'string' ? (
            <span className="label">{children}</span>
          ) : (
            <div className="component">{children}</div>
          )}
        </div>

        {rightIcon ? (
          <div className="right-icon">
            <Icon name={rightIcon} />
          </div>
        ) : null}
      </div>

      <div className="pending">
        <Loader theme="light" />
      </div>
    </Wrapper>
  );
}
