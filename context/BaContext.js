// src/context/state.js
import React, { useContext, useState } from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

export const BaContext = React.createContext({
  ba: undefined,
  setBa: async (ba) => null,
});

export const useBa = () => useContext(BaContext);

export const BaProvider = ({ children }) => {
  const [ba, setBa] = useState(null);

  const setBaLocal = async (ba) => {
    await writeStorage("ba", ba);
    setBa(ba);
  };

  return (
    <BaContext.Provider value={{ ba, setBa }}>{children}</BaContext.Provider>
  );
};
