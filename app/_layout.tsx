import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KostProvider } from '../context/KostContext';
import './globals.css';

export default function Layout() {
  return (
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
              drawerIcon: ({ color, size }) => (
                <Ionicons name='home-outline' size={size} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name='manage-kost'
            options={{
              drawerLabel: 'Manage Kost',
              title: 'Manage Kost',
              drawerIcon: ({ color, size }) => (
                <Ionicons name='settings-outline' size={size} color={color} />
              )
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </KostProvider>
  );
}
