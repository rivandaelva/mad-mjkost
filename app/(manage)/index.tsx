import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useKost } from '../../context/KostContext';

const ManageKostScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { kosts, deleteKost, loading } = useKost();

  if (loading) {
    return (
      <View className='items-center justify-center flex-1'>
        <ActivityIndicator size='large' color='#1e88e5' />
      </View>
    );
  }

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

  const handleAddNew = () => {
    router.push('/(manage)/add-kost');
  };

  const handleEdit = (id: string) => {
    router.push(`/(manage)/edit-kost/${id}`);
  };

  return (
    <View className='flex-1 bg-blue-50'>
      <View className='flex-row items-center justify-between px-4 py-4 bg-white'>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className='mr-4'>
          <Ionicons name='menu' size={24} color='#4B5563' />
        </TouchableOpacity>
        <Text className='text-lg font-bold'>Manage Kost</Text>
        <TouchableOpacity
          className='px-4 py-2 bg-blue-500 rounded-lg'
          onPress={handleAddNew}>
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
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
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
