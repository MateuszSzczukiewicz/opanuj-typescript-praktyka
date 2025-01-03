import React, { useState } from 'react';
import { SurveyContext } from './context';
import { SurveyProps } from './types';

const Survey = ({ children, onSubmit }: SurveyProps) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) {
      throw new Error('onSubmit callback is required!');
    }
    onSubmit(values);
  };

  return (
    <SurveyContext.Provider value={{ handleSubmit, values, setValues }}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {children}
      </form>
    </SurveyContext.Provider>
  );
};

export default Survey;
