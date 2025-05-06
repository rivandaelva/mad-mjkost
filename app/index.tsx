import { Link } from 'expo-router';
import { Image, View } from 'react-native';

export default function Index() {
  return (
    <View className='items-center justify-center flex-1'>
      <Image
        source={require('../assets/images/logo.png')}
        className='w-64 h-64'
      />
      <View className='gap-4 mt-4'>
        <Link
          href='/login'
          className='px-20 py-2 text-xl text-white bg-blue-500 rounded-md'>
          Login
        </Link>
        <Link
          href='/signup'
          className='px-20 py-2 text-xl text-white bg-blue-500 rounded-md'>
          Sign up
        </Link>
      </View>
    </View>
  );
}
