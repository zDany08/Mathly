import { createContext, useContext } from "react";

export type Calculation = {
    expression: string,
    result?: number
};

export type CalculationState = {
    calculation: Calculation,
    setCalculation: React.Dispatch<React.SetStateAction<Calculation>>
};

export const CalculationContext = createContext<CalculationState | undefined>(undefined);

export function useCalculationContext() {
    const ctx = useContext(CalculationContext);
    if(!ctx) throw new Error("useCalculationContext must be performed inside a CalculationContext.Provider");
    return ctx;
}
