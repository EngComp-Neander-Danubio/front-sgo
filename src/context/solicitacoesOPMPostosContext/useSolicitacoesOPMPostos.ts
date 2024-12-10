import { useContext } from 'react';
import { IContextSolicitacoesOPMPostoData, SolicitacoesOPMPostosContext } from './SolicitacoesOPMPostosContext';

export const useSolicitacoesOPMPostos = (): IContextSolicitacoesOPMPostoData => {
  const context = useContext(SolicitacoesOPMPostosContext);
  if (context === undefined) {
    throw new Error('usePostos must be used within a PostosProvider');
  }
  return context;
};
