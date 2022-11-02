import { createContext, FC, useContext } from "react";

import services from "../services";

const ServiceContext = createContext<typeof services>(services);

export const ServiceProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
