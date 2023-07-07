import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from '../../../assests/images/cursor.png'
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpSLine } from 'react-icons/ri'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../../redux/actions/admin'
 import Loader from "../../Layout/Loader/Loader"


        const Databox =({title,qty,qtyPercentage,profit})=>(
            <Box
            w={['full','20%']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
            p={'8'}
            borderRadius={'lg'}

            >
                <Text children={title}/>
              <HStack spacing={'6'}>
                <Text fontSize={'2xl'} 
                fontWeight={'bold'}
                children={qty}
                />

                <HStack>
                    <Text children={`${qtyPercentage}%`}/>
                    {profit?<RiArrowUpSLine color='green'/>:(
                        <RiArrowDownLine color='red'/>
                    )}
                </HStack> 
              </HStack>
           <Text opacity={0.6} children="Since Last Month"/>
            </Box>
        )  
          
        const Bar = ({title,value,profit})=>(
            <Box py={'4'} px={['0','20']} >
                 
                 <Heading 
                  size={'sm'}
                  children={title}
                  mb={"2"}
                 />
                 
                 <HStack w={'full'} alignItems={'center'}>
                     
                     <Text children={profit? "0%": `-${value}%`}/>
                      
                      <Progress w={'full'} value={profit? value : 0}
                       colorScheme='purple'
                      />
                     
                     <Text children={`${value>100?value:100}%`}/>
                 </HStack>
            </Box>
        )

const DashBoard = () => {

  const {loading, 
    stats,
    viewsCount,
    subscriptionCount,
    usersCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,} = useSelector(state => state.admin)
 
  const dispatch = useDispatch();

  useEffect(()=>{
dispatch(getDashboardStats())
  },[dispatch])

  return (
    <Grid 
    css={{
        cursor:`url(${cursor}), default`
    }}
    minH={'100vh'} 
    templateColumns={['1fr','5fr 1fr']}
    
    >
        {
          loading ? <Loader color='purple.500' /> : (
            <Box
            boxSizing="border-box"
            py={'16'}
            px={['4','0']}
            >
           <Text
  textAlign={'center'}
  opacity={0.5}
  children={`Last change was on ${
    stats && stats[stats.length-1] && stats[stats.length-1].createdAt
      ? String(new Date(stats[stats.length-1].createdAt)).split('G')[0]
      : 'N/A'
  }`}
/>

                 <Heading children="DashBoard" ml={['0','16']}
                 mb={'16'} textAlign={['center','left']}
                 />
    
    
                 <Stack 
                 direction={['column','row']}
                 minH={'24'}
                 justifyContent={'space-evenly'}
                 >
                  
                  <Databox 
                  title='Views'
                   qty={viewsCount}
                    qtyPercentage={viewsPercentage}
                     profit={viewsProfit}/>
    
               <Databox 
                  title='Users'
                   qty={usersCount}
                    qtyPercentage={usersPercentage}
                     profit={usersProfit}/>
    
                <Databox 
                  title='Subscription'
                   qty={subscriptionCount}
                    qtyPercentage={subscriptionPercentage}
                     profit={subscriptionProfit}/>
    
                 </Stack>
    
    
                 <Box m={['0','6']}
                      borderRadius={'lg'}
                      p={['0','6']}
                      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
                 >
                       <Heading textAlign={['center','left']}
                       size={'md'}
                       children="Views Graph"
                       pt={['8','0']}
                       ml={['0','16']}
                       />
                 {/* line Graph Here */}
                  <LineChart  views={stats && stats.map(item => item.views)}
/>
                 </Box>
    
                 <Grid templateColumns={['1fr','2fr 1fr']}>
                  <Box p={'4'}>
                    
                    <Heading
                    textAlign={['center','left']}
                    my={'8'}
                    size={'md'}
                    children="Progress Bar"
                    ml={['0','16']}
                    />
                    
    
                <Box>
                     <Bar 
                     profit={viewsProfit}
                     title="Views"
                          value={viewsPercentage}
    
                     />
                     <Bar 
                     profit={usersProfit}
                     title="Users"
                          value={usersPercentage}
                     />
                     <Bar profit={subscriptionProfit} title="Subscription"
                          value={subscriptionPercentage}
                     />
                </Box>
                    
                  </Box>
    
                  <Box p={['0','16']}
                    boxSizing="border-box"
                    py={'4'}
                    >
                 <Heading 
                 textAlign={"center"}
                 size={'md'}
                 mb={'4'}
                 children="Users"
                 />
                 {/* Dought Graph */}
                 <DoughnutChart users={[subscriptionCount,usersCount-subscriptionCount]}/>
    
                    </Box>
    
    
                 </Grid>
            </Box>
          )
        }
        <Sidebar/>

    </Grid>
  )
}

export default DashBoard
 