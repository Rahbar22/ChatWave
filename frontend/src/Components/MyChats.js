import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Box, Button, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/chatLogics';

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();
    const {user, selectedChat, setSelectedChat, chat, setChat} = ChatState();

    const toast = useToast();

    const fetchChat = async (userId) => {

        try{
            const config = {
                headers: {
                    'Authorization' :`Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/chats`, config);
            
            setChat(data);
        }
        catch(error){
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChat();
    }, [])

  return (
    <Box display={{base:selectedChat?'none':'flex', md:'flex'}} flexDir={'column'} alignItems={'center'} p={3} bg={'white'}
        w={{base:"100%", md:'31%'}} borderRadius={'lg'} borderWidth={'1px'}>
            <Box  pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" display="flex" w="100%"
                    justifyContent="space-between"  alignItems="center">
                        My Chats

                        <Button display={'flex'} rightIcon={<AddIcon/>}>
                            New Group Chat
                        </Button>
            </Box>

            <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
                {chat?(
                    <Stack overflowY={'scroll'}>
                        {chat.map((c) => (
                            <Box onClick={() => setSelectedChat(c)} cursor="pointer" bg={selectedChat === c ? "#38B2AC" : "#E8E8E8"}
                            color={selectedChat === c ? "white" : "black"} px={3} py={2} borderRadius="lg" key={c._id}>
                                <Text>
                                    {!c.isGroupChat
                                        ? getSender(loggedUser, c.users)
                                        : c.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ):(<ChatLoading/>)}
            </Box>
    </Box>
  )
}

export default MyChats
