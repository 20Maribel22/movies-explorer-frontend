import React from "react";

function useResizeWindow() {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", () =>
      setTimeout(() => handleResize(), 1000)
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useResizeWindow;
