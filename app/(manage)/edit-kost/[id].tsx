import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useKost } from '../../../context/KostContext';

const EditKostScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { kosts, updateKost } = useKost();
  const [kostData, setKostData] = useState({
    name: '',
    price: '',
    type: 'Putra' as 'Putra' | 'Putri' | 'Campur',
    facilities: {
      wifi: false,
      ac: false,
      shower: false,
      toilet: false
    }
  });

  // Load existing kost data
  useEffect(() => {
    const existingKost = kosts.find((k) => k.id === id);
    if (existingKost) {
      setKostData({
        name: existingKost.name,
        price: existingKost.price,
        type: existingKost.type,
        facilities: existingKost.facilities
      });
    }
  }, [id, kosts]);

  const handleSubmit = () => {
    if (!kostData.name.trim()) {
      Alert.alert('Error', 'Nama kost harus diisi');
      return;
    }

    if (!kostData.price.trim()) {
      Alert.alert('Error', 'Harga harus diisi');
      return;
    }

    try {
      updateKost(id as string, kostData);
      router.push('(manage)');
    } catch (error) {
      Alert.alert('Error', 'Gagal mengupdate kost');
    }
  };

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='flex-row items-center px-4 py-4 bg-white'>
        <TouchableOpacity onPress={() => router.back()} className='mr-4'>
          <Ionicons name='arrow-back' size={24} color='#4B5563' />
        </TouchableOpacity>
        <Text className='text-lg font-bold'>Edit Kost</Text>
      </View>

      <ScrollView className='p-4'>
        <View className='p-4 bg-white rounded-lg'>
          <Text className='mb-2 text-sm text-gray-600'>Nama Kost</Text>
          <TextInput
            className='h-12 px-4 mb-4 border border-gray-300 rounded-lg'
            value={kostData.name}
            onChangeText={(text) => setKostData({ ...kostData, name: text })}
            placeholder='Masukan nama kost'
          />

          <Text className='mb-2 text-sm text-gray-600'>Harga</Text>
          <TextInput
            className='h-12 px-4 mb-4 border border-gray-300 rounded-lg'
            value={kostData.price}
            onChangeText={(text) => setKostData({ ...kostData, price: text })}
            placeholder='Masukan harga'
            keyboardType='numeric'
          />

          <Text className='mb-2 text-sm text-gray-600'>Tipe Kost</Text>
          <View className='flex-row gap-2 mb-4'>
            {['Putra', 'Putri', 'Campur'].map((type) => (
              <TouchableOpacity
                key={type}
                className={`px-4 py-2 rounded-full ${
                  kostData.type === type ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                onPress={() =>
                  setKostData({
                    ...kostData,
                    type: type as typeof kostData.type
                  })
                }>
                <Text
                  className={`${
                    kostData.type === type ? 'text-white' : 'text-gray-700'
                  }`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className='mb-2 text-sm text-gray-600'>Fasilitas</Text>
          <View className='flex-row flex-wrap gap-2 mb-4'>
            {Object.entries(kostData.facilities).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                className={`flex-row items-center px-4 py-2 rounded-full ${
                  value ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                onPress={() =>
                  setKostData({
                    ...kostData,
                    facilities: {
                      ...kostData.facilities,
                      [key]: !value
                    }
                  })
                }>
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
                  color={value ? 'white' : '#4B5563'}
                />
                <Text
                  className={`ml-2 capitalize ${
                    value ? 'text-white' : 'text-gray-700'
                  }`}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className='p-4 bg-white'>
        <TouchableOpacity
          className='p-4 bg-blue-500 rounded-lg'
          onPress={handleSubmit}>
          <Text className='font-bold text-center text-white'>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditKostScreen;
