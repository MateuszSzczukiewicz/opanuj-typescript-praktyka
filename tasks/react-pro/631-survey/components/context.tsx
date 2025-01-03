import { createContext, useContext } from 'react';
import { SurveyContextType } from './types';

export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('Survey controls must be used within a Survey component');
  }
  return context;
};
