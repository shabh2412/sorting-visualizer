import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const ThemeContext = createContext({
  theme: "valentine",
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "valentine");
  const toggleTheme = () => {
    const new_theme = (theme === "valentine" ? "coffee" : "valentine");
    setTheme(new_theme);
    localStorage.setItem("theme", new_theme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// props validation 
// declare prop types
ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired
};