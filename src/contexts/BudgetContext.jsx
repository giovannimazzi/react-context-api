import { createContext, useContext, useState } from "react";

// # dichiaro il contesto
const BudgetContext = createContext();

// # funzione per generare il provider
function BudgetProvider({ children }) {
  const [budgetMode, setBudgetMode] = useState(false);

  /* const changeBudgetMode = (mode) => {
    typeof mode === "boolean"
      ? setBudgetMode(mode)
      : console.log(
          `Errore richiesta changeBudgetMode con argomento: ${mode} di tipo ${typeof mode}. L'argomento deve essere booleano.`,
        );
  }; */

  const toggleBudgetMode = () => {
    setBudgetMode(!budgetMode);
  };

  //non esporto direttamente il setter, ma una funzione che lo utilizza internamente
  const contextValue = { budgetMode, toggleBudgetMode };

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
