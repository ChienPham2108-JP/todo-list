import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [deBounceValue, setDeBounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDeBounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line
  }, [value]);

  return deBounceValue;
}

export default useDebounce;
