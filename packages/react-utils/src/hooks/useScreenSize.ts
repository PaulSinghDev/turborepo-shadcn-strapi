"use client";

import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    // make sure we have a window
    if (typeof window === "undefined") return;

    // If we are resizing then bail so to not hammer the listener
    if (isResizing) return;

    if (!height && !width) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    // init a timeout for the debounce
    let timer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
        setIsResizing(false);
      }, 150);
    };

    // add our listener
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // return our dimensions
  return {
    width,
    height,
  };
};
