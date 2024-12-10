import { useContext } from 'react';
import { IContextSolicitacoesOPMPMData, SolicitacoesOPMPMsContext } from './SolicitacoesOPMPMsContext';

export const useSolicitacoesOPMPMs = (): IContextSolicitacoesOPMPMData => {
  const context = useContext(SolicitacoesOPMPMsContext);
  if (context === undefined) {
    throw new Error('usePostos must be used within a PostosProvider');
  }
  return context;
};
