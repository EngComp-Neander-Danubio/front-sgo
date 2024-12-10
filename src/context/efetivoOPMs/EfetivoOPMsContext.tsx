import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { OPMs } from '../../types/typesOPM';

export interface IContextEfetivoOPMsData {
  inputValues: string;
  opms: OPMs[];
  isLoading: boolean;
  //handleSetInputGeralValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadDatasOPMs: (data: any) => void;
  setOPMs: React.Dispatch<React.SetStateAction<OPMs[]>>;
}

export const TotalEfetivoOPMsContext = createContext<
  IContextEfetivoOPMsData | undefined
>(undefined);

export const TotalEfetivoOPMsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [opms, setOPMs] = useState<OPMs[]>([]);

  /* const handleSetInputGeralValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Chamou a função de input', e.currentTarget.value);
      console.log('inputValues', inputValues);
      setIsLoading(true);
      setInputValues(e.currentTarget.value);
    },
    [inputValues], // Adicionando inputValues como dependência
  ); */

  const uploadDatasOPMs = useCallback((data: any) => {
    setOPMs(data);
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoading,
      opms,
      uploadDatasOPMs,
      setOPMs,
    }),
    [isLoading, opms, uploadDatasOPMs, setOPMs],
  );

  return (
    <TotalEfetivoOPMsContext.Provider value={contextValue}>
      {children}
    </TotalEfetivoOPMsContext.Provider>
  );
};
