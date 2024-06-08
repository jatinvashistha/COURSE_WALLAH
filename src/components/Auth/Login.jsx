 import { Box, Button, Container, FormLabel, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/user';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Container h={'95vh'}>
            <VStack h={'full'} justifyContent="center" spacing='16'>
                <Heading children={"Welcome to Official Website"} />
                <form onSubmit={submitHandler} style={{ width: '100%' }}>
                    <Box my={'4'}>
                        <FormLabel htmlFor='email' children="Email Address" />
                        <Input
                            required
                            id='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='abc@gmail.com'
                            type={'email'}
                            focusBorderColor='yellow.500'
                        />
                    </Box>

                    <Box my={'4'}>
                        <FormLabel htmlFor='password' children="Your Password" />
                        <InputGroup>
                            <Input
                                required
                                id='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                focusBorderColor='yellow.500'
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>

                    <Box>
                        <Link to="/forgetpassword">
                            <Button fontSize={'sm'} variant={'link'}>Forget Password?</Button>
                        </Link>
                    </Box>

                    <Button my={'4'} colorScheme='yellow' type='submit'>Login</Button>

                    <Box my={'4'}>
                        New User?{' '}
                        <Link to="/register">
                            <Button colorScheme='yellow' variant="link"> Sign Up</Button>{" "}
                            here
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Login;
