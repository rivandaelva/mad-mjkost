import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useKost } from '../context/KostContext';

const DetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { kosts } = useKost();

  const kost = kosts.find((k) => k.id === id);

  if (!kost) {
    return (
      <View className='items-center justify-center flex-1'>
        <Text>Kost not found</Text>
      </View>
    );
  }

  const handleChat = () => {
    // Add chat functionality
    console.log('Chat with owner of:', kost.name);
  };

  const handleBooking = () => {
    // Add booking functionality
    router.push('/booking');
  };

  const handleMenu = () => {
    // Add menu functionality
    console.log('Menu pressed');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View className='flex-1 bg-gray-50'>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 py-4 bg-white'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={24} color='#4B5563' />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenu}>
            <Ionicons name='ellipsis-vertical' size={24} color='#4B5563' />
          </TouchableOpacity>
        </View>

        <ScrollView className='flex-1'>
          {/* Main Card */}
          <View className='m-4 bg-white shadow-sm rounded-xl'>
            <Image
              source={{ uri: kost.image }}
              className='w-full h-48 rounded-t-xl'
              resizeMode='cover'
            />
            <View className='p-4'>
              <Text className='text-xl font-bold'>{kost.name}</Text>
              <Text className='mt-1 text-lg text-blue-500'>
                Rp {kost.price}/bulan
              </Text>
            </View>
          </View>

          {/* Location Section */}
          <View className='mx-4 mb-4'>
            <Text className='mb-2 text-lg font-semibold'>Location</Text>
            <View className='overflow-hidden bg-gray-200 rounded-xl'>
              <Image
                source={{ uri: 'https://via.placeholder.com/400x200?text=Map' }}
                className='w-full h-48'
                resizeMode='cover'
              />
              <View className='absolute'>
                <Ionicons
                  name='location-sharp'
                  size={32}
                  color='#EF4444'
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginLeft: -16,
                    marginTop: -32
                  }}
                />
              </View>
            </View>
          </View>

          {/* Facilities Section */}
          <View className='mx-4 mb-4'>
            <Text className='mb-2 text-lg font-semibold'>Facilities</Text>
            <View className='flex-row flex-wrap gap-2'>
              {Object.entries(kost.facilities).map(
                ([key, value]) =>
                  value && (
                    <View
                      key={key}
                      className='flex-row items-center px-3 py-2 bg-white rounded-lg'>
                      <Ionicons
                        name={
                          key === 'wifi'
                            ? 'wifi'
                            : key === 'ac'
                            ? 'snow'
                            : key === 'shower'
                            ? 'water'
                            : 'home'
                        }
                        size={20}
                        color='#4B5563'
                      />
                      <Text className='ml-2 capitalize'>{key}</Text>
                    </View>
                  )
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View className='flex-row gap-2 p-4 bg-white'>
          <TouchableOpacity
            className='flex-row items-center justify-center flex-1 p-4 bg-white border border-blue-500 rounded-lg'
            onPress={handleChat}>
            <Ionicons name='chatbubble-outline' size={20} color='#1e88e5' />
            <Text className='ml-2 font-medium text-blue-500'>Chat Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='flex-row items-center justify-center flex-1 p-4 bg-blue-500 rounded-lg'
            onPress={handleBooking}>
            <Ionicons name='calendar-outline' size={20} color='#fff' />
            <Text className='ml-2 font-medium text-white'>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DetailsScreen;
