import React, { useRef } from "react";
import { useLayoutEffect } from "react";

export const useEvent = function useEvent<
  F extends (...args: unknown[]) => unknown,
  P extends unknown[] = Parameters<F>,
  R = ReturnType<F>,
>(cb: (...args: P) => R) {
  const cache = useRef(cb);

  useLayoutEffect(() => {
    cache.current = cb;
  }, [cb]);

  return React.useCallback((...args: P) => cache.current(...args), [cache]);
};
