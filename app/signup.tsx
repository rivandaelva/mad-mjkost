import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useUser } from '../context/UserContext';

const SignUpScreen = () => {
  const router = useRouter();
  const { register } = useUser();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleContinue = async () => {
    console.log('Image:', image);
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    try {
      const success = await register({
        username,
        email,
        password,
        image: image || ''
      });

      if (success) {
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => router.push('/login') }
        ]);
        console.log('Account created successfully');
      } else {
        Alert.alert('Error', 'Username already exists');
        console.error('Registration failed: Username already exists');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error('Registration error:', error);
    }
  };

  return (
    <View className='items-center flex-1 px-5 bg-white'>
      <Text className='mt-16 mb-8 text-2xl font-bold'>Sign Up</Text>

      <TouchableOpacity
        className='items-center justify-center w-24 h-24 mb-8 bg-gray-100 rounded-full'
        onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} className='w-24 h-24 rounded-full' />
        ) : (
          <Image
            source={require('../assets/images/user-placeholder.png')}
            className='w-24 h-24'
          />
        )}
      </TouchableOpacity>

      <View className='w-full mb-4'>
        <View className='flex-row items-center'>
          <Text className='text-sm text-gray-600'>Username</Text>
          <Text className='ml-1 text-red-500'>*</Text>
        </View>
        <TextInput
          className='w-full h-12 px-4 border border-gray-300 rounded-lg'
          placeholder='Masukan username'
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
        />
      </View>

      <View className='w-full mb-4'>
        <View className='flex-row items-center mb-1'>
          <Text className='text-sm text-gray-600'>Email</Text>
          <Text className='ml-1 text-red-500'>*</Text>
        </View>
        <TextInput
          className='w-full h-12 px-4 border border-gray-300 rounded-lg'
          placeholder='Masukan email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </View>

      <View className='w-full mb-4'>
        <View className='flex-row items-center mb-1'>
          <Text className='text-sm text-gray-600'>Password</Text>
          <Text className='ml-1 text-red-500'>*</Text>
        </View>
        <TextInput
          className='w-full h-12 px-4 mb-8 border border-gray-300 rounded-lg'
          placeholder='Masukan password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className='w-full p-4 bg-blue-500 rounded-lg'
        onPress={handleContinue}>
        <Text className='text-base font-bold text-center text-white'>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
