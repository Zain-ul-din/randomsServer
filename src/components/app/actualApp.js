
import { useEffect , useState  } from "react"

import {
    Flex ,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box ,
    Code ,
    Button ,
    Stack,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton ,
    useDisclosure,
    Text ,
    Spinner
} from "@chakra-ui/react"

// import { io } from "socket.io-client"
import httpPower from 'axios'

const URL = process.env.REACT_APP_APIURL



//const server = io (process.env.REACT_APP_APIURL)

export default function ActualApp ({mode}) {

 

    const [apisData , setApisData] = useState (null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [idToDel , setIdToDel] = useState ('')

    const [loading , setLoading]= useState (true)
    
    useEffect (()=> {
         
        async function fetchData () {
              const res = await httpPower.get (URL)
              setApisData (res.data)
        }
        
        setInterval (()=>{
            fetchData ()
        } , 30000)
        
       // server.on ('onDataChange' , (listner) => { fetchData() })
      

        fetchData ()
        setLoading(false)
    } , [])
   
    async function DeleteData (id) {
        try {
           await httpPower.delete (`${URL}/${id}`)
           setApisData (apisData.filter (( val ) => val.id !== id))
        } catch (err) {}
    }
    
    return ( <>
      {loading ? <> 
         <Center>
          <Spinner size = {'xl'}/>
         </Center>
      </> :
        <>
           <Center>
           {!apisData && <> 
            <Center>
             <Spinner size = {'xl'}/>
            </Center>
           <Text color={'red'} size = {'2xl'}>
            No targeted user so far 😥
           </Text></>}
           </Center>
           <Flex w = {`100%`} h = {`100%`} justifyContent = {`center`} align = {`center`} p = {{lg :40 , md : 10 , sm : 5 , base : 3}}>
             <Accordion allowMultiple w = {'100%'}>
                {apisData && apisData.map((data , idx) => {
                    return (
                        <AccordionItem key = {idx}>
                        <h2>   
                         <AccordionButton>
                          <Box flex='1' textAlign='left'>
                            {idx}
                          </Box>
                          <AccordionIcon />
                         </AccordionButton>
                        </h2>
                        <AccordionPanel pb = {4} w = {'100%'} overflowX = {'scroll'} >
                            <Stack>
                                <Center>
                             <Box>
                                { mode === 'admin' && 
                               <Button ml = {10} size = {'xs'} colorScheme = {'red'}
                                 onClick={()=> {
                                    setIdToDel(data.id)
                                    onOpen()
                                }}
                               >Delete</Button>}
                             </Box>
                             </Center>
                            <Code colorScheme = {"gray"}>
                                {JSON.stringify(data.data)}
                            </Code>
                            </Stack>
                        </AccordionPanel>
                        </AccordionItem>
                    )
                }) }   
                
             </Accordion>
           </Flex>
           <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are You Sure To Delete ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {idToDel}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => { 
                onClose()
                setIdToDel ('')
            }}>
              Close
            </Button>
            <Button colorScheme={'red'} onClick = {async()=> {
                await DeleteData (idToDel)
                onClose ()
            }}
            >Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>}</>
    )
}