// src/config/responsive.js
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
  return { isDesktopOrLaptop, isTabletOrMobile };
};
