import { useState, useEffect, useCallback } from 'react';
import {
  BREAK_POINT_4K,
  BREAK_POINT_DESKTOP,
  BREAK_POINT_LAPTOP_L,
  BREAK_POINT_LAPTOP,
  BREAK_POINT_TABLET,
  BREAK_POINT_TABLET_S,
  BREAK_POINT_MOBILE_L,
  BREAK_POINT_MOBILE_M,
  BREAK_POINT_MOBILE_S,
} from './_containers.scss';

export enum BreakPoint {
  _4K = parseInt(BREAK_POINT_4K, 10),
  DESKTOP = parseInt(BREAK_POINT_DESKTOP, 10),
  LAPTOP_L = parseInt(BREAK_POINT_LAPTOP_L, 10),
  LAPTOP = parseInt(BREAK_POINT_LAPTOP, 10),
  TABLET = parseInt(BREAK_POINT_TABLET, 10),
  TABLET_S = parseInt(BREAK_POINT_TABLET_S, 10),
  MOBILE_L = parseInt(BREAK_POINT_MOBILE_L, 10),
  MOBILE_M = parseInt(BREAK_POINT_MOBILE_M, 10),
  MOBILE_S = parseInt(BREAK_POINT_MOBILE_S, 10),
}

export function useBreakPoint(breakPoint: BreakPoint = BreakPoint.MOBILE_S): boolean {
  const [broke, setBroke] = useState<boolean>(false);

  const calcBreakingPoint = useCallback(() => {
    if (window.innerWidth <= breakPoint && !broke) setBroke(true);
    else if (window.innerWidth > breakPoint && broke) setBroke(false);
  }, [breakPoint, broke]);

  useEffect(() => {
    calcBreakingPoint();
    window.addEventListener('resize', calcBreakingPoint);
    return () => window.removeEventListener('resize', calcBreakingPoint);
  }, [calcBreakingPoint]);

  return broke;
}
