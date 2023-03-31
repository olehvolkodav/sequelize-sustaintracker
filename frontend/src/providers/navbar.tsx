import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import useWindowDimensions from '../hooks/useWindowDimensions';

interface NavBarContextData {
  width: string;
  widthLimit: {
    max: string;
    min: string;
    collapsed: string;
  };
  isCollapsed: boolean;
  toggleIsCollapsed: () => void;
}

const widthLimit = { max: 250, min: 210, collapsed: 59 };

const NavBarContext = createContext<NavBarContextData>({} as NavBarContextData);

export const NavBarProvider: React.FC = ({ children }) => {
  const [width, setWidth] = useState(widthLimit.max);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { width: windowWidth } = useWindowDimensions();

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed((state) => !state);
  }, []);

  useEffect(() => {
    setWidth(
      isCollapsed
        ? widthLimit.collapsed
        : Math.max(Math.min(windowWidth * 0.16, widthLimit.max), widthLimit.min)
    );
  }, [isCollapsed, windowWidth]);

  return (
    <NavBarContext.Provider
      value={{
        width: `${width}px`,
        widthLimit: {
          max: `${widthLimit.max}px`,
          min: `${widthLimit.min}px`,
          collapsed: `${widthLimit.collapsed}px`,
        },
        isCollapsed,
        toggleIsCollapsed,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export function useNavBar(): NavBarContextData {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
}
