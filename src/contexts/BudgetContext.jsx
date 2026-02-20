import { createContext, useContext, useState } from "react";

// # dichiaro il contesto
const BudgetContext = createContext();

// # funzione per generare il provider
function BudgetProvider({ children }) {
  const [budgetMode, setBudgetMode] = useState(false);

  const [maxPrice, setMaxPrice] = useState(null);

  const toggleBudgetMode = () => {
    setBudgetMode(!budgetMode);
  };

  const changeMaxPrice = (newPrice) => {
    if (newPrice) setMaxPrice(Math.abs(Number(newPrice)));
  };

  //non esporto direttamente il setter, ma una funzione che lo utilizza internamente
  const contextValue = {
    budgetMode,
    toggleBudgetMode,
    maxPrice,
    changeMaxPrice,
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
}

// # funzione per consumare velocemente il context
function useBudget() {
  return useContext(BudgetContext);
}

// # export funzioni
export { BudgetProvider, useBudget };
