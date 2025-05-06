import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        router.push('/home');
        console.log('Login successful');
      } else {
        Alert.alert('Error', 'Invalid username or password');
        console.error('Login failed: Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error('Login error:', error);
    }
  };

  return (
    <View className='justify-center flex-1 px-5 bg-white'>
      <Text className='mb-8 text-2xl font-bold text-center'>Login</Text>

      <TextInput
        className='h-12 px-4 mb-4 border border-gray-300 rounded-lg'
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
      />

      <TextInput
        className='h-12 px-4 mb-4 border border-gray-300 rounded-lg'
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className='p-4 mt-2 bg-blue-500 rounded-lg'
        onPress={handleLogin}>
        <Text className='text-base font-bold text-center text-white'>
          Login
        </Text>
      </TouchableOpacity>

      <Link
        className='p-4 mt-2 text-center bg-blue-500 rounded-lg'
        href='/signup'>
        <Text className='text-base font-bold text-center text-white'>
          Create Account
        </Text>
      </Link>

      <TouchableOpacity className='mt-4'>
        <Text className='text-sm text-center text-blue-500'>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
