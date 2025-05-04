import { Link, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    // Add login logic here
    console.log('Login attempted:', username);

    // navigate to the home screen
    navigation.navigate('home');
  };

  return (
    <View className='flex-1 justify-center px-5 bg-white'>
      <Text className='text-2xl font-bold mb-8 text-center'>Login</Text>

      <TextInput
        className='h-12 border border-gray-300 rounded-lg px-4 mb-4'
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
      />

      <TextInput
        className='h-12 border border-gray-300 rounded-lg px-4 mb-4'
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className='bg-blue-500 p-4 rounded-lg mt-2'
        onPress={handleLogin}>
        <Text className='text-white text-center font-bold text-base'>
          Login
        </Text>
      </TouchableOpacity>

      <Link className='bg-blue-500 p-4 rounded-lg mt-2' href='/signup'>
        <Text className='text-white text-center font-bold text-base'>
          Create Account
        </Text>
      </Link>

      <TouchableOpacity className='mt-4'>
        <Text className='text-blue-500 text-center text-sm'>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
