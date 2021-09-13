import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';

export interface Props {
  children?: ReactNode;
  filter?: (anchor: Node) => boolean;
}

export default function Selection({ children, filter }: Props): ReactElement {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ left?: number; top?: number }>({});

  const positionModal = useCallback(() => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (!range.collapsed) {
        const { anchorNode } = selection;

        if (anchorNode && (!filter || filter(anchorNode))) {
          const { parentElement } = anchorNode;

          if (parentElement) {
            const selectionRect = range.getBoundingClientRect();

            setPosition({
              left: selectionRect.left + selectionRect.width / 2,
              top: parentElement.offsetTop,
            });
            setIsActive(true);
          }
        } else {
          setIsActive(false);
        }
      } else {
        setIsActive(false);
      }
    } else {
      setIsActive(false);
    }
  }, [filter]);

  useEffect(() => {
    document.addEventListener('mouseup', positionModal);
    document.addEventListener('keyup', positionModal);
    return () => {
      document.removeEventListener('mouseup', positionModal);
      document.removeEventListener('keyup', positionModal);
    };
  }, [positionModal]);

  return (
    <div className={`cezembre-ui-modals-selection${isActive ? ' active' : ''}`} style={position}>
      {children}
    </div>
  );
}
