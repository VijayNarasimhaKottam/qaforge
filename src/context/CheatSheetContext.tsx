import React, { createContext, useContext, useState, useEffect } from 'react';

interface CheatSheetContextType {
  cheatSheetActive: boolean;
  toggleCheatSheet: () => void;
}

const CheatSheetContext = createContext<CheatSheetContextType | undefined>(undefined);

export const CheatSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cheatSheetActive, setCheatSheetActive] = useState<boolean>(false);

  useEffect(() => {
    if (cheatSheetActive) {
      document.body.classList.add('qa-cheat-sheet-active');
    } else {
      document.body.classList.remove('qa-cheat-sheet-active');
    }
  }, [cheatSheetActive]);

  const toggleCheatSheet = () => {
    setCheatSheetActive((prev) => !prev);
  };

  return (
    <CheatSheetContext.Provider value={{ cheatSheetActive, toggleCheatSheet }}>
      {children}
    </CheatSheetContext.Provider>
  );
};

export const useCheatSheet = () => {
  const context = useContext(CheatSheetContext);
  if (!context) {
    throw new Error('useCheatSheet must be used within a CheatSheetProvider');
  }
  return context;
};
