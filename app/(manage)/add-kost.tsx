import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useKost } from '../../context/KostContext';

const AddKostScreen = () => {
  const router = useRouter();
  const { addKost } = useKost();
  const [image, setImage] = useState<string | null>(null);
  const [kostData, setKostData] = useState({
    name: '',
    price: '',
    type: 'Putra',
    facilities: {
      wifi: false,
      ac: false,
      shower: false,
      toilet: false
    }
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleSubmit = async () => {
    if (!kostData.name.trim()) {
      Alert.alert('Error', 'Nama kost harus diisi');
      return;
    }

    if (!kostData.price.trim()) {
      Alert.alert('Error', 'Harga harus diisi');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Gambar kost harus diisi');
      return;
    }

    try {
      await addKost({
        name: kostData.name,
        price: kostData.price,
        type: kostData.type,
        facilities: kostData.facilities,
        image: image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      router.push('(manage)');
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan kost');
      console.error(error);
    }
  };

  return (
    <View className='flex-1 bg-blue-50'>
      <View className='flex-row items-center px-4 py-4 bg-white'>
        <TouchableOpacity onPress={() => router.back()} className='mr-4'>
          <Ionicons name='arrow-back' size={24} color='#4B5563' />
        </TouchableOpacity>
        <Text className='text-lg font-bold'>Add New Kost</Text>
      </View>

      <ScrollView className='p-4'>
        <View className='p-4 bg-white rounded-lg'>
          {/* Image Picker */}
          <Text className='mb-2 text-sm text-gray-600'>Foto Kost</Text>
          <TouchableOpacity
            onPress={pickImage}
            className='items-center justify-center w-full h-48 mb-4 bg-gray-100 rounded-lg'>
            {image ? (
              <Image
                source={{ uri: image }}
                className='w-full h-full rounded-lg'
                resizeMode='cover'
              />
            ) : (
              <Ionicons name='image-outline' size={48} color='#9CA3AF' />
            )}
          </TouchableOpacity>

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
                onPress={() => setKostData({ ...kostData, type })}>
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
                  className={`ml-2 ${value ? 'text-white' : 'text-gray-700'}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
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
          <Text className='font-bold text-center text-white'>Save Kost</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddKostScreen;
