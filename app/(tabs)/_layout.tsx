import { Tabs } from "expo-router";
import { Home, CreditCard, LayoutDashboard, Menu } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import Colors from "@/constants/colors";
import DrawerMenu from "@/components/DrawerMenu";

export default function TabLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const MenuButton = () => (
    <TouchableOpacity
      onPress={() => setIsDrawerOpen(true)}
      style={{ marginRight: 16 }}
    >
      <Menu size={24} color={Colors.white} />
    </TouchableOpacity>
  );

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.mediumGray,
          headerShown: true,
          tabBarStyle: {
            backgroundColor: Colors.white,
            borderTopColor: Colors.lightGray,
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <MenuButton />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="credits"
          options={{
            title: "Crediti",
            tabBarIcon: ({ color }) => <CreditCard size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
          }}
        />
        {/* Hide services tab - moved to drawer menu */}
        <Tabs.Screen
          name="services"
          options={{
            href: null, // This hides the tab
          }}
        />
      </Tabs>
      
      <DrawerMenu 
        isVisible={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
}