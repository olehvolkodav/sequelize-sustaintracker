import React, { useCallback } from 'react';

interface HandlerProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
  dropdownButtonRef: React.RefObject<HTMLButtonElement>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  exclude?: React.RefObject<HTMLElement>[];
}

interface Response {
  handleMouseClick: (event: MouseEvent) => void;
}

const useDropDownHandler = ({
  dropdownRef,
  dropdownButtonRef,
  showDropdown,
  setShowDropdown,
  exclude,
}: HandlerProps): Response => {
  const handleMouseClick = useCallback(
    (event: MouseEvent) => {
      if (showDropdown) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          (!exclude ||
            !exclude.filter((elem) =>
              elem.current?.contains(event.target as Node)
            ).length)
        ) {
          // click outside of the dropdown menu
          setShowDropdown(false);
        }
      } else if (
        dropdownButtonRef.current &&
        dropdownButtonRef.current.contains(event.target as Node)
      ) {
        // button click
        setShowDropdown(true);
      }
    },
    [dropdownRef, dropdownButtonRef, showDropdown, setShowDropdown, exclude]
  );

  return { handleMouseClick };
};

export default useDropDownHandler;
