import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link,useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {

  const reference = useSearchParams()[0].get("reference");

  
  return (
    <Container h='90vh' p={'9'}>
        <Heading my={'8'} textAlign={'center'}>You have Pro Pack</Heading>
         
         <VStack boxShadow={'lg'}
          pb={'15'}
          alignItems={'center'}
          borderRadius={'lg'}
          >
         <Box w={'full'} bg={'yellow.400'} p={'3'} css={{borderRadius:"8px 8px 0 0" }} >
        <Text color={'black'}>
            Payment Success
        </Text>
         </Box>
          <Box p={'3'}>
           <VStack textAlign={'center'} px={'6'} mt={'4'} spacing={'4'}>
            <Text>
                Congratulation you're a pro member. You have access to premium content.
            </Text>
       <Heading size={'4xl'}>
        <RiCheckboxCircleFill/>
       </Heading>

           </VStack>
          </Box>
         <Link to="/profile">
          <Button variant={'ghost'}>Go to Profile</Button>
         </Link>

         <Heading size={'xs'}>
           Reference:{reference}
         </Heading>
         </VStack>
    </Container>
  ) 
}

export default PaymentSuccess