import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const BalanceContext = createContext(0);

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getBalance() {
      try {
        const response = await axios.get("/api/v1/account/balance", {
          withCredentials: true,
        });

        console.log("Dashboard component. b alance response - ", response);

        setBalance(response.data.balance);
      } catch (error) {
        console.error(
          "Dashboard component. error fetching balance... full error - ",
          error
        );
      }
    }

    getBalance();
  }, []);

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}
