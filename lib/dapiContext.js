// src/context/state.js
import { createContext, useContext } from "react";

const AppContext = createContext();

export function DapiWrapper({ children }) {
  let sharedState = {
    /* whatever you want */
    dapi: null,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
