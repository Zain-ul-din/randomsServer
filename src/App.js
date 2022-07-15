import React , { useEffect, useState } from 'react'
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
  
  useEffect (()=>{
          localStorage.setItem ('chakra-ui-color-mode' , 'dark')
  } ,[])
   
  return (
    <ChakraProvider theme={theme}>
      <hackingServer.Provider value={{state ,setState}}>
        <ColorModeSwitcher/>
        {!state.user ? <LoginComponent /> : <ActualApp mode = {state.user} /> }
      </hackingServer.Provider>
    </ChakraProvider>
  );
}

export default App;
