import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "794129159847354"; // 👈 replace with your Meta Pixel ID

function MetaPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    const options = {
      autoConfig: true,
      debug: false, // change to true if you want console logs
    };

    ReactPixel.init(PIXEL_ID, {}, options);

    // Track a pageview on every route change
    ReactPixel.pageView();
  }, [location]);

  return null;
}

export default MetaPixelTracker;
