import React, { createContext, useContext, useEffect, useState } from 'react';

interface IAppContext {
  isDarkTheme: boolean;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  toggleDarkTheme: () => void;
}

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkTheme');

  if (!storedDarkMode) return prefersDarkMode;

  return storedDarkMode === 'true';
};

const AppContext = createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('darkTheme', `${newDarkTheme}`);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
