

import React , {useState , useContext} from 'react'
import { hackingServer } from '../context/store'

import { 
    Center ,
    Stack ,
    FormControl ,
    FormLabel ,
    Input ,
    FormHelperText, 
    Flex ,
    Text ,
    InputRightElement ,
    Button ,
    InputGroup ,
} 
from '@chakra-ui/react'

import { ViewIcon , ViewOffIcon } from '@chakra-ui/icons'

const PASSWORD = process.env.REACT_APP_USERPASSWORD 

export default function LoginComponent () {
    const hackerLogin = useContext (hackingServer)
    const  [showPassword , setShowPassword ] = useState (false)
    const [password , setPassword] = useState ('')
    

    return (
        <>
        <Flex w = {'100%'} h = {'100%'} justifyContent = {'center'} alignItems = {'center'} 
        backdropSaturate = {5} p = {45} alignContent = {'center'} py = {100}>

           <Stack my = {'10%'}>
            <form onSubmit={(e)=> {
                e.preventDefault()
                hackerLogin.setState ({...hackerLogin.state 
                , user : password === PASSWORD ? 'user' : null})
            }}>
            <FormControl>
             <FormLabel htmlFor = 'password'>Enter Password</FormLabel>
             <InputGroup>
              <Input id='password' type={ showPassword ? 'text' : 'password' } 
              onChange = {(e)=>setPassword (e.target.value)} value = {password}
              autoFocus
              />
              <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick = {()=>setShowPassword(!showPassword)}
                    >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button> 
             </InputRightElement>
             </InputGroup>
            <Center m= {2}> <Button type='submit'>Enter</Button> </Center>
             <FormHelperText>
             <Text
             textAlign="center"
             fontSize="smaller"
             _dark={{
               color: "white",
             }}
            >
              &copy;Copyright. All rights reserved RANDOMS HACKERS.
            </Text>
             </FormHelperText>
             
            </FormControl>
            </form>
           </Stack>
        </Flex>
        </>
    )
}

