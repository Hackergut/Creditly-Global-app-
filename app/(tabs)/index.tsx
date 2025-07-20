import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Menu } from 'lucide-react-native';

import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import ChatBot from '@/components/ChatBot';
import DrawerMenu from '@/components/DrawerMenu';
import Colors from '@/constants/colors';
import { brandConfig } from '@/constants/brandConfig';

export default function HomeScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuPress = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: brandConfig.name,
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleMenuPress}
              style={styles.menuButton}
              testID="menu-button"
            >
              <Menu size={24} color={Colors.white} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="home-screen"
      >
        <Hero />
        <WhyChooseUs />
      </ScrollView>
      
      <ChatBot />
      
      <DrawerMenu 
        isVisible={isDrawerOpen} 
        onClose={handleDrawerClose} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
});