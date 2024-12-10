import { useContext } from 'react';
import { IContextPostoData, PostosContext } from './PostosContex';

export const usePostos = (): IContextPostoData => {
  const context = useContext(PostosContext);
  if (context === undefined) {
    throw new Error('usePostos must be used within a PostosProvider');
  }
  return context;
};
