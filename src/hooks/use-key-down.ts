import { useEffect } from "react"

const useKeyDown = (key: string, cb: () => void) => {

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === key) {
        cb();
      }
    }

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, [key, cb])
}

export default useKeyDown;