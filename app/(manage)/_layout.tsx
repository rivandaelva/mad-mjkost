import { Stack } from 'expo-router';
import React from 'react';

export default function ManageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Manage Kost'
        }}
      />
      <Stack.Screen
        name='add-kost'
        options={{
          title: 'Add Kost'
        }}
      />
      <Stack.Screen
        name='edit-kost/[id]'
        options={{
          title: 'Edit Kost'
        }}
      />
    </Stack>
  );
}
