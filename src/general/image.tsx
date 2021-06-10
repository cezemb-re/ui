import React, {
  ReactElement,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useImageDimensions,
  AspectRatio,
  calcHeight,
  calcWidth,
  Mode,
  PlaceholderCategory,
  placeIMG,
  resolveRatio,
  useMeasure,
} from '@cezembre/fronts';

export interface Props {
  src?: string | null;
  alt?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: AspectRatio;
  mode?: Mode;
  placeholder?: boolean;
  placeholderCategory?: PlaceholderCategory;
  borderRadius?: string | number;
}

export default function Image({
  src,
  alt = 'Missing description',
  width = undefined,
  height = undefined,
  aspectRatio = AspectRatio.FIT,
  mode = Mode.LANDSCAPE,
  placeholder = false,
  placeholderCategory = PlaceholderCategory.ANY,
  borderRadius = 0,
}: Props): ReactElement {
  let trueSrc = src;

  if (!trueSrc && placeholder) {
    trueSrc = placeIMG(
      {
        width: typeof width === 'number' && width ? width : 600,
        height: typeof height === 'number' && height ? height : 450,
        ratio: 4 / 3,
      },
      placeholderCategory
    );
  }

  const imageContainer = useRef<HTMLDivElement>(null);
  const containerMeasure = useMeasure<HTMLDivElement>(imageContainer);
  const imageDimensions = useImageDimensions(trueSrc);
  const [isOriginalRatio, setIsOriginalRatio] = useState<boolean>(true);

  const [style, setStyle] = useState<CSSProperties>({ width, height });

  useEffect(() => {
    if (!containerMeasure || (width !== undefined && height !== undefined)) {
      return;
    }

    if (width !== undefined) {
      const computedWidth: number =
        typeof width === 'number' ? width : containerMeasure.width;

      if (imageDimensions && aspectRatio === AspectRatio.FIT) {
        setStyle((oldStyle) => ({
          ...oldStyle,
          height: computedWidth / imageDimensions.ratio,
        }));
      } else if (aspectRatio !== AspectRatio.COVER) {
        setStyle((oldStyle) => ({
          ...oldStyle,
          height: calcHeight(computedWidth, aspectRatio, mode),
        }));
      }
    }
    if (height !== undefined) {
      const computedHeight: number =
        typeof height === 'number' ? height : containerMeasure.height;

      if (imageDimensions && aspectRatio === AspectRatio.FIT) {
        setStyle((oldStyle) => ({
          ...oldStyle,
          width: computedHeight * imageDimensions.ratio,
        }));
      } else if (aspectRatio !== AspectRatio.COVER) {
        setStyle((oldStyle) => ({
          ...oldStyle,
          width: calcWidth(computedHeight, aspectRatio, mode),
        }));
      }
    }
  }, [aspectRatio, containerMeasure, height, imageDimensions, mode, width]);

  useEffect(() => {
    if (aspectRatio === AspectRatio.FIT) {
      if (width === undefined && height === undefined) {
        setIsOriginalRatio(true);
      } else if (width !== undefined || height !== undefined) {
        if (
          containerMeasure &&
          imageDimensions &&
          containerMeasure.width / containerMeasure.height ===
            imageDimensions.ratio
        ) {
          setIsOriginalRatio(true);
        } else {
          setIsOriginalRatio(false);
        }
      } else {
        setIsOriginalRatio(true);
      }
    } else if (
      imageDimensions &&
      resolveRatio(aspectRatio, mode) === imageDimensions.ratio
    ) {
      setIsOriginalRatio(true);
    } else {
      setIsOriginalRatio(false);
    }
  }, [aspectRatio, containerMeasure, height, imageDimensions, mode, width]);

  return (
    <div
      className="cezembre-ui-image"
      ref={imageContainer}
      style={{ borderRadius, width, height }}
    >
      {trueSrc && isOriginalRatio ? (
        <img src={trueSrc} alt={alt} style={style} />
      ) : (
        <span
          role="img"
          aria-label={alt}
          style={{
            ...style,
            backgroundImage: trueSrc ? `url(${trueSrc})` : 'none',
          }}
        />
      )}
    </div>
  );
}
