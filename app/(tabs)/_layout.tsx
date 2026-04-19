import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, createContext, useContext } from 'react';
import { Drawer } from 'react-native-drawer-layout';
import { SidebarContent } from '../../components/SidebarContent';

// Context to open the drawer from any screen inside the tabs
const DrawerContext = createContext({ openDrawer: () => {} });
export const useDrawer = () => useContext(DrawerContext);

export default function TabLayout() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ openDrawer: () => setOpen(true) }}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => <SidebarContent />}
        drawerType="front"
        drawerStyle={{ width: '80%' }}
      >
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0f4c81',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#e2e8f0',
              elevation: 0,
              shadowOpacity: 0,
              borderTopWidth: 1,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Guide',
              tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
            }}
          />
        </Tabs>
      </Drawer>
    </DrawerContext.Provider>
  );
}
