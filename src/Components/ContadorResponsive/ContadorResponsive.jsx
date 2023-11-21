import React, { useState, useRef } from 'react'
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { motion, useMotionValue, useTransform } from "framer-motion"

const ContadorResponsive = () => {
    const [contador, setContador] = useState(0)
    const referenciaPadre = useRef();
    const [inicioDrag,setInicioDrag] = useState(0);
    const [ejeX,setEjeX] = useState("");

    let sumar = () => {
            setContador(contador + 1)
    }

    let restar = () => {
        if(contador > 0){
            setContador(contador - 1)
        }
    }

    let reset = () => {
        setContador(0)
        setEjeX("y")
    }

    const x = useMotionValue(0)

    const obtenerInicioDrag = (e,info) => {
        setInicioDrag(info.point.x);
    }

    const obtenerFinalDrag = (e,info) => {
        if (inicioDrag < info.point.x && ejeX == "x"){
            sumar();
        } else if (inicioDrag > info.point.x && ejeX == "x"){
            restar();
        }
    }

    const xInput = [-100, 0, 100]
    const color = useTransform(x, xInput, [
      "rgb(211, 9, 225)",
      "rgb(68, 0, 255)",
      "rgb(3, 209, 0)"
    ])
    const simboloMenos = useTransform(x, [-1, -10], [0, 1])
    const simboloMasVertical =  useTransform(x, [1, 10], [0, 1])
    const simboloMasHorizontal = useTransform(x, [1, 10], [0, 1])

    return(
        <VStack w="100%" pt="50px" justifyContent="center">
            <Flex>
                <Heading as='h1' size='4xl' mb="150px" textAlign="center">
                    {contador}
                </Heading>
            </Flex>
            <Flex width="50%" justifyContent="space-evenly"  display={{base:"none", md:"flex"}}>
                <motion.div whileHover={contador==0 ? { scale: 1 } : { scale: 1.2 }} whileTap={contador==0 ? { scale: 1 } : { scale: 0.8 }}>
                    <Button onClick={restar}isDisabled={contador==0 ? true : false}>Restar</Button>
                </motion.div>
                <motion.div whileHover={contador==0 ? { scale: 1 } : { scale: 1.2 }} whileTap={contador==0 ? { scale: 1 } : { scale: 0.8 }}>
                    <Button onClick={reset}isDisabled={contador==0 ? true : false}>Borrar</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    <Button onClick={sumar}>Sumar</Button>
                </motion.div>
            </Flex>
            <Flex alignItems="center" alignContent="center" justifyContent="center" width="100%" height="300" display={{base:"flex", md:"none"}}>
                <Box width="100px">
                    <motion.div ref={referenciaPadre} w="100%" h="100%">
                        <motion.div
                            style={{ x }}
                            drag
                            dragDirectionLock
                            onDirectionLock={(e) => e == "y" ? reset() : setEjeX(e)}
                            dragConstraints={referenciaPadre}
                            onDragStart={obtenerInicioDrag}
                            onDragEnd={obtenerFinalDrag}
                            width="150px"
                            height="150px"
                            position="absolute"
                            top="calc(50% - 150px / 2)"
                            left="calc(50% - 150px / 2)"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <svg className="iconosTactiles" viewBox="0 0 50 50" w="85%" h="85%">
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                                    style={{ translateX: 5, translateY: 5 }}
                                />
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M25,13 L25,36"
                                    strokeDasharray="0 1"
                                    style={{ pathLength: simboloMasVertical }}
                                />
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M13,25 L36,25"
                                    strokeDasharray="0 1"
                                    style={{ pathLength: simboloMasHorizontal }}
                                />
                                <motion.path
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={color}
                                    d="M13,25 L36,25"
                                    strokeDasharray="0 1"
                                    style={{ pathLength: simboloMenos }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </Box>
            </Flex>
        </VStack>
    )
}

export { ContadorResponsive }