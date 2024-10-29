/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import './style/theme.css';

const LightDark = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  // Apply theme class to the root document
  useEffect(() => {
    document.documentElement.classList.remove(theme === 'dark' ? 'light-theme' : 'dark-theme');
    document.documentElement.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`main min-h-screen flex items-center justify-center ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="container flex flex-col 
      items-center justify-center text-5xl gap-6">
        <p>Hello World !!</p>
        <p className='text-3xl'>Theme: {theme}</p>
        <Button
          onClick={handleToggleTheme}
          className={`${theme === 'dark' ? 'button-dark' : 'button-light'}`}
        >
          Change Theme
        </Button>
      </div>
    </div>
  );
};

export default LightDark;

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(localStorage.getItem(key)) || String(initialValue);
    } catch (error) {
      console.log(error);
      currentValue = initialValue;
    }
    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
