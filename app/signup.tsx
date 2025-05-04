import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    console.log('Continue pressed');
  };

  return (
    <View className='flex-1 bg-white px-5 items-center'>
      <Text className='text-2xl font-bold mt-16 mb-8'>Sign Up</Text>

      <View className='w-24 h-24 rounded-full mb-8 items-center justify-center'>
        <Image
          source={require('../assets/images/user-placeholder.png')}
          className='w-24 h-24'
        />
      </View>

      <View className='w-full mb-4'>
        <View className='flex-row items-center'>
          <Text className='text-sm text-gray-600'>Username</Text>
          <Text className='text-red-500 ml-1'>*</Text>
        </View>
        <TextInput
          className='w-full h-12 border border-gray-300 rounded-lg px-4'
          placeholder='Masukan username'
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
        />
      </View>

      <View className='w-full mb-4'>
        <View className='flex-row items-center mb-1'>
          <Text className='text-sm text-gray-600'>Email</Text>
          <Text className='text-red-500 ml-1'>*</Text>
        </View>
        <TextInput
          className='w-full h-12 border border-gray-300 rounded-lg px-4'
          placeholder='Masukan email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </View>

      <View className='w-full mb-4'>
        <View className='flex-row items-center mb-1'>
          <Text className='text-sm text-gray-600'>Username</Text>
          <Text className='text-red-500 ml-1'>*</Text>
        </View>
        <TextInput
          className='w-full h-12 border border-gray-300 rounded-lg px-4 mb-8'
          placeholder='Masukan password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className='w-full bg-blue-500 p-4 rounded-lg'
        onPress={handleContinue}>
        <Text className='text-white text-center font-bold text-base'>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
