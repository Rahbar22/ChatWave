import React, { useEffect } from 'react'
import {Container, Box, Text,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user){
      navigate("/chats");
    }
  },[navigate]);

  return (
    <Container maxW='xl' centerContent>
      <Box display={'flex'} justifyContent={'center'} p={3} bg={'white'} 
      w={'100%'} m={'40px 0 15px 0'} borderRadius={'lg'}
      borderWidth={'1px'}>
        <Text fontSize={'18px'}>ChatWave</Text>
      </Box>
      <Box  bg={'white'} w={'100%'} borderRadius={'lg'}
      borderWidth={'1px'}>
        <Tabs mt={'3px'} variant={'soft-rounded'} colorScheme='green'>
          <TabList mb={'1e,'}>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<Login></Login>}</TabPanel>
            <TabPanel>{<Signup></Signup>}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
