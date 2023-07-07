import { Heading, Stack, VStack,Text, Button, Image, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import vg from "../../assests/images/bg.png"
import {CgGoogle,CgYoutube} from "react-icons/cg"
import {SiCoursera,SiUdemy}  from "react-icons/si"
import {DiAws} from "react-icons/di"
import  interVideo from "../../assests/videos/intro-video.mp4"

const Home = () => {
  return  (
  <section className='home'>
    <div className="container">
    <Stack direction={['column','row']}
    height="100%"
    justifyContent={["center","space-between"]}
    alignItems="center"
    spacing={['16','56']}
    >
   <VStack
   width={"full"} alignItems={['center','flex-end']}
   >
   <Heading   children="LEARN FROM JATIN" size={"xl"}/>

   <Text fontFamily="cursive"  children="Find Valuable Content At Reasonable Price"/>
   <Link to="/courses">
<Button size={"lg"} colorScheme='yellow'>
    Explore Now
</Button>
   </Link>
   </VStack>
<Image className='vector-graphics' boxSize={"sm"} src={vg} objectFit={"contain"} />


        </Stack>
    </div>
    
<Box padding={'8'} bg="blackAlpha.800">
    <Heading textAlign={"center"} fontFamily="body" color={'yellow.400'}  children="OURS BRANDS"/>
    <HStack className='brandsBanner' justifyContent={"space-evenly"} marginTop="4">

         <CgGoogle/>
         <CgYoutube/>
         <SiCoursera/>
         <SiUdemy/>
         <DiAws/>
     
    </HStack>
</Box>
    <div className="container-2">

        <video src={interVideo} autoPlay muted controls controlsList="nodownload nofullscreen noremoteplayback disablePictureInPicture disableRemotePlayback" ></video>
    </div>
  </section>
  )
}

export default Home