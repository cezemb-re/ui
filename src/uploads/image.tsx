import React, {
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AspectRatio, Mode } from '@cezembre/fronts';
import Loader from '../general/loader';
import Icon, { IconName } from '../general/icon';
import Image, { Props as ImageProps } from '../general/image';

const reader = new FileReader();

export interface Props extends ImageProps {
  onUpload?: ((file: File) => Promise<void>) | null;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  tabIndex?: number;
}

export default function UploadImage({
  src,
  alt = 'Missing description',
  width = '100%',
  height = undefined,
  aspectRatio = AspectRatio.AR19x9,
  mode = Mode.LANDSCAPE,
  borderRadius = 0,
  onUpload,
  onFocus,
  onBlur,
  tabIndex = 0,
}: Props): ReactElement {
  const input = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(src);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    setError(null);

    if (event.target.files && event.target.files[0]) {
      // TODO : Check format && size
      const image = event.target.files[0];

      reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
        if (progressEvent.target && progressEvent.target.result) {
          if (typeof progressEvent.target.result === 'string') {
            setImageSrc(progressEvent.target.result);
          }
        }
      };

      reader.readAsDataURL(image);

      if (onUpload) {
        try {
          setPending(true);
          await onUpload(event.target.files[0]);
          setPending(false);
        } catch (e) {
          setError(e);
        }
      }
    }
  }

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (input.current && event.key === 'Enter') {
      input.current.click();
    }
  }, []);

  const [classNames, setClassNames] = useState<string[]>([
    'cezembre-ui-upload-image',
  ]);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-upload-image'];

    if (pending || error) {
      nextClassNames.push('active');
    }

    if (!imageSrc) {
      nextClassNames.push('empty');
    }

    setClassNames(nextClassNames);
  }, [error, imageSrc, pending]);

  return (
    <div
      className={classNames.join(' ')}
      role="button"
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={() => (input.current ? input.current.click() : null)}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      <input type="file" onChange={onChange} ref={input} />

      <div className="image">
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
          mode={mode}
          borderRadius={borderRadius}
        />
      </div>

      <div className="overlay">
        {error ? <p className="error">{error.message}</p> : null}
        {pending ? <Loader size={40} /> : null}
        {!error && !pending ? (
          <Icon name={IconName.CAMERA} color="white" size={40} />
        ) : null}
      </div>
    </div>
  );
}
