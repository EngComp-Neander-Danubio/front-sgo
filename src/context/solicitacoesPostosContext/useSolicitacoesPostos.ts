import { useContext } from 'react';
import { IContextSolicitacoesPostoData, SolicitacoesPostosContext } from './SolicitacoesPostosContex';

export const useSolicitacoesPostos = (): IContextSolicitacoesPostoData => {
  const context = useContext(SolicitacoesPostosContext);
  if (context === undefined) {
    throw new Error('usePostos must be used within a PostosProvider');
  }
  return context;
};
