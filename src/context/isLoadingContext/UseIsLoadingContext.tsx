import React, { createContext, useState, ReactNode, useMemo } from 'react';

export interface IContextIsLoadingData {
  IsLoadingOperacao: boolean;
  IsLoadingPostos: boolean;
  IsLoadingEfetivo: boolean;
  handleIsLoadingOperacao: () => void;
  handleIsLoadingPostos: () => void;
  handleIsLoadingEfetivo: () => void;
}

export const IsLoadingContext = createContext<IContextIsLoadingData | undefined>(
  undefined,
);

export const IsLoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [IsLoadingOperacao, setIsLoadingOperacao] = useState<boolean>(false);
  const [IsLoadingPostos, setIsLoadingPostos] = useState<boolean>(false);
  const [IsLoadingEfetivo, setIsLoadingEfetivo] = useState<boolean>(false);
  const handleIsLoadingOperacao = () => {
    setIsLoadingOperacao(!IsLoadingOperacao);
  };
  const handleIsLoadingPostos = () => {
    setIsLoadingPostos(!IsLoadingPostos);
  };
  const handleIsLoadingEfetivo = () => {
    setIsLoadingEfetivo(!IsLoadingEfetivo);
  };

  const contextValue = useMemo(
    () => ({
      IsLoadingOperacao,IsLoadingPostos,IsLoadingEfetivo,
      handleIsLoadingOperacao,handleIsLoadingPostos,handleIsLoadingEfetivo
    }),
    [IsLoadingOperacao,IsLoadingPostos,IsLoadingEfetivo,
      handleIsLoadingOperacao,handleIsLoadingPostos,handleIsLoadingEfetivo],
  );

  return (
    <IsLoadingContext.Provider value={contextValue}>
      {children}
    </IsLoadingContext.Provider>
  );
};
