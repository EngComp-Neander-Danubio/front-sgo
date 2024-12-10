import { useContext } from 'react';
import { IContextSolicitacoesPMData, SolicitacoesPMContext } from './SolicitacoesPMsContex';

export const useSolicitacoesPMs = (): IContextSolicitacoesPMData => {
  const context = useContext(SolicitacoesPMContext);
  if (context === undefined) {
    throw new Error('usePostos must be used within a PostosProvider');
  }
  return context;
};
