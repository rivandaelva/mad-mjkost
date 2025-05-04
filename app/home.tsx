import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useKost } from '../context/KostContext';
import { KostItem } from '../types';

const HomeScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { kosts } = useKost();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState<
    'Putra' | 'Putri' | 'Campur'
  >('Putra');

  // Filter kost items based on search value and active filter
  const filteredKostItems = useMemo(() => {
    return kosts
      .filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((item) => item.type === activeFilter);
  }, [searchValue, activeFilter, kosts]);

  const renderKostItem = ({ item }: { item: KostItem }) => (
    <TouchableOpacity
      onPress={() => router.push(`/details?id=${item.id}`)}
      className='flex-row items-center p-4 mb-2 bg-white rounded-lg shadow-sm'>
      <Image source={{ uri: item.image }} className='w-12 h-12 rounded-full' />
      <Text className='flex-1 ml-4 font-medium'>{item.name}</Text>
      <View className='flex-row gap-2'>
        {item.facilities.wifi && (
          <Ionicons name='wifi' size={20} color='#4B5563' />
        )}
        {item.facilities.ac && (
          <Ionicons name='snow' size={20} color='#4B5563' />
        )}
        {item.facilities.shower && (
          <Ionicons name='water' size={20} color='#4B5563' />
        )}
        {item.facilities.toilet && (
          <Ionicons name='home' size={20} color='#4B5563' />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 bg-blue-50'>
      {/* Header */}
      <View className='flex-row items-center justify-between px-4 py-4 bg-white'>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name='menu' size={24} color='#4B5563' />
        </TouchableOpacity>
        <Text className='text-lg font-bold'>Home</Text>
        <Ionicons name='search' size={24} color='#4B5563' />
      </View>

      {/* Search Input */}
      <View className='px-4 py-3'>
        <View className='relative'>
          <TextInput
            className='h-12 px-4 pr-12 bg-white rounded-lg'
            placeholder='Search kost...'
            value={searchValue}
            onChangeText={setSearchValue}
            returnKeyType='search'
            autoCapitalize='none'
          />
          {searchValue !== '' && (
            <TouchableOpacity
              className='absolute right-3 top-3'
              onPress={() => setSearchValue('')}>
              <Ionicons name='close-circle' size={24} color='#9CA3AF' />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Buttons */}
      <View className='flex-row gap-2 px-4 mb-4'>
        {['Putra', 'Putri', 'Campur'].map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-4 py-2 rounded-full ${
              activeFilter === filter ? 'bg-blue-500' : 'bg-white'
            }`}
            onPress={() => setActiveFilter(filter as typeof activeFilter)}>
            <Text
              className={`${
                activeFilter === filter ? 'text-white' : 'text-gray-700'
              }`}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended Section */}
      <View className='flex-1 px-4'>
        <View className='flex-row items-center justify-between mb-3'>
          <Text className='text-lg font-bold'>Rekomended</Text>
          <Text className='text-sm text-gray-500'>
            {filteredKostItems.length} results
          </Text>
        </View>

        {filteredKostItems.length > 0 ? (
          <FlatList
            data={filteredKostItems}
            renderItem={renderKostItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className='items-center justify-center flex-1'>
            <Text className='text-gray-500'>No results found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
