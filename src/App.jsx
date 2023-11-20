import { ChakraProvider, Flex  } from '@chakra-ui/react'
import { ContadorResponsive } from './Components/ContadorResponsive/ContadorResponsive'
import { Header } from './Components/Header/Header'
import { Footer } from './Components/Footer/Footer'

function App() {

  return (
    <ChakraProvider>
      <Header />
      <Flex h="80vh" w="100%" mt="60px">
        <ContadorResponsive />
      </Flex>
      <Footer />
    </ChakraProvider>
  )
}

export default App
