import { ChakraProvider } from '@chakra-ui/react'
import { ContadorResponsive } from './Components/ContadorResponsive/ContadorResponsive'

function App() {

  return (
    <ChakraProvider>
      <ContadorResponsive/>
    </ChakraProvider>
  )
}

export default App
