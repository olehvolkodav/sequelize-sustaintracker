import { useEffect, useState } from 'react';

interface Response {
  width: number;
  height: number;
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = (): Response => {
  const [dims, setDims] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDims(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dims;
};

export default useWindowDimensions;
