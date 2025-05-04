import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useKost } from '../context/KostContext';

const ManageKostScreen = () => {
  const router = useRouter();
  const { kosts, deleteKost } = useKost();

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Kost', `Are you sure you want to delete ${name}?`, [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteKost(id)
      }
    ]);
  };

  return (
    <View className='flex-1 bg-blue-50'>
      <View className='flex-row items-center justify-between px-4 py-4 bg-white'>
        <Text className='text-lg font-bold'>Manage Kost</Text>
        <TouchableOpacity
          className='px-4 py-2 bg-blue-500 rounded-lg'
          onPress={() => router.push('/add-kost')}>
          <Text className='text-white'>Add New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        className='p-4'
        data={kosts}
        renderItem={({ item }) => (
          <View className='flex-row items-center justify-between p-4 mb-2 bg-white rounded-lg'>
            <Text className='font-medium'>{item.name}</Text>
            <View className='flex-row gap-4'>
              <TouchableOpacity
                onPress={() => router.push(`/edit-kost/${item.id}`)}>
                <Ionicons name='create-outline' size={24} color='#4B5563' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id, item.name)}>
                <Ionicons name='trash-outline' size={24} color='#EF4444' />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ManageKostScreen;
