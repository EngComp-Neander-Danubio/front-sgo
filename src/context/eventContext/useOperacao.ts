import { useContext } from 'react';
import { OperacaosContext, IContextOperacaosData } from './OperacaoContex';

export const useOperacao = (): IContextOperacaosData => {
  const context = useContext(OperacaosContext);
  if (context === undefined) {
    throw new Error('useOperacao must be used within a OperacaoProvider');
  }
  return context;
};
