import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useKost } from '../context/KostContext';
import { KostItem } from '../types';

const BookingScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { kosts } = useKost();
  const [loading, setLoading] = useState(true);
  const [kostData, setKostData] = useState<KostItem | null>(null);

  useEffect(() => {
    const fetchKostData = async () => {
      try {
        const kost = kosts.find((k) => k.id === id);
        if (kost) {
          setKostData(kost);
        } else {
          Alert.alert('Error', 'Kost not found');
          router.back();
        }
      } catch (error) {
        console.error('Error fetching kost:', error);
        Alert.alert('Error', 'Failed to load kost data');
      } finally {
        setLoading(false);
      }
    };

    fetchKostData();
  }, [id, kosts]);

  const handleBookNow = () => {
    // Implement booking logic here
    Alert.alert('Success', 'Booking request sent!');
  };

  const handleChat = () => {
    // Implement chat logic here
    // Alert.alert('Info', 'Opening chat...');
    Linking.openURL('http://wa.me/6289612701094');
  };

  if (loading) {
    return (
      <View className='items-center justify-center flex-1'>
        <ActivityIndicator size='large' color='#1e88e5' />
      </View>
    );
  }

  if (!kostData) {
    return null;
  }

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='flex-row items-center justify-between px-4 py-4 bg-white'>
        <TouchableOpacity onPress={() => router.navigate('home')}>
          <Ionicons name='arrow-back' size={24} color='#4B5563' />
        </TouchableOpacity>
        <Text className='text-lg font-bold'>{kostData.name}</Text>
        {/* <TouchableOpacity>
          <Ionicons name='ellipsis-vertical' size={24} color='#4B5563' />
        </TouchableOpacity> */}
        <View></View>
      </View>

      <ScrollView>
        {/* Main Image */}
        <View className='p-4'>
          <View className='overflow-hidden bg-gray-200 rounded-xl'>
            <Image
              source={{ uri: kostData.image }}
              className='w-full h-64'
              resizeMode='cover'
            />
          </View>
        </View>

        {/* Price Section */}
        {/* <View className='px-4 mb-6'>
          <Text className='text-2xl font-bold text-blue-500'>
            Rp {kostData.price}/bulan
          </Text>
          <Text className='mt-1 text-gray-600'>Type: {kostData.type}</Text>
        </View> */}

        {/* Facilities Section */}
        <View className='px-4 mb-6'>
          <Text className='mb-4 text-xl font-bold'>Fasilitas</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='flex-row'>
            {Object.entries(kostData.facilities).map(
              ([key, value]) =>
                value && (
                  <View key={key} className='items-center mr-6'>
                    <View className='items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm'>
                      <Ionicons
                        name={
                          key === 'wifi'
                            ? 'wifi'
                            : key === 'ac'
                            ? 'snow'
                            : key === 'shower'
                            ? 'water'
                            : 'alert'
                        }
                        size={20}
                        color='#4B5563'
                      />
                    </View>
                    <Text className='mt-2 text-sm text-gray-600 capitalize'>
                      {key}
                    </Text>
                  </View>
                )
            )}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className='p-4 bg-white'>
        <TouchableOpacity
          onPress={handleBookNow}
          className='w-full p-4 mb-3 bg-blue-500 rounded-lg'>
          <Text className='text-base font-bold text-center text-white'>
            Book Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleChat}
          className='w-full p-4 bg-white border border-blue-500 rounded-lg'>
          <Text className='text-base font-bold text-center text-blue-500'>
            Chat Owner
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingScreen;
