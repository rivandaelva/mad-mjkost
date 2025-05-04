import { Link } from 'expo-router';
import { Image, View } from 'react-native';

export default function Index() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Image
        source={require('../assets/images/logo.png')}
        className='w-64 h-64'
      />
      <View className='gap-4 mt-4'>
        <Link
          href='/login'
          className='bg-blue-500 text-white px-20 py-2 rounded-md text-xl'>
          Login
        </Link>
        <Link
          href='/signup'
          className='bg-blue-500 text-white px-20 py-2 rounded-md text-xl'>
          Sign up
        </Link>
      </View>
    </View>
  );
}
