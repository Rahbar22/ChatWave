import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        if(!name || !email || !password || !confirmpassword){
            toast({
                title:"Please fill all the fields",
                status:"warning",
                duration:"5000",
                isClosable:true,
                position:"bottom",
            });
            return;
        }

        if(password !== confirmpassword){
            toast({
                title:"Password do not match",
                status:"warning",
                duration:"5000",
                isClosable:true,
                position:"bottom",
            });
            return;
        }

        console.log(name, email, password);

        try{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
              const { data } = await axios.post(
                "/api/users",
                {
                  name,
                  email,
                  password,
                },
                config
              );

            console.log(data);

            toast({
                title:"Registration Successful",
                status:"success",
                duration:"5000",
                isClosable:true,
                position:"bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        }
        catch(error){
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"warning",
                duration:"5000",
                isClosable:true,
                position:"bottom",
            });
        }
    }

  return (
    <VStack spacing={'5px'}>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your Name' onChange={(e) => setName(e.target.value)}
            ></Input>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='Enter your E-mail' onChange={(e) => setEmail(e.target.value)}
            ></Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size={'md'}>
                <Input type={show ? 'text' : 'password'} placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <InputRightElement width={'4.5em'}>
                    <Button height={'1.5em'} size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size={'md'}>
                <Input type={show ? 'text' : 'password'} placeholder='Confirm your Password' onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
                <InputRightElement width={'4.5em'}>
                    <Button height={'1.5em'} size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button width={'100%'} colorScheme='green' style={{marginTop:'10px'}} onClick={submitHandler}>SignUp</Button>
    </VStack>
  )
}

export default Signup
