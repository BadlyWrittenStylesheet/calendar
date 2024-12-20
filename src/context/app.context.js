import React, { createContext, useState, useEffect, useContext } from 'react';
import defaultPlan from '../_plan';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [plan, setPlan] = useState(() => {
      const savedPlan = localStorage.getItem('school-plan');
      return savedPlan ? JSON.parse(savedPlan) : defaultPlan;
  });

  useEffect(() => {
      localStorage.setItem('school-plan', JSON.stringify(plan));
  }, [plan]);

  return (
    <AppContext.Provider value={{
      plan, 
      setPlan,
    }}>
      {children}
    </AppContext.Provider>
  );
};

