import React, { useEffect, useState } from "react";

const getWidth = () => {
  return document.documentElement.clientWidth;
};

function useResizeWindow() {
  const [windowSize, setWindowSize] = useState({ width: getWidth() });

  useEffect(() => {
    let timeOutId = null;

    function handleResize() {
      clearTimeout(timeOutId);

      timeOutId = setTimeout(() => {
        setWindowSize({ width: getWidth() });
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useResizeWindow;
