import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introVideo from '../../assests/videos/intro-video.mp4'
import { RiSecurePaymentFill } from 'react-icons/ri'
import termsAndCondition from '../../assests/docs/termsAndCondition.js'

        const Founder =  ()=>(
            <Stack direction={['column','row']} spacing={['4','16']} padding={'8'}>


          <VStack>
            <Avatar
            src="https://yt3.ggpht.com/HBnQzS4jhoyuuxQCpVcjyl6iZ3thYjEp9z4S5cB86fEswDbuOK6N9HIvI3T_MdK95zXvciQm=s108-c-k-c0x00ffffff-no-rj"
            size={'2xl'} boxSizing={['40','48']}/>
            <Text children="Co-founder" opacity={0.7}/>
          </VStack>
 
          <VStack justifyContent={'center'} alignItems={['center','flex-start']}>

            <Heading children="Jatin Vashisth" size={['md','xl']}/>
            <Text 
            textAlign={["center","left"]}
            children={`Hi, I am a Full-Stack Developer.
            Our mission is to provide quality content at reasonable price.`}/>
          </VStack>
            </Stack>
        )
        const VideoPlayer =()=>(
             <Box>
                 <video
                 muted
                 loop
                 src={introVideo} autoPlay controls controlsList="nodownload  nofullscreen noremoteplayback disablePictureInPicture disableRemotePlayback" ></video>
             </Box>
        )
            
          const TandC = ({termsAndCondition})=>(
              <Box>
                <Heading size={'md'} children="Terms & Condition " textAlign={['center','left']}
                my={"4"}
                />
                <Box h={'sm'} p={'4'} overflowY={'scroll'}>
                       <Text fontFamily={'heading'} letterSpacing={'widest'} textAlign={['center','left']}>{termsAndCondition}</Text>

                       <Heading my={'4'} size={'xs'} children="Refund only applicable for cancellation within 7 days."/>
            
                </Box>
              </Box>
          )

const About = () => {
  return (
    <Container maxW={"container.lg"} padding="16" boxShadow={'lg'}>
        
     <Heading children="About Us" textAlign={['center','left']}/>

     <Founder/>

     <Stack m='8' direction={['column','row']} alignItems='center'>
          
          <Text fontFamily={'cursive'} m={'8'} textAlign={['center','left']}>
            We are a video creater streamin platform with some premium courses avilable only for premium users.
          </Text>
          <Link to='/subscribe'>
            <Button variant={'ghost'} colorScheme='yellow'>
             Checkout Our Plan
            </Button>
          </Link>
     </Stack>
          
          <VideoPlayer/>
            <TandC termsAndCondition={termsAndCondition}/>
          <HStack my={'4'} p={'4'}>
            <RiSecurePaymentFill/>
            <Heading size={'xs'} fontFamily={"sans-serif"}
            textTransform={'uppercase'}
            children={"Payment is secured by Razorpay"}/>
          </HStack>

    </Container>
  )
}

export default About