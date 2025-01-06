import './App.css';
import { 
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import TaskManagement from './components/TaskManagement';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({ // Color scheme state
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  }); 
  const toggleColorScheme = value => { // Toggle color scheme
    setColorScheme(value || (colorScheme === 'light' ? 'dark' : 'light'));
  }
  useHotkeys([['mod+k', () => { // Toggle color scheme with hotkey  mod+k (cmd+k)
    toggleColorScheme();
  }]]);

  return (
    <ColorSchemeProvider 
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>  
      <MantineProvider 
        theme={{colorScheme}}
        withGlobalStyles
        withNormalizeCSS>
        <div className="App">
          <TaskManagement 
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
            />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
