import { createContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const DashboardContext = createContext(null);

const DashboardContextProvider = (props) => {

    const test = 1;
  const contextValue = {
    test
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
