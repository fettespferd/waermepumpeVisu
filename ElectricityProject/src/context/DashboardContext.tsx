import { createContext, useContext, useState } from "react";

type ComponentsState = {
  heatpump: boolean;
  battery: boolean;
  pv: boolean;
};

const defaultState: ComponentsState = { heatpump: true, battery: false, pv: true };

const DashboardContext = createContext<{
  components: ComponentsState;
  setComponents: (c: ComponentsState) => void;
}>({
  components: defaultState,
  setComponents: () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [components, setComponents] = useState(defaultState);
  return (
    <DashboardContext.Provider value={{ components, setComponents }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
} 