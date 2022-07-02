import React , { useState } from 'react'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import LoginComponent from './components/login'
import { hackingServer } from './context/store'
import ActualApp from './components/app/actualApp'

function App() {
   
  const [state , setState] = useState ({})
  
  return (
    <ChakraProvider theme={theme}>
      <hackingServer.Provider value={{state ,setState}}>
        <ColorModeSwitcher/>
        {!state.user ? <LoginComponent /> : <ActualApp/ > }
      </hackingServer.Provider>
    </ChakraProvider>
  );
}

export default App;
