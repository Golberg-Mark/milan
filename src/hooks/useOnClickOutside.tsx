import React, { useEffect } from 'react';

export type Event = React.SyntheticEvent;
export type Callback = () => void;
export type Ref = HTMLDivElement | HTMLUListElement;

const useOnClickOutside = <T extends Ref>(callback: Callback) => {
  const containerRef = React.useRef<T>(null);

  useEffect(() => {
    const listener = (e: Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Ref)) {
        callback();
      }

      return null;
    };

    document.body.addEventListener('click', listener as any);

    return () => {
      document.body.addEventListener('click', listener as any);
    };
  }, [callback]);

  return containerRef;
};

export default useOnClickOutside;
