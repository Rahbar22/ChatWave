import React , {useState} from 'react';
import { Box, Button, MenuButton, Tooltip, Menu, Avatar, MenuList, MenuItem, MenuDivider, 
    Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, useDisclosure,
    useToast,
    Spinner} from '@chakra-ui/react';
import {Text} from '@chakra-ui/layout';
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';

const SideDrawer = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    
    const {user, setSelectedChat, chat, setChat} = ChatState();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    const toast = useToast();

    const handleSearch = async () => {
        if(!search){
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
              });
              return;
        }

        try{
            setLoading(true);

            const config = {
                headers: {
                    'Authorization' :`Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/users?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
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

    const accessChat = async (userId) => {

        try{
            setLoadingChat(true);

            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization' :`Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/chats`, {userId}, config);
            
            if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        }
        catch(error){
            toast({
                title: "Error fetching the chat",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    };

  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="2px">
            <Tooltip label='Search Users to Chat' hasArrow placement='bottom-end'>
                <Button variant='ghost' onClick={onOpen}>
                    <i class="fas fa-search"></i>
                    <Text d={{base:"none", md:"flex"}} px={4}>
                        Search User
                    </Text>
                </Button>
            </Tooltip>

            <Text fontSize={'2xl'} fontFamily={'Work-Sans'}>
                ChatWave
            </Text>

            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize='2xl' m={1}></BellIcon>
                    </MenuButton>
                </Menu>

                <Menu>
                    <MenuButton as={Button} bg={'white'} rightIcon={<ChevronDownIcon/>}>
                        <Avatar size={'small'} cursor={'pointer'} name={user.name}/>
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>{" "}
                        </ProfileModal>
                        <MenuDivider></MenuDivider>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={'1px'}>Search User</DrawerHeader>

          <DrawerBody>
            <Box display={'flex'} pb={2}>
                <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)}></Input>
                <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading?(<ChatLoading/>)
                :(searchResult?.map((user) => (
                    <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}></UserListItem>
                ))
            )}
            {loadingChat && <Spinner ml='auto' display={'flex'}/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default SideDrawer

