import { useContext } from 'react';
import { EventsContext, IContextEventsData } from './EventsContex';

export const useEvents = (): IContextEventsData => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within a EventsProvider');
  }
  return context;
};
