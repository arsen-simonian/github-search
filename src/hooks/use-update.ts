/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export default function useUpdate(cb: () => unknown, deps: Array<unknown>) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
     else {
      const cleanup = cb();

      if (typeof cleanup === 'function') {
        return () => {
          cleanup();
        }
      }
     }
  }, [deps])
}