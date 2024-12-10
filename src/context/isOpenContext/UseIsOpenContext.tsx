import React, { createContext, useState, ReactNode, useMemo } from 'react';

export interface IContextIsOpenData {
  isOpen: boolean;
  handleOnOpen: () => void;
}

export const IsOpenContext = createContext<IContextIsOpenData | undefined>(
  undefined,
);

export const IsOpenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOnOpen = () => {
    setIsOpen(!isOpen);
  };

  const contextValue = useMemo(
    () => ({
      isOpen,
      handleOnOpen,
    }),
    [isOpen, handleOnOpen],
  );

  return (
    <IsOpenContext.Provider value={contextValue}>
      {children}
    </IsOpenContext.Provider>
  );
};
