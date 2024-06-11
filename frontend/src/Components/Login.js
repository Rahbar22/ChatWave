import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button , useToast} from '@chakra-ui/react'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        if(!email || !password){
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        
        try{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
              const { data } = await axios.post(
                "/api/users/login",
                {
                  email,
                  password,
                },
                config
              );

            console.log(data);

            toast({
                title:"Login Successful",
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
    <VStack spacing={'10px'}>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input vlaue={email} type='email' placeholder='Enter your E-mail' onChange={(e) => setEmail(e.target.value)}
            ></Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size={'md'}>
                <Input type={show ? 'text' : 'password'} value={password} placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <InputRightElement width={'4.5em'}>
                    <Button height={'1.5em'} size='sm' onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button width={'100%'} colorScheme='green' style={{marginTop:'10px'}} onClick={submitHandler}>Login</Button>
    </VStack>
  )
}

export default Login
