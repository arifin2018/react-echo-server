import { createContext, useContext } from "react";

const ThemeContext = createContext();

const ThemeA = ({ theme, children }) => {
    // const theme = 'black'; // You can replace this with dynamic data
    return (
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    );
  };

const ThemedButton = () => {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
      Themed Button
    </button>
  );
};

const App = () => {
    return (
      <ThemeA theme="light">
        <div>
          <h1>Using createContext and useContext with Children in React</h1>
          <ThemedButton />
        </div>
      </ThemeA>
    );
  };
  
  export default App;