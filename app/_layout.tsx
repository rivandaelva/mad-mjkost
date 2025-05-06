import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KostProvider } from '../context/KostContext';
import { UserProvider } from '../context/UserContext';
import './globals.css';

export default function Layout() {
  return (
    <UserProvider>
      <KostProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                backgroundColor: '#fff',
                width: 250
              },
              drawerActiveBackgroundColor: '#e3f2fd',
              drawerActiveTintColor: '#1e88e5',
              drawerInactiveTintColor: '#333'
            }}>
            <Drawer.Screen
              name='index'
              options={{
                drawerLabel: 'Home',
                title: 'Home',
                drawerItemStyle: { display: 'none' },
                drawerIcon: ({ color, size }) => (
                  <Ionicons name='home-outline' size={size} color={color} />
                )
              }}
            />
            <Drawer.Screen
              name='(manage)'
              options={{
                drawerLabel: 'Manage Kost',
                title: 'Manage Kost'
              }}
            />
            <Drawer.Screen
              name='home'
              options={{
                drawerLabel: 'Home',
                title: 'Home'
              }}
            />
            <Drawer.Screen
              name='edit-kost/[id]'
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
            <Drawer.Screen
              name='login'
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
            <Drawer.Screen
              name='signup'
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
            <Drawer.Screen
              name='details'
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
            <Drawer.Screen
              name='booking'
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </KostProvider>
    </UserProvider>
  );
}
